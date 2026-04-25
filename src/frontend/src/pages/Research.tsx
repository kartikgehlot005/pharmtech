import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Research } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Download,
  Eye,
  FlaskConical,
  Microscope,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { createActor } from "../backend";

// ── React Query hook ─────────────────────────────────────────────────────────

function useResearches() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Research[]>({
    queryKey: ["researches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getResearches();
    },
    enabled: !!actor && !isFetching,
  });
}

// ── PDF Buttons ───────────────────────────────────────────────────────────────

interface PdfButtonsProps {
  pdfUrl: string;
  ocidPrefix: string;
}

function PdfButtons({ pdfUrl, ocidPrefix }: PdfButtonsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 h-7 px-2 text-xs rounded-md border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-colors"
        data-ocid={`${ocidPrefix}.view_pdf`}
      >
        <Eye className="w-3 h-3" />
        View PDF
      </a>
      <a
        href={pdfUrl}
        download
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 h-7 px-2 text-xs rounded-md border border-accent/40 text-accent hover:bg-accent/10 hover:border-accent transition-colors"
        data-ocid={`${ocidPrefix}.download_pdf`}
      >
        <Download className="w-3 h-3" />
        Download
      </a>
    </div>
  );
}

// ── Flip Card ────────────────────────────────────────────────────────────────

interface ResearchFlipCardProps {
  item: Research;
  index: number;
}

