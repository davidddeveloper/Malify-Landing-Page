import Link from "next/link"
import { Button } from "@/components/ui/button"
import SignOutButton from "./signOutButton"

export function Header() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">Mailify</span>
        </Link>
        <nav className="flex gap-6">
          <Link href="/features" className="text-sm font-medium hover:underline underline-offset-4">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link href="/signup" passHref>
            <Button>Sign Out</Button>
            <Button>Sign Up</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}