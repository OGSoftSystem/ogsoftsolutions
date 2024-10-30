"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";
import { cn } from "@/lib/utils";
import { XIcon, Mail } from "lucide-react";

import JiraForm from "./atom/JiraForm";
import MaxWidthContainer from "./MaxWidthContainer";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { useDashboardContext } from "@/context";
import WhatsappWidget from "./atom/WhatsappWidget";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "./ui/button";

const Header = () => {
  const { toggled, setToggled } = useDashboardContext();

  const [showNav, setShowNav] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 100) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  }, [setShowNav]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    if (toggled) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  });

  const backToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const router = useRouter();
  const { data: session, status } = useSession();

  return (
    <>
      <MaxWidthContainer
        className={cn(
          "flex items-center justify-between w-full h-16 relative py-4 border-b",
          {
            "animate-slideDown fixed top-100 h-16 left-0 right-0 px-4 md:px-8 lg:px-28 min-w-[100vw] bg-white dark:bg-black z-50":
              showNav,
          }
        )}
      >
        {/* Left */}
        <Link href="/" className="flex gap-2 items-center">
          <Image src="/logo.png" width={32} height={32} alt="company-logo" />
          <span className="gradient-text poppins-heading hidden lg:block">
            OGSoft Solutions
          </span>
        </Link>

        <div className="hidden mmd:flex">
          <NavItems />
        </div>

        {/* Right */}

        <div className="flex item-center gap-2 md:gap-4">
          <Link
            href={"/contact-us"}
            className={`${buttonVariants({
              variant: "outline",
              className: "poppins font-bold text-[0.75rem] md:text-sm",
            })}`}
          >
            Contact Us
          </Link>

          {status === "authenticated" && session?.user.role === "admin" && (
            <DropdownMenu>
              <DropdownMenuTrigger className="size-10 flex items-center justify-center px-2 py-1 border rounded-full">
                A
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link
                    href={"/dashboard"}
                    className="font-normal text-gray-600 cursor-pointer"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className={cn("cursor-pointer font-normal text-gray-600")}
                  onClick={() => {
                    signOut();
                    router.replace("/");
                  }}
                >
                  sign-out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Theme Button */}
          <ThemeSwitch />

          {/* Toggle */}
          <div className="mmd:hidden">
            <Image
              src={toggled ? "/x.svg" : "/menu.svg"}
              width={35}
              height={35}
              alt="menu-open-close"
              className="cursor-pointer"
              onClick={() => setToggled((prev) => !prev)}
            />

            {/* Mobile NAV */}
            <MobileNav toggled={toggled} />
          </div>
        </div>
      </MaxWidthContainer>

      <div
        className={cn("hidden", {
          "block fixed bottom-[110px] left-[20px] z-50 animate-slideLeft duration-300 w-9/12 ":
            showForm,
        })}
      >
        <JiraForm />
      </div>

      {/* Toggle form icon */}
      <div
        className={cn("hidden", {
          "fixed bottom-[65px] left-[15px] w-10 h-10 rounded-full bg-[#3156F2] hover:bg-blue-700 flex items-center justify-center animate-slideLeft z-30 opacity-[0.9] cursor-pointer":
            showNav,
        })}
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? (
          <XIcon className="w-6 text-white" />
        ) : (
          <Mail className="w-6 text-white" />
        )}
      </div>

      <div
        className={cn("hidden", {
          "fixed bottom-[20px] right-[15px] w-10 h-10 flex items-center justify-center animate-slideRight z-30 ":
            showNav,
        })}
        onClick={() => backToTop()}
      >
        {/* WhatsApp */}
        <WhatsappWidget />
      </div>

      <div
        className={cn("hidden", {
          "fixed bottom-[20px] left-[15px] w-10 h-10 rounded-full bg-[#3156F2] hover:bg-blue-700 flex items-center justify-center animate-slideLeft z-30 opacity-[0.9] cursor-pointer":
            showNav,
        })}
        onClick={() => backToTop()}
      >
        <p className="text-white dark:text-zinc-400">&#8679;</p>
      </div>
    </>
  );
};

export default Header;
