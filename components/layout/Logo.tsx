"use client";

import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link
      href={"/"}
      className={`flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}
    >
      <Image
        src="/logo.svg"
        alt="Training platform Logo"
        width={15}
        height={15}
        className="w-8 h-8 object-contain"
      />
      {showText && (
        <span className="font-semibold text-lg">Training platform</span>
      )}
    </Link>
  );
}
