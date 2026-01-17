import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 sm:px-6 lg:px-8 h-16 flex items-center z-50">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-3">
          <SignedOut>
           <SignInButton
            mode="modal"
            afterSignInUrl="/dashboard"      // redirect after successful login
          >
            <button
              type="button"
              className="border border-[#6c47ff] text-[#6c47ff] rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-[#6c47ff] hover:text-white transition-colors"
            >
              Login
            </button>
          </SignInButton>

          </SignedOut>

          <SignedIn>
            {/* Optional: show UserButton or link to dashboard here */}
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
