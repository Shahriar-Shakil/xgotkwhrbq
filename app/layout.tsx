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
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://Cinephile.com",
  ),
  title: {
    default: "Cinephile - Discover Movies, TV Shows & Entertainment",
    template: "%s | Cinephile",
  },
  description:
    "Your ultimate destination for discovering movies, TV shows, and entertainment content.",
  applicationName: "Cinephile",
  referrer: "origin-when-cross-origin",
  keywords: ["movies", "tv shows", "entertainment", "cinema", "streaming"],
  authors: [{ name: "Cinephile" }],
  creator: "Cinephile",
  publisher: "Cinephile",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Cinephile",
  },
};
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
