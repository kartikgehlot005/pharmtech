import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { NAV_LINKS } from "../types";
import { AdminLoginModal } from "./AdminLoginModal";

export function Navigation() {
  const { isAdmin, logout } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "glass-card border-b border-border/30 shadow-lg"
            : "bg-background/80 backdrop-blur-md border-b border-transparent",
        )}
        data-ocid="nav.panel"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group shrink-0"
            data-ocid="nav.home_link"
          >
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center glow-cyan group-hover:scale-105 transition-transform duration-200">
              <span className="font-display font-bold text-primary-foreground text-sm tracking-widest">
                AS
              </span>
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-foreground text-sm">
                Dr. Ashwin Singh
              </span>
              <span className="text-muted-foreground text-xs">
                Pharmacologist & Researcher
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative px-3 py-2 text-sm font-body font-medium rounded-md transition-all duration-200 group",
                  isActive(link.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
                data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "-")}_link`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary glow-cyan" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="hidden lg:flex items-center gap-1.5 border-destructive/40 text-destructive hover:bg-destructive/10 text-xs"
                data-ocid="nav.logout_button"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </Button>
            )}

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-foreground"
                  aria-label="Open menu"
                  data-ocid="nav.mobile_menu_button"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="glass-card border-l border-border/30 w-72"
                data-ocid="nav.mobile_menu"
              >
                <div className="flex items-center justify-between mb-8 mt-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                      <span className="font-display font-bold text-primary-foreground text-xs">
                        AS
                      </span>
                    </div>
                    <span className="font-display font-semibold text-foreground text-sm">
                      Dr. Ashwin Singh
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close menu"
                    data-ocid="nav.mobile_close_button"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav
                  className="flex flex-col gap-1"
                  aria-label="Mobile navigation"
                >
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-md text-sm font-body font-medium transition-all duration-200",
                        isActive(link.path)
                          ? "bg-primary/15 text-primary neon-border-cyan border"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      )}
                      data-ocid={`nav.mobile_${link.label.toLowerCase().replace(/\s+/g, "-")}_link`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {isAdmin && (
                  <div className="mt-6 pt-6 border-t border-border/30">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        logout();
                        setMobileOpen(false);
                      }}
                      className="w-full border-destructive/40 text-destructive hover:bg-destructive/10"
                      data-ocid="nav.mobile_logout_button"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hidden admin trigger — bottom-right corner */}
      <button
        type="button"
        onClick={() => setAdminModalOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 z-40 w-8 h-8 rounded-full",
          "opacity-0 hover:opacity-30 focus:opacity-50 transition-opacity duration-300",
          "flex items-center justify-center",
          "bg-muted/20 border border-border/10",
        )}
        aria-label="Admin login"
        data-ocid="nav.admin_trigger_button"
      >
        <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
      </button>

      <AdminLoginModal
        open={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </>
  );
}
