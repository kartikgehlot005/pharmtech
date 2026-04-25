import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Shield } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface AdminLoginModalProps {
  open: boolean;
  onClose: () => void;
}

export function AdminLoginModal({ open, onClose }: AdminLoginModalProps) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const result = await login(username, password);
    setLoading(false);

    if (result.success) {
      onClose();
      setUsername("");
      setPassword("");
      navigate({ to: "/admin" });
    } else {
      setError(result.error ?? "Invalid credentials");
    }
  }

  function handleClose() {
    if (loading) return;
    setError(null);
    setUsername("");
    setPassword("");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && handleClose()}>
      <DialogContent
        className="glass-card border-0 neon-border-cyan max-w-sm"
        data-ocid="admin-login.dialog"
      >
        <DialogHeader className="flex flex-col items-center gap-2 pb-2">
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center glow-cyan">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <DialogTitle className="font-display text-xl text-foreground tracking-wide">
            Admin Access
          </DialogTitle>
          <p className="text-muted-foreground text-sm text-center">
            Restricted area. Authorized personnel only.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admin-username" className="text-foreground text-sm">
              Username
            </Label>
            <Input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              required
              disabled={loading}
              className="bg-muted/40 border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/40 font-mono"
              data-ocid="admin-login.input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admin-password" className="text-foreground text-sm">
              Password
            </Label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                disabled={loading}
                className="bg-muted/40 border-border/50 focus:border-primary focus:ring-1 focus:ring-primary/40 font-mono pr-10"
                data-ocid="admin-login.password_input"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <p
              className="text-destructive text-sm text-center bg-destructive/10 border border-destructive/30 rounded-md px-3 py-2"
              data-ocid="admin-login.error_state"
            >
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 border-border/50 hover:border-border"
              data-ocid="admin-login.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !username || !password}
              className="flex-1 gradient-primary text-primary-foreground font-semibold glow-cyan hover:opacity-90 transition-opacity"
              data-ocid="admin-login.submit_button"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying…
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
