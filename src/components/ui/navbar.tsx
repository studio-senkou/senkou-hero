"use client";

import { Search, ShoppingCart } from "lucide-react";
import { Button } from "./button";
import Image from "next/image";
import { NAVIGATION_ITEMS } from "@hero/constants/navigation";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 48);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full max-w-screen p-2 z-50 
            transition-all duration-500 ease-in-out
            ${
              hasScrolled
                ? "border-b border-gray-100 bg-white/80 backdrop-blur-md"
                : "border-b border-transparent bg-white"
            }`}
    >
      <div className="flex justify-between items-center max-w-3/4 mx-auto">
        <div>
          {pathname === "/" && (
            <Image
              src="/hero-logo-c1.png"
              alt="Hero Logo"
              width={64}
              height={12}
            />
          )}

          {pathname !== "/" && <h1 className="text-xl font-semibold">Hero</h1>}
        </div>
        <ul className="flex justify-center items-center gap-6 font-semibold text-xs">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-gray-800 hover:text-[#00B207] transition-colors duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex justify-center items-center gap-1">
          <Button variant="ghost">
            <Search />
          </Button>
          <Link href="/cart">
            <ShoppingCart size={16} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
