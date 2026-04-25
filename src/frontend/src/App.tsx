import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AdminRoute } from "./components/AdminRoute";
import { AuthProvider } from "./context/AuthContext";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/Home"));
const ResearchPage = lazy(() => import("./pages/Research"));
const ArticlesPage = lazy(() => import("./pages/Articles"));
const PublicationsPage = lazy(() => import("./pages/Publications"));
const NotesPage = lazy(() => import("./pages/Notes"));
const AboutPage = lazy(() => import("./pages/About"));
const ContactPage = lazy(() => import("./pages/Contact"));
const AdminPage = lazy(() => import("./pages/Admin"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
});

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="text-muted-foreground text-sm font-body">Loading…</p>
      </div>
    </div>
  );
}

// Root layout route
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

// Page routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const researchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/research",
  component: ResearchPage,
});

const articlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/articles",
  component: ArticlesPage,
});

const publicationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/publications",
  component: PublicationsPage,
});

const notesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notes",
  component: NotesPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <AdminRoute>
      <Suspense fallback={<PageLoader />}>
        <AdminPage />
      </Suspense>
    </AdminRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  researchRoute,
  articlesRoute,
  publicationsRoute,
  notesRoute,
  aboutRoute,
  contactRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              toast:
                "glass-card border border-border/40 text-foreground font-body",
              title: "font-display font-semibold",
              description: "text-muted-foreground text-sm",
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
