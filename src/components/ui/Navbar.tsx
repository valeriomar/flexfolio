"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, LayoutGrid, Mail } from "lucide-react";
import { ThemeSelector } from "../ui/ThemeSelector";

const navItems = [
  { href: "/", icon: <Home className="h-5 w-5" />, label: "Home" },
  { href: "#about", icon: <User className="h-5 w-5" />, label: "About" },
  { href: "#work", icon: <LayoutGrid className="h-5 w-5" />, label: "Work" },
  { href: "#contact", icon: <Mail className="h-5 w-5" />, label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      style={{ padding: 20 }}
      className="fixed left-1/2 top-6 z-50 flex -translate-x-1/2 items-center rounded-full border border-black/10 bg-white/30 px-4 py-2 backdrop-blur-md shadow-md 
      max-sm:top-4 max-sm:px-2 max-sm:py-1"
    >
      <ul className="flex items-center space-x-4 gap-7 max-sm:gap-4">
        {navItems.map(({ href, icon, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="flex items-center">
              <Link
                style={{ fontFamily: "Poppins" }}
                href={href}
                className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors
                max-sm:px-2 max-sm:py-1 max-sm:text-xs max-sm:gap-3"
              >
                {icon}
                <span className="hidden sm:inline">{label}</span>
              </Link>
            </li>
          );
        })}
        <li className="border-0">
          <div >
            <ThemeSelector />
          </div>
        </li>
      </ul>
    </nav>
  );
}
