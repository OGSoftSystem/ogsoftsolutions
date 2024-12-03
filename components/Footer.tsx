"use client";

import Image from "next/image";
import { services } from "@/constants/services";
import Link from "next/link";
import { navLinks } from "@/constants/nav-links";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { ADDRESSES, ICONS } from "@/constants/footer-data";
// import JiraForm from "./atom/JiraForm";
import MaxWidthContainer from "./MaxWidthContainer";
import FooterIcons from "./shared/FooterIcons";

/**
 * This component render the footer
 * @returns
 */
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="bg-APP_ASH dark:bg-black dark:border-t-gray-700 border-t ">
        <section className="bg-blue-300/10">
          <MaxWidthContainer id="footer" className=" py-6 lg:relative">
            {/* Top row */}
            <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:justify-between mb-8">
              <Link
                href="/"
                className="flex items-center gap-2 poppins-heading"
              >
                <Image
                  src="/logo.png"
                  width={40}
                  height={40}
                  alt="company logo"
                />
                <h1 className="text-xl gradient-text">
                  OGSoft Solutions Limited
                </h1>
              </Link>
              
              <FooterIcons />
            </div>

            {/* Middle */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 my-4 mb-6 ">
              {/* Services */}
              <div>
                <h3 className="poppins gradient-text font-bold mb-2 text-2xl">
                  Services
                </h3>
                {services.map((service) => (
                  <Link
                    key={service.desc}
                    href={`/services?id=#${service.title}`}
                  >
                    <p className={cn("footer-link-text hover:text-blue-700 ")}>
                      {service.title}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Links */}
              <div>
                <h3 className="poppins gradient-text font-bold mb-2 text-2xl">
                  Resources
                </h3>
                {navLinks.map((link) => (
                  <Link key={link.id} href={link.path}>
                    <p
                      className={cn(
                        "footer-link-text hover:text-blue-700 capitalize"
                      )}
                    >
                      {link.id}
                    </p>
                  </Link>
                ))}
              </div>

              {/* Phone*/}
              <div className="mb-6 col-span-2 md:col-span-1">
                <h3 className="poppins gradient-text font-bold mb-2 text-2xl">
                  Reach Us
                </h3>
                <p className="footer-link-text cursor-pointer hover:text-blue-700">
                  Nigeria +2348139549853
                </p>
                <p className="footer-link-text cursor-pointer hover:text-blue-700 leading-6">
                  Australia +61 432 112 003
                </p>
                <p className="footer-link-text cursor-pointer hover:text-blue-700 leading-6">
                  Zimbabwe +263 77 988 7086
                </p>
              </div>
            </div>

            {/* OFFICE ADDRESSES */}
            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between">
              {/* Left */}
              <div className="flex flex-col">
                <h3 className="poppins gradient-text font-bold mb-2 text-2xl">
                  Our Offices
                </h3>

                <div>
                  {ADDRESSES.map((address) => (
                    <span
                      key={address}
                      className={cn(
                        "footer-link-text capitalize flex space-x-2 items-center"
                      )}
                    >
                      <MapPin className="text-blue-700 hidden lg:block" />{" "}
                      {address}
                    </span>
                  ))}
                </div>
              </div>
              {/* Right */}
              <div>{/* TODO: Add map */}</div>
            </div>
            {/* Bottom */}
          </MaxWidthContainer>
        </section>
      </footer>

      {/* Last footer part */}
      <section className="bg-APP_BTN_BLUE dark:border-t-gray-700 border-t border-t-gray-200 dark:bg-zinc-950">
        <MaxWidthContainer className="py-10">
          <p
            className={cn(
              "text-center dark:text-muted-foreground text-white text-base py-2 font-nunito-300"
            )}
          >
            Copyright &copy;{year} Ogsoft solutions limited. All rights
            reserved.
          </p>
        </MaxWidthContainer>
      </section>
    </>
  );
};

export default Footer;
