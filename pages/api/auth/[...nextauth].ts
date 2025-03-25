import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
    };
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: number;
  }
}

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.modify",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  jwt: {
    //encryption: false, // Disable encryption to avoid JWE errors
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + (account.expires_in as number) * 1000;
      }
      

      console.log("JWT Token:", token);

      // Refresh expired token
      if (Date.now() > (token.expiresAt as number)) {
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              client_id: process.env.GOOGLE_CLIENT_ID,
              client_secret: process.env.GOOGLE_CLIENT_SECRET,
              refresh_token: token.refreshToken,
              grant_type: "refresh_token",
            }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Failed to refresh token");

          token.accessToken = data.access_token;
          token.expiresAt = Date.now() + data.expires_in * 1000;
        } catch (error) {
          console.error("Error refreshing access token:", error);
          return { ...token, accessToken: null }; // Remove invalid tokens
          //throw new Error("Token refresh failed");
          //token.error = "TokenRefreshFailed";
        }
      }

      return token;
    },
    async session({ session, token }) {
      
      if (session.user) {
        session.user.id = token.sub!;
        session.user.accessToken = token.accessToken as string;
      }
      console.log('This is the session', session)
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the sign-in page if the token refresh failed
      if (url === "/api/auth/error?error=TokenRefreshFailed") {
        return `${baseUrl}/signup`;
      }
      return url;
    },
  },
  pages: {
    signIn: "/signup",
  },
  debug: true, // Enable debug mode
};

export default NextAuth(authOptions);