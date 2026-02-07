import { SidebarTrigger } from "@/src/components/ui/sidebar";
import LoginButton from "./LoginButton";
import MovieSearch from "./MovieSearch";

export default function Header() {
  return (
    <>
      <header className="fixed top-0  z-50 w-full backdrop-blur-sm  border-b border-border/40">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="flex-shrink-0" />

            <div className="hidden md:block flex-shrink-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CINEPHILE
              </h1>
            </div>

            <div className="flex-1 max-w-2xl">
              <MovieSearch />
            </div>

            <div className="flex-shrink-0">
              <LoginButton />
            </div>
          </div>
        </div>
      </header>

      <div className="h-[73px]" aria-hidden="true" />
    </>
  );
}
