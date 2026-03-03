
import { BellIcon, HomeIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import ModeToggle from "./ModeToggle";
import { currentUser } from "@clerk/nextjs/server";

async function DesktopNavbar() {
  const user = await currentUser();

  return (

    <div className="hidden md:flex items-center space-x-2">
      <ModeToggle />

      <Link href="/" className="nav-link-elegant group">
        <HomeIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="hidden lg:inline font-semibold">Home</span>
        <div className="nav-indicator" />
      </Link>


      {user ? (
        <>
          <Link href="/notifications" className="nav-link-elegant group">
            <BellIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="hidden lg:inline font-semibold">Notifications</span>
            <div className="nav-indicator" />
          </Link>

          <Link
            href={`/profile/${user.username ?? user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            className="nav-link-elegant group"
          >
            <UserIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="hidden lg:inline font-semibold">Profile</span>
            <div className="nav-indicator" />
          </Link>

          <div className="pl-4 border-l border-primary/20 ml-2">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "size-9 hover:ring-2 hover:ring-primary hover:ring-offset-2 transition-all duration-500 shadow-md"
                }
              }}
            />
          </div>

        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default" className="rounded-full px-6 shadow-md hover:shadow-primary/20 transition-all active:scale-95">
            Sign In
          </Button>
        </SignInButton>
      )}
    </div>
  );
}

export default DesktopNavbar;
