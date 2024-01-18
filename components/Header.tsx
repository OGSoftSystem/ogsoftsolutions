"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import Image from "next/image";
import ThemeSwitch from "./ThemeSwitch";
import { cn } from "@/lib/utils";
import { XIcon, MessageCircle } from "lucide-react";

import JiraForm from "./atom/JiraForm";
import MaxWidthContainer from "./MaxWidthContainer";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { useDashboardContext } from "@/context";

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
        <div className="flex flex-1 items-center gap-5">
          <Link href="/" className="flex gap-2 items-center">
            <Image src="/logo.png" width={32} height={32} alt="company-logo" />
            <span className="gradient-text poppins-heading hidden lg:block">
              OGSoft Solutions
            </span>
          </Link>

          <div className="hidden mmd:flex">
            <NavItems />
          </div>
        </div>

        {/* Right */}
        <div className="flex item-center gap-2">
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
          "block fixed bottom-[80px] left-[20px] z-50 animate-slideLeft duration-300 w-9/12 ":
            showForm,
        })}
      >
        <JiraForm />
      </div>

      <div
        className="fixed bottom-[20px] left-[20px] w-12 h-12 rounded-full bg-APP_BTN_BLUE hover:bg-blue-700 flex items-center justify-center animate-slideLeft z-30 opacity-[0.9] cursor-pointer"
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? (
          <XIcon className="w-6  text-white" />
        ) : (
          <MessageCircle className="w-6  text-white" />
        )}
      </div>

      <div
        className={cn("hidden", {
          " fixed bottom-[20px] right-[20px] w-12 h-12 rounded-full bg-APP_BTN_BLUE hover:bg-blue-700 flex items-center justify-center animate-slideLeft z-30 opacity-[0.9] cursor-pointer":
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