function ResearchFlipCard({ item, index }: ResearchFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const toggle = () => setFlipped((f) => !f);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      data-ocid={`research.item.${index + 1}`}
      className="group"
      style={{ perspective: "1200px" }}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={`Research card: ${item.title}. Press Enter to flip.`}
        className="relative w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-left"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "340px",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-xl glass-card overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <div
            className="h-1 w-full"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
            style={{
              boxShadow:
                "inset 0 0 40px oklch(0.65 0.2 200 / 0.08), 0 0 30px oklch(0.65 0.2 200 / 0.25)",
              border: "1.5px solid oklch(0.65 0.2 200 / 0.6)",
              borderRadius: "0.75rem",
            }}
          />

          <div className="p-6 flex flex-col h-full gap-4 pt-5">
            <div
              className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: "oklch(0.65 0.2 200 / 0.12)",
                border: "1px solid oklch(0.65 0.2 200 / 0.35)",
              }}
            >
              <Microscope className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg text-card-foreground leading-snug line-clamp-2">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
              {item.summary}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 font-mono neon-border-cyan bg-transparent text-primary"
                >
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 3 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-0.5 text-muted-foreground"
                >
                  +{item.tags.length - 3}
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-border/20">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                <span>{item.date}</span>
              </div>
              <span className="text-xs text-primary/70 font-mono">
                Tap to flip →
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background:
              "linear-gradient(135deg, oklch(0.18 0.06 270 / 0.95), oklch(0.14 0.05 280 / 0.98))",
            border: "1.5px solid oklch(0.65 0.25 320 / 0.5)",
            boxShadow:
              "inset 0 0 40px oklch(0.65 0.25 320 / 0.08), 0 0 30px oklch(0.65 0.25 320 / 0.2)",
          }}
        >
          <div
            className="h-1 w-full"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.65 0.25 320), oklch(0.65 0.2 200))",
            }}
          />

          <div className="p-6 flex flex-col h-full gap-4 pt-5">
            <div className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: "oklch(0.65 0.25 320 / 0.15)",
                  border: "1px solid oklch(0.65 0.25 320 / 0.4)",
                }}
              >
                <BookOpen className="w-4.5 h-4.5 text-accent" />
              </div>
              <h3 className="font-display font-bold text-base text-card-foreground leading-snug line-clamp-2">
                {item.title}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed flex-1 overflow-y-auto">
              {item.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 font-mono neon-border-fuchsia bg-transparent text-accent"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* PDF Buttons — direct link, no resolution needed */}
            {item.pdfUrl && (
              <div
                className="pt-1"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <PdfButtons
                  pdfUrl={item.pdfUrl}
                  ocidPrefix={`research.pdf.${index + 1}`}
                />
              </div>
            )}

            <div className="flex items-center justify-between pt-1 border-t border-accent/20">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5 text-accent/70" />
                <span>{item.date}</span>
              </div>
              <Button
                size="sm"
                variant="outline"
                data-ocid={`research.view_details.${index + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle();
                }}
                className="h-7 text-xs gap-1 border-accent/50 text-accent hover:bg-accent/10 hover:border-accent"
              >
                Flip back
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"] as const;

function ResearchCardSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07 }}
      className="rounded-xl glass-card overflow-hidden p-6 flex flex-col gap-4"
      style={{ minHeight: "340px" }}
    >
      <Skeleton className="w-11 h-11 rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
      </div>
      <div className="space-y-1.5 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
      <div className="flex justify-between pt-1 border-t border-border/20">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
    </motion.div>
  );
}

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      data-ocid="research.empty_state"
      className="col-span-full flex flex-col items-center justify-center gap-6 py-24 text-center"
    >
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center floating"
        style={{
          background: "oklch(0.65 0.2 200 / 0.08)",
          border: "2px solid oklch(0.65 0.2 200 / 0.3)",
          boxShadow: "0 0 40px oklch(0.65 0.2 200 / 0.15)",
        }}
      >
        <FlaskConical className="w-10 h-10 text-primary pulse-glow" />
      </div>
      <div className="space-y-2">
        <h3 className="font-display text-2xl font-bold text-foreground">
          No Research Works Yet
        </h3>
        <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
          Research publications and works will appear here once added by the
          administrator.
        </p>
      </div>
    </motion.div>
  );
}

export default function ResearchPage() {
  const { data: researches = [], isLoading, isError } = useResearches();
  // Keep actor import to satisfy potential future usage; not needed for direct URL
  useActor(createActor);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-14"
          data-ocid="research.page"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold tracking-widest uppercase mb-5"
            style={{
              background: "oklch(0.65 0.2 200 / 0.1)",
              border: "1px solid oklch(0.65 0.2 200 / 0.4)",
              color: "oklch(0.65 0.2 200)",
            }}
          >
            <Microscope className="w-3.5 h-3.5" />
            Research Works
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4"
          >
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Research Works
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Exploring the frontiers of pharmacology — hover or tap a card to
            reveal the full research details.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mx-auto mt-6 h-px w-32"
            style={{ background: "var(--gradient-primary)" }}
          />
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          data-ocid="research.list"
        >
          {isLoading &&
            SKELETON_KEYS.map((key, i) => (
              <ResearchCardSkeleton key={key} index={i} />
            ))}
          {isError && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              data-ocid="research.error_state"
              className="col-span-full flex flex-col items-center gap-4 py-20 text-center"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: "oklch(0.58 0.21 22 / 0.12)",
                  border: "1px solid oklch(0.58 0.21 22 / 0.4)",
                }}
              >
                <FlaskConical className="w-7 h-7 text-destructive" />
              </div>
              <p className="text-destructive font-display font-semibold text-lg">
                Failed to load research
              </p>
              <p className="text-muted-foreground text-sm">
                Please refresh the page to try again.
              </p>
            </motion.div>
          )}
          {!isLoading && !isError && researches.length === 0 && <EmptyState />}
          {!isLoading &&
            !isError &&
            researches.map((item, index) => (
              <ResearchFlipCard
                key={String(item.id)}
                item={item}
                index={index}
              />
            ))}
        </div>

        {!isLoading && !isError && researches.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="text-center mt-14"
          >
            <span
              className="inline-block px-5 py-2 rounded-full text-xs font-mono text-muted-foreground"
              style={{
                background: "oklch(0.22 0.05 270 / 0.5)",
                border: "1px solid oklch(var(--border) / 0.3)",
              }}
            >
              {researches.length} research{" "}
              {researches.length === 1 ? "work" : "works"} published
            </span>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
