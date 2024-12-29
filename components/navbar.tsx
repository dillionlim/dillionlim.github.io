"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState, useEffect } from "react";

const navItems = [
  { label: "About", href: "/#" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume.pdf" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [clientTheme, setClientTheme] = useState<string | undefined>(undefined);

  useEffect(() => {
    setClientTheme(theme);
  }, [theme]);

  if (!clientTheme) {
    return null;
  }

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY - 60,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full border-b bg-background backdrop-blur-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            {clientTheme === "light" ? (
              <Image
                src="/images/DL-light.png"
                alt="DL"
                width="48"
                height="0"
                sizes="(max-width: 768px) 100vw, 48px"
              />
            ) : (
              <Image
                src="/images/DL-dark.png"
                alt="DL"
                width="48"
                height="0"
                sizes="(max-width: 768px) 100vw, 48px"
              />
            )}
          </Link>

          <div className="flex items-center">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className={cn(
                  "text-muted-foreground",
                  pathname === item.href && "text-foreground"
                )}
                asChild
              >
                <a href={item.href} onClick={(e) => handleScroll(e, item.href)}>{item.label}</a>
              </Button>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
