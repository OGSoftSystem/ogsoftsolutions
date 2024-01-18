"use client";

import Link from "next/link";
import React, { useState } from "react";
import { MotionDiv, MotionUl } from "./atom/Motion";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { navLinks } from "@/constants/nav-links";
import { signOut, useSession } from "next-auth/react";
import { useDashboardContext } from "@/context";

const NavItems = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(pathname);

  const { setToggled } = useDashboardContext();

  return (
    <nav>
      <MotionUl
        className="mmd:flex-row mmd:items-center flex-col flex items-end"
        animate={{ y: [-300, 0] }}
        transition={{ duration: 0.85, ease: "easeInOut" }}
      >
        {navLinks.map((link) => {
          return (
            <li
              key={link.id}
              className={cn(
                "capitalize p-text px-4 py-2 rounded-md relative no-underline duration-300 ease-in",
                {
                  "text-blue-700 font-bold dark:text-zinc-300":
                    pathname === link.path,
                  "text-muted-foreground": pathname !== link.path,
                }
              )}
              onMouseOver={() => setHoveredPath(link.path)}
              onMouseLeave={() => setHoveredPath(pathname)}
              onClick={() => setToggled(false)}
            >
              {/* Links */}
              <Link href={`${link.path}`}>
                <span>{link.id}</span>
                {link.path === hoveredPath && (
                  <MotionDiv
                    className="absolute bottom-0 left-0 h-full bg-[#F2F5FA] dark:bg-zinc-900 rounded-md -z-10"
                    layoutId="navbar"
                    aria-hidden="true"
                    style={{
                      width: "100%",
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      stiffness: 130,
                      damping: 9,
                      duration: 0.3,
                    }}
                  />
                )}
              </Link>
            </li>
          );
        })}
        {status === "authenticated" &&
          (session?.user.role === "admin" ||
            session?.user.role === "super-admin") && (
            <li
              className={cn(
                "cursor-pointer hover:text-blue-700 capitalize p-text text-muted-foreground px-4 "
              )}
            >
              <Link href="/dashboard" onClick={() => setToggled(false)}>
                Dashboard
              </Link>
            </li>
          )}
        {status === "authenticated" && (
          <li
            className={cn(
              "cursor-pointer hover:text-blue-700 capitalize p-text text-muted-foreground px-4 py-2"
            )}
            onClick={() => {
              signOut();
              router.replace("/");
            }}
          >
            sign-out
          </li>
        )}
      </MotionUl>
    </nav>
  );
};

export default NavItems;
