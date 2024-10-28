import MaxWidthContainer from "@/components/MaxWidthContainer";
import PageHeadingText from "@/components/shared/PageHeadingText";
import React from "react";

const PrivacyPage = () => {
  const pageHeadingText = "poppins text-gray-900 font-semibold my-4";

  return (
    <section className="paddingY">
      <MaxWidthContainer>
        <PageHeadingText
          title="Privacy"
          description="Privacy Policy for Ogsoft Solutions"
        />

        <div className="max-w-prose mx-auto">
          <h3 className={`${pageHeadingText}`}>Introduction</h3>
          <p className="p-text">
            Ogsoft Solutions we is committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, and disclose your
            personal information when you visit our website
            [https://ogsoftsolutions.com] or interact with our services.
          </p>

          <h3 className={`${pageHeadingText}`}>Information We Collect</h3>

          <p className="p-text">
            We may collect the following types of personal information from you:
            <br />
            Information you provide: This includes information you voluntarily
            provide, such as your name, email address, and any other information
            you choose to share with us.
          </p>

          <h3 className={`${pageHeadingText}`}>How We Use Your Information</h3>

          <div className="p-text">
            We may use your personal information for the following purposes:
            <ul className="list-inside list-disc">
              <li className="list-item">
                To provide and improve our services: We use your information to
                deliver our services, respond to your inquiries, and improve our
                products and website.
              </li>
              <li className="list-item">
                To communicate with you: We may use your contact information to
                send you important updates, notifications, and marketing
                communications.
              </li>
              <li className="list-item">
                To analyze and understand our users: We may use your information
                to analyze website usage, track trends, and understand our
                users&apos; preferences.
              </li>
            </ul>
          </div>

          <h3 className={`${pageHeadingText}`}>
            Disclosure of Your Information
          </h3>
          <p className="p-text">
            We may share your personal information with:
            <br /> Third-party service providers: We may engage third-party
            service providers to assist us with various aspects of our business,
            such as website hosting, data analysis, and customer support. These
            providers may have access to your personal information to perform
            their functions.
            <br />  Legal requirements: We may disclose your personal
            information to comply with applicable laws, regulations, or legal
            processes.
          </p>

          <h3 className={`${pageHeadingText}`}>Your Rights</h3>

          <div className="p-text">
            You may have certain rights regarding your personal information,
            including the right to:
            <ul className="list-inside list-disc">
              <li className="list-item">
                Access: Request access to your personal information.
              </li>
              <li className="list-item">
                Rectification: Request that your personal information be
                corrected if it is inaccurate.
              </li>
              <li className="list-item">
                Erasure: Request that your personal information be deleted.
              </li>
              <li className="list-item">
                Restriction: Request that the processing of your personal
                information be restricted.
              </li>
              <li className="list-item">
                Object: Object to the processing of your personal information.
              </li>
              <li className="list-item">
                Data portability: Request that your personal information be
                transferred to another organization.
              </li>
            </ul>
            <p className="p-text">
              To exercise your rights, please contact us using the information
              provided below.
            </p>
          </div>

          <h3 className={`${pageHeadingText}`}>Security</h3>

          <p className="p-text">
            We implement reasonable security measures to protect your personal
            information from unauthorized access, disclosure, alteration, or
            destruction. However, no method of transmission over the internet or
            electronic storage is completely secure. Please be aware that there
            is always a risk of unauthorized access
          </p>

          <h3 className={`${pageHeadingText}`}>
            Changes to This Privacy Policy
          </h3>
          <p className="p-text">
            We may update this Privacy Policy from time to time. We will notify
            you of any material changes by posting a notice on our website or by
            contacting you directly.
          </p>

          <h3 className={`${pageHeadingText}`}>Contact Us</h3>
          <p className="p-text">
            If you have any questions about this Privacy Policy or our
            practices, please contact us at:
          </p>

          <div className="p-text mt-4">
            <p>Company: Ogsoft solutions Ltd.</p>
            <p>Email: inquiry@ogsoftsolutions.com</p>
            <p>Update: 2024</p>
          </div>
        </div>
      </MaxWidthContainer>
    </section>
  );
};

export default PrivacyPage;
