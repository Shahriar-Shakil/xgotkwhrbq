import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppSidebar } from "@/src/components/app-sidebar";
import Header from "@/src/components/Header";
import { SidebarProvider } from "@/src/components/ui/sidebar";
import { AuthProvider } from "@/src/providers/authContext";
import { ThemeProvider } from "@/src/providers/themeProvider";
import { TMDBProvider } from "@/src/providers/tmdb-provider";
import { WatchlistProvider } from "@/src/providers/watchlistprovider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apiKey = process.env.TMDB_API_KEY!;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <WatchlistProvider>
              <TMDBProvider apiKey={apiKey}>
                <SidebarProvider defaultOpen={false}>
                  <AppSidebar />
                  <div className="flex-1 flex flex-col w-full">
                    <Header />
                    <main className="flex-1">{children}</main>
                  </div>
                </SidebarProvider>
              </TMDBProvider>
            </WatchlistProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
