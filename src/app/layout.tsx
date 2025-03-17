import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/Header";
import syncBookStack from "@/lib/sync/BookStack"

export const metadata: Metadata = {
  title: "VRCD Profile"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

syncBookStack()
setInterval(() => {
  syncBookStack()
}, 10 * 60  * 1000) // 10 minutes