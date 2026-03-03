
"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { useAuth, SignInButton, SignOutButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import Link from "next/link";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isSignedIn } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-2 mt-6">
            <Link href="/" onClick={() => setShowMobileMenu(false)} className="nav-link-elegant group !justify-start !rounded-xl h-12">
              <HomeIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="font-semibold text-base">Home</span>
            </Link>

            {isSignedIn ? (
              <>
                <Link href="/notifications" onClick={() => setShowMobileMenu(false)} className="nav-link-elegant group !justify-start !rounded-xl h-12">
                  <BellIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="font-semibold text-base">Notifications</span>
                </Link>
                <Link href="/profile" onClick={() => setShowMobileMenu(false)} className="nav-link-elegant group !justify-start !rounded-xl h-12">
                  <UserIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="font-semibold text-base">Profile</span>
                </Link>


                <SignOutButton>
                  <Button variant="ghost" className="flex items-center gap-4 justify-start w-full h-12 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive transition-all group">
                    <LogOutIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span className="font-medium text-base">Logout</span>
                  </Button>
                </SignOutButton>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button variant="default" className="w-full h-12 rounded-xl font-semibold shadow-md mt-4">
                  Sign In
                </Button>
              </SignInButton>
            )}
          </nav>

        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
