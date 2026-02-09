import React from "react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { LayoutDashboard, PenBox } from "lucide-react"   // 👈 remove UserCheck icon for now
import { Button } from "@/components/ui/button"
import { checkUser } from "@/lib/checkUser"              // 👈 correct import

const Header = async () => {
  await checkUser()
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <nav className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={60}
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Right side actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-[#6c47ff] flex items-center gap-2 transition-colors"
            >
              <Button
                variant="outline"
                className="border-[#6c47ff] text-gray-900 hover:bg-[#6c47ff] hover:text-white flex items-center gap-2"
              >
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedIn>
            <Link
              href="/transaction/create"
              className="text-gray-600 hover:text-[#6c47ff] flex items-center gap-2 transition-colors"
            >
              <Button className="border border-[#6c47ff] text-[#6c47ff] hover:bg-[#6c47ff] hover:text-white flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
              <button
                type="button"
                className="border border-[#6c47ff] text-[#6c47ff] rounded-full font-medium text-sm sm:text-base h-9 sm:h-10 px-4 sm:px-5 cursor-pointer hover:bg-[#6c47ff] hover:text-white transition-colors"
              >
                <span className="hidden md:inline">Login</span>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 sm:w-9 h-9",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  )
}

export default Header
