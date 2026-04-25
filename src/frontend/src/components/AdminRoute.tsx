import { Navigate } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  const { isAdmin, isValidating } = useAuth();

  if (isValidating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"
            data-ocid="admin-route.loading_state"
          />
          <p className="text-muted-foreground font-body text-sm">
            Validating session…
          </p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
