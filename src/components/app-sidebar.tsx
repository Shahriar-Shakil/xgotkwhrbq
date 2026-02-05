"use client";

import { Clapperboard, Film, Home, List, Search, Tv, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";

const navigationItems = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Search",
    icon: Search,
    href: "/search",
  },
  {
    title: "OTT",
    icon: Tv,
    href: "/ott",
  },
  {
    title: "Movies",
    icon: Clapperboard,
    href: "/movies",
  },
  {
    title: "Genres",
    icon: List,
    href: "/genres",
  },
  {
    title: "Recently Viewed",
    icon: Film,
    href: "/recently-viewed",
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" className="border-r border-white/10 ">
      <SidebarHeader className="border-b border-white/10 p-4">
        <Link
          href="/"
          className="flex items-center gap-3 group transition-all duration-200"
        >
          <div className="relative shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-pink-500 to-purple-500 rounded-lg blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-gradient-to-br from-red-600 via-pink-600 to-purple-600 p-2 rounded-lg">
              <Film className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="text-lg font-black tracking-tight text-white">
              CINEPHILE
            </h1>
            <p className="text-[9px] font-semibold text-red-500 tracking-widest uppercase -mt-0.5">
              Movie DB
            </p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarMenu>
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                    className={`
                      relative my-1 rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? "bg-gradient-to-r from-red-600 to-pink-600 text-white hover:from-red-500 hover:to-pink-500"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }
                    `}
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" strokeWidth={2} />
                      <span className="font-semibold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="My Account"
              size="lg"
              className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-xl"
            >
              <Link
                href="/account"
                className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center shrink-0 shadow-lg">
                  <User className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>

                <div className="flex flex-col group-data-[collapsible=icon]:hidden overflow-hidden">
                  <p className="text-sm font-semibold text-white truncate leading-none mb-1">
                    My Account
                  </p>
                  <p className="text-xs text-white/50 truncate leading-none">
                    Settings & Profile
                  </p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
