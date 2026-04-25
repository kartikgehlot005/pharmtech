import { Button } from "@/components/ui/button";
import { useActor } from "@caffeineai/core-infrastructure";
import { CheckCircle2, FileText, Loader2, Upload, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { createActor } from "../backend";
import { unwrapOk } from "../lib/api";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface PdfAttachment {
  fileId: string;
  fileName: string;
}

interface PdfUploadZoneProps {
  /** Current attachment (if any) */
  value?: PdfAttachment;
  /** Called when a new PDF is successfully uploaded and registered */
  onChange: (attachment: PdfAttachment | undefined) => void;
  /** Admin session token for calling uploadPdf on the canister */
  token: string;
  /** data-ocid prefix for deterministic markers */
  ocidPrefix?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function PdfUploadZone({
  value,
  onChange,
  token,
  ocidPrefix = "pdf",
}: PdfUploadZoneProps) {
  const { actor } = useActor(createActor);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.includes("pdf") && !file.name.endsWith(".pdf")) {
        setError("Only PDF files are allowed.");
        return;
      }
      if (!actor) {
        setError("Not connected to backend.");
        return;
      }

      setError(null);
      setIsUploading(true);
      setProgress(0);

      try {
        // Register metadata in canister directly (no CDN upload)
        const fileId = `local-${Date.now()}-${file.name}`;
        const result = await actor.uploadPdf(
          token,
          file.name,
          "application/pdf",
          fileId,
        );
        const uploadResult = unwrapOk(result);
        onChange({ fileId: uploadResult.fileId, fileName: file.name });
        setProgress(100);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed.");
      } finally {
        setIsUploading(false);
      }
    },
    [actor, token, onChange],
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const onDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input so the same file can be re-uploaded after removal
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleRemove = () => {
    onChange(undefined);
    setProgress(0);
    setError(null);
  };

  // ── Render: has attachment ──
  if (value) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-4 py-3 rounded-lg border border-primary/30 bg-primary/5 neon-border-cyan"
        data-ocid={`${ocidPrefix}.success_state`}
      >
        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-body font-medium text-foreground truncate">
            {value.fileName}
          </p>
          <p className="text-xs text-muted-foreground font-mono truncate">
            ID: {value.fileId.slice(0, 16)}…
          </p>
        </div>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handleRemove}
          className="shrink-0 h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          aria-label="Remove PDF"
          data-ocid={`${ocidPrefix}.delete_button`}
        >
          <X className="w-3.5 h-3.5" />
        </Button>
      </motion.div>
    );
  }

  // ── Render: uploading ──
  if (isUploading) {
    return (
      <div
        className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-4"
        data-ocid={`${ocidPrefix}.loading_state`}
      >
        <div className="flex items-center gap-3 mb-3">
          <Loader2 className="w-4 h-4 text-primary animate-spin shrink-0" />
          <p className="text-sm text-foreground font-body">
            Uploading PDF… {progress}%
          </p>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full bg-muted/40 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>
    );
  }

  // ── Render: drop zone ──
  return (
    <div>
      <button
        type="button"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
        aria-label="Upload PDF — click or drag and drop"
        data-ocid={`${ocidPrefix}.dropzone`}
        className={[
          "relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed",
          "min-h-[96px] cursor-pointer transition-all duration-200 px-4 py-5",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          isDragging
            ? "border-primary bg-primary/10 neon-border-cyan scale-[1.01]"
            : "border-border/40 bg-muted/10 hover:border-primary/60 hover:bg-primary/5",
        ].join(" ")}
      >
        <Upload
          className={`w-6 h-6 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`}
        />
        <div className="text-center">
          <p className="text-sm font-body text-foreground/80">
            <span className="text-primary font-medium">Click to upload</span> or
            drag &amp; drop
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 font-mono">
            PDF files only
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="sr-only"
          onChange={onFileInputChange}
          aria-hidden="true"
          tabIndex={-1}
        />
      </button>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs text-destructive font-body flex items-center gap-1.5"
            data-ocid={`${ocidPrefix}.error_state`}
          >
            <FileText className="w-3 h-3 shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
