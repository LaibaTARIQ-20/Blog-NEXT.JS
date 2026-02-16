import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter();
import StoreProvider from "@/redux/storeProvider";
import LoadingScreen from "@/components/LoadingScreen";
import ThemeProvider from "@/components/ThemeProvider"; // ← Add this

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StoreProvider>
          <ThemeProvider>
            {" "}
            {/* ← Move ThemeProvider HERE */}
            <LoadingScreen />
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
