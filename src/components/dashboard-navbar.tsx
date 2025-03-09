"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { UserCircle, Home, Key } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();

  return (
    <nav className="w-full border-b border-gray-700 bg-gray-900 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            prefetch
            className="text-xl font-bold text-white flex items-center gap-2"
          >
            <Key className="h-6 w-6 text-blue-400" />
            <span>LootKey</span>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            href="/"
            className="text-gray-300 hover:text-white px-3 py-2 text-sm"
          >
            Home
          </Link>
          <Link
            href="/access-keys"
            className="text-gray-300 hover:text-white px-3 py-2 text-sm"
          >
            Access Keys
          </Link>
          <Link
            href="/dashboard"
            className="text-gray-300 hover:text-white px-3 py-2 text-sm"
          >
            Dashboard
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
              >
                <UserCircle className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
