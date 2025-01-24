import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Mail, Zap, Clock, Bot, Shield } from "lucide-react"
import Image from "next/image"
import MalifyImage from "@/public/images/malify-extension.png"
//PfRaqPY0pzNz39Fc
export default function LandingPage() {
  return (
    /*<div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Mailify</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </a>
          </nav>
          <Button>Install Extension</Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                    New Version Available
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Never Miss Important Emails Again
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Mailify uses AI to identify and summarize your most important emails, delivering instant
                    notifications when urgent matters need your attention.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="bg-primary">
                    Install Free
                  </Button>
                  <Button size="lg" variant="outline">
                    Watch Demo
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-full max-w-[600px] rounded-xl border bg-white p-4 shadow-xl">
                <Image
                  src={MalifyImage}
                  alt="Mailify interface showing email summaries"
                  width={600}
                  height={400}
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Powerful Features for Busy Professionals
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl">
                  Stay on top of your inbox with intelligent email management tools.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="transition-all md:hover:shadow-xl md:hover:scale-110">
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary" />
                  <CardTitle>Instant Summaries</CardTitle>
                  <CardDescription>
                    Get AI-powered summaries of your emails in seconds, helping you quickly understand the key points.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="transition-all md:hover:shadow-xl md:hover:scale-110">
                <CardHeader>
                  <Bell className="h-10 w-10 text-primary" />
                  <CardTitle>Smart Notifications</CardTitle>
                  <CardDescription>
                    Receive alerts only for emails that matter, with customizable notification settings.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="transition-all md:hover:shadow-xl md:hover:scale-110">
                <CardHeader>
                  <Bot className="h-10 w-10 text-primary" />
                  <CardTitle>AI Assistant</CardTitle>
                  <CardDescription>
                    Let our AI help you draft responses and organize your inbox automatically.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="transition-all md:hover:shadow-xl md:hover:scale-110">
                <CardHeader>
                  <Clock className="h-10 w-10 text-primary" />
                  <CardTitle>Time Saving</CardTitle>
                  <CardDescription>
                    Save hours each week with automated email processing and organization.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="transition-all md:hover:shadow-xl md:hover:scale-110">
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary" />
                  <CardTitle>Privacy First</CardTitle>
                  <CardDescription>
                    Your data is encrypted and secure. We never store your email content.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="transition-all md:hover:shadow-xl md:hover:scale-110">
                <CardHeader>
                  <Mail className="h-10 w-10 text-primary" />
                  <CardTitle>Gmail Integration</CardTitle>
                  <CardDescription>Seamlessly integrates with Gmail, working right inside your inbox.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl">Choose the plan that's right for you</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card className="transition-all md:hover:shadow-xl md:hover:scale-105">
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>Perfect for getting started</CardDescription>
                  <div className="text-3xl font-bold">$0</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-500">
                    <li>• Basic email summaries</li>
                    <li>• 10 notifications per day</li>
                    <li>• Gmail integration</li>
                    <li>• Basic AI features</li>
                  </ul>
                  <Button className="w-full mt-6">Get Started</Button>
                </CardContent>
              </Card>
              <Card className="border-primary transition-all md:hover:shadow-xl md:hover:scale-105">
                <CardHeader>
                  <div className="flex gap-3">
                    <Badge className="w-fit mb-2">Recommended</Badge>
                    <Badge className="w-fit mb-2">Popular</Badge>

                  </div>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>For power users</CardDescription>
                  <div className="text-3xl font-bold">$9.99/mo</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-500">
                    <li>• Advanced AI summaries</li>
                    <li>• Unlimited notifications</li>
                    <li>• Priority support</li>
                    <li>• Custom rules & filters</li>
                    <li>• SMS notifications</li>
                    <li>• Advanced analytics</li>
                  </ul>
                  <Button className="w-full mt-6" variant="default">
                    Upgrade Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Transform Your Email Experience?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Join thousands of professionals who've already simplified their email management.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-primary">
                  Install Mailify Now
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Mailify</span>
            </div>
            <nav className="flex gap-4 sm:gap-6">
              <a href="#" className="text-sm hover:underline underline-offset-4">
                Terms
              </a>
              <a href="#" className="text-sm hover:underline underline-offset-4">
                Privacy
              </a>
              <a href="#" className="text-sm hover:underline underline-offset-4">
                Contact
              </a>
            </nav>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">© 2024 Mailify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>*/
  )
}

