import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContextProvider } from "@/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ContextProvider>
      <div className="min-h-screen size-full flex flex-col justify-between">
        <Header />
        <main className="flex-1 h-full">{children}</main>
        <Footer />
      </div>
    </ContextProvider>
  );
}
