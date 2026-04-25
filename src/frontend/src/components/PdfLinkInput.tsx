import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, CheckCircle2, Link, Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { validatePdfLink } from "../lib/api";

// ─── Types ───────────────────────────────────────────────────────────────────

export type ValidationStatus = "idle" | "validating" | "ok" | "warn";

interface PdfLinkInputProps {
  /** Current URL value */
  value: string;
  /** Called when URL changes */
  onChange: (url: string) => void;
  /** data-ocid prefix */
  ocidPrefix?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PdfLinkInput({
  value,
  onChange,
  ocidPrefix = "pdf_link",
}: PdfLinkInputProps) {
  const [status, setStatus] = useState<ValidationStatus>("idle");
  const [warnMsg, setWarnMsg] = useState<string | null>(null);
  const validatingRef = useRef(false);

  // Reset validation state when URL is cleared
  useEffect(() => {
    if (!value) {
      setStatus("idle");
      setWarnMsg(null);
    }
  }, [value]);

  const runValidation = async (url: string) => {
    if (!url.trim()) return;
    if (validatingRef.current) return;
    validatingRef.current = true;
    setStatus("validating");
    setWarnMsg(null);

    try {
      const { reachable } = await validatePdfLink(url.trim());
      if (reachable) {
        setStatus("ok");
        setWarnMsg(null);
      } else {
        setStatus("warn");
        setWarnMsg(
          "Link may be unreachable or requires authentication. You can still save it.",
        );
      }
    } catch {
      setStatus("warn");
      setWarnMsg("Could not validate link. You can still save it.");
    } finally {
      validatingRef.current = false;
    }
  };

  const handleBlur = () => {
    if (value.trim() && status === "idle") {
      runValidation(value);
    }
  };

  const handleValidateClick = () => {
    if (value.trim()) {
      setStatus("idle");
      runValidation(value);
    }
  };

  const handleClear = () => {
    onChange("");
    setStatus("idle");
    setWarnMsg(null);
  };

  return (
    <div className="space-y-2" data-ocid={`${ocidPrefix}.input`}>
      {/* Input row */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            type="url"
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              // Reset status on edit
              if (status !== "idle") {
                setStatus("idle");
                setWarnMsg(null);
              }
            }}
            onBlur={handleBlur}
            placeholder="https://drive.google.com/... or any public PDF link"
            className={[
              "pl-8 pr-9 bg-muted/20 border-border/40 text-foreground",
              "placeholder:text-muted-foreground/50 font-mono text-sm",
              "focus:border-primary focus:ring-1 focus:ring-primary/40",
              "transition-all duration-200",
              status === "ok"
                ? "border-emerald-500/60 focus:border-emerald-500"
                : "",
              status === "warn"
                ? "border-yellow-500/60 focus:border-yellow-500"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
            data-ocid={`${ocidPrefix}.url_input`}
          />
          {/* Inline status indicator */}
          {value && (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
              {status === "validating" && (
                <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
              )}
              {status === "ok" && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
              {status === "warn" && (
                <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
              )}
            </div>
          )}
        </div>

        {/* Validate button */}
        {value && status !== "validating" && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleValidateClick}
            className="shrink-0 h-9 px-3 text-xs border-primary/40 text-primary hover:bg-primary/10 hover:border-primary font-mono"
            data-ocid={`${ocidPrefix}.validate_button`}
          >
            Check
          </Button>
        )}

        {/* Clear button */}
        {value && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={handleClear}
            className="shrink-0 h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            aria-label="Remove PDF link"
            data-ocid={`${ocidPrefix}.clear_button`}
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>

      {/* Status badges */}
      <AnimatePresence>
        {status === "ok" && (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-xs text-emerald-400 font-body"
            data-ocid={`${ocidPrefix}.success_state`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            Link appears reachable.
          </motion.div>
        )}
        {status === "warn" && warnMsg && (
          <motion.div
            key="warn"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-1.5 text-xs text-yellow-400 font-body"
            data-ocid={`${ocidPrefix}.error_state`}
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-px" />
            <span>{warnMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper hint */}
      {!value && (
        <p className="text-xs text-muted-foreground/60 font-mono">
          Paste a Google Drive, Dropbox, S3, or any public direct PDF link.
        </p>
      )}
    </div>
  );
}
