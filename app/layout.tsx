import type { Metadata } from "next";
// import { Poppins, Nunito_Sans } from "next/font/google";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { ThemeProvider } from "@/components/NextThemeProvider";
import AuthProvider from "@/components/AuthProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import Toast from "@/components/shared/Toast";
import { siteConfig } from "@/config/site";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600", "700", "900"],
//   variable: "--font-poppins",
// });

// const nunito = Nunito_Sans({
//   subsets: ["latin"],
//   weight: ["200", "300", "400", "500", "600", "700"],
//   variable: "--font-nunito",
// });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.defaultDescription,
  },
  authors: {
    name: siteConfig.name,
    url: siteConfig.baseUrl,
  },
  keywords: siteConfig.keywords,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="main dark:hidden">
              <div className="gradient dark:hidden" />
            </div>
            <div className="overflow-x-hidden relative">{children}</div>
          </ThemeProvider>
        </body>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
        <Toast />
      </html>
    </AuthProvider>
  );
}
