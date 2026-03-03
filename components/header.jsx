import React from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();

  return (
    <header className="fixed top-0 w-full bg-white/70 backdrop-blur-2xl z-50 border-b border-gray-100/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-2 pb-1 pr-3 flex items-center justify-center shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]">
              <span className="font-extrabold text-2xl tracking-tighter ml-1">
                welth
              </span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 hidden md:block tracking-tight">
              AI Finance
            </span>
          </div>
        </Link>

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a
              href="#features"
              className="text-gray-500 hover:text-indigo-600 font-medium text-sm tracking-wide transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-500 hover:text-indigo-600 font-medium text-sm tracking-wide transition-colors"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-indigo-600 flex items-center gap-2 transition-colors"
            >
              <Button
                variant="outline"
                className="rounded-full px-4 border-gray-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-all shadow-sm font-medium"
              >
                <LayoutDashboard size={16} className="mr-2" />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <a href="/transaction/create">
              <Button className="rounded-full px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)] transition-all flex items-center gap-2 font-medium">
                <PenBox size={16} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </a>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button
                variant="outline"
                className="rounded-full px-6 border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-medium tracking-wide"
              >
                Login
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
