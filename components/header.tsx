"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
// import { Wallet } from "./wallet";

const Header = () => {
  return (
    <header className="w-full h-[70px] flex justify-between items-center px-4 md:px-6 bg-background">
      <HeaderLogo />
      <HeaderNav />
      <HeaderRight />
    </header>
  );
};

const HeaderLogo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span className="font-bold text-xl">Logo</span>
    </Link>
  );
};

const HeaderNav = () => {
  return (
    <nav className="hidden md:flex space-x-4">
      <Link href="/campaign" className="text-sm font-medium hover:underline">
        Campaign
      </Link>
      <Link
        href="/create-campaign"
        className="text-sm font-medium hover:underline"
      >
        Create Campaign
      </Link>
      <Link href="/dashboard" className="text-sm font-medium hover:underline">
        Dashboard
      </Link>
    </nav>
  );
};

const HeaderRight = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* <Wallet /> */}
      <ModeToggle />
    </div>
  );
};

export default Header;
