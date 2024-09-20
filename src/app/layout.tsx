import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/ui/theme-provider";
import { ThemeToggle } from "../components/theme-toggle";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Riley's Super Fun Mega Game App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-6`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="nav-bar py-6 flex flex-row items-center">
            <h1 className="text-lg font-bold">
              Riley&apos;s Super Fun Mega Game App
            </h1>
            <span className="ml-auto">
              <ThemeToggle></ThemeToggle>
            </span>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
