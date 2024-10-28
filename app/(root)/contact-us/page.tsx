import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";
import React from "react";
import ContactForm from "./_components/ContactForm";
import FooterIcons from "@/components/shared/FooterIcons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
};
const ContactUs = () => {
  return (
    <section>
      <MaxWidthContainer className="paddingY">
        <PageHeadingText title="Contact Us" description="Leave a message" />

        <div className="lg:max-w-lg mx-auto bg-white dark:bg-black px-4 py-8 mb-6 rounded-md">
          <ContactForm />
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center space-y-4 pb-12">
          <FooterIcons />

          <div className="flex flex-col items-center md:flex-row gap-6 w-full justify-center">
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
          {/* 
          <div>
            {ADDRESSES.map((address) => (
              <span
                key={address}
                className={cn(
                  "footer-link-text capitalize flex space-x-2 items-center text-xs"
                )}
              >
                <MapPin className="text-blue-700 hidden lg:block" /> 

                {address}
              </span>
            ))}
          </div> */}
        </div>
      </MaxWidthContainer>
    </section>
  );
};

export default ContactUs;
