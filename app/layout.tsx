import type { Metadata } from "next";
// import { Poppins, Nunito_Sans } from "next/font/google";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./globals.css";
import { ThemeProvider } from "@/components/NextThemeProvider";
import AuthProvider from "@/components/AuthProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import { siteConfig } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
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
          <Toaster />
        </body>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
      </AuthProvider>
    </html>
  );
}
