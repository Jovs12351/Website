import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { Key, UserCircle } from "lucide-react";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-700 bg-gray-900 py-3">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          prefetch
          className="text-xl font-bold text-white flex items-center gap-2"
        >
          <Key className="h-6 w-6 text-blue-400" />
          <span>LootKey</span>
        </Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/access-keys"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Access Keys
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Dashboard
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
