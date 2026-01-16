// components/ui/header.jsx
"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-lg font-semibold">Welth</div>

        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton />
            <SignUpButton mode="modal">
              <button
                type="button"
                className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-[#5a38e0] transition-colors"
              >
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
