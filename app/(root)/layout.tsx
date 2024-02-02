import "react-quill/dist/quill.snow.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContextProvider } from "@/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <ContextProvider>
        <Header />
        <main className="flex-1 flex-grow">{children}</main>
        <Footer />
      </ContextProvider>
    </div>
  );
}
