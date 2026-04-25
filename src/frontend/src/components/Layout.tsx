import { Navigation } from "./Navigation";

interface LayoutProps {
  children: React.ReactNode;
  /** If true, removes top padding (for full-bleed hero pages) */
  heroMode?: boolean;
}

export function Layout({ children, heroMode = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      <main
        className={heroMode ? "flex-1" : "flex-1 pt-16"}
        id="main-content"
        tabIndex={-1}
      >
        {children}
      </main>
      <footer className="bg-card border-t border-border/30 py-6 mt-auto">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p className="font-body">
            © {new Date().getFullYear()}{" "}
            <span className="text-foreground font-medium">
              Dr. Ashwin Singh Chouhan
            </span>{" "}
            — Pharmacologist & Researcher
          </p>
          <p className="font-body">
            Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
