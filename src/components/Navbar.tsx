import Link from "next/link";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";


async function Navbar() {
  let user = null;

  try {
    user = await currentUser();
    if (user) await syncUser(); // POST
  } catch (error) {
    console.error("Clerk Authentication Error:", error);
    // user remains null, app continues to render guest Navbar
  }

  return (
    <nav className="nav-glass">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="logo-container animate-float">
                <img src="/logo.png" alt="Socio Logo" className="size-full object-contain relative z-10" />
                <div className="logo-shimmer" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/40 font-mono tracking-tighter group-hover:tracking-normal transition-all duration-500">
                Socio
              </span>

            </Link>

          </div>



          <DesktopNavbar />
          <MobileNavbar />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;