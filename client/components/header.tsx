"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "@/context/globalContext";
import Profile from "./profile";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/findwork", label: "Find Work" },
  { href: "/myjobs", label: "My Jobs" },
  { href: "/post", label: "Post a Job" },
  { href: "/interview", label: "Interview Prep" },
  { href: "/review", label: "Reviews" },
];

const Header = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useGlobalContext();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-primary">
              HirePro
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  pathname === href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right side: show profile if logged in, else show Demo badge */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Profile />
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-200 px-3 py-1 text-xs font-semibold text-cyan-700">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                Demo Mode
              </span>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 pt-3 border-t border-border">
            {isAuthenticated ? (
              <Profile />
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-200 px-3 py-1 text-xs font-semibold text-cyan-700">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                Demo Mode
              </span>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
