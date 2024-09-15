import Link from "next/link";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth";
import SignIn from "./sign-in";
import SignOut from "./sign-out";

export default async function Header() {
  const session = await auth();
  return (
    <header className="bg-slate-950 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">Spotify App</Link>
        </h1>
        <nav className="flex items-center space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/top-tracks" className="hover:text-gray-300">
            Top Tracks
          </Link>
          <Link href="/top-artists" className="hover:text-gray-300">
            Top Artists
          </Link>

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-9 w-9 flex rounded-full">
                  <AvatarImage src={session.user.image ?? "https://github.com/shadcn.png"} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span><Link href="/profile">Profile</Link></span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>
                    <SignOut></SignOut>
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <SignIn className="bg-background hover:bg-gray-300 text-black"/>
          )}
        </nav>
      </div>
    </header>
  );
}
