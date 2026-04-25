import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Calendar,
  Download,
  ExternalLink,
  Eye,
  FlipHorizontal,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { createActor } from "../backend";
import { Layout } from "../components/Layout";
import type { Publication } from "../types";

const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];

// ─── Queries ─────────────────────────────────────────────────────────────────

function usePublications() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Publication[]>({
    queryKey: ["publications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublications();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatAuthors(authors: string[], preview = false): string {
  if (authors.length === 0) return "Unknown Authors";
  if (!preview) return authors.join(", ");
  if (authors.length <= 2) return authors.join(", ");
  return `${authors[0]}, ${authors[1]}, et al.`;
}

// ─── PDF Buttons ─────────────────────────────────────────────────────────────

interface PdfButtonsProps {
  pdfUrl: string;
  ocidPrefix: string;
}

function PdfButtons({ pdfUrl, ocidPrefix }: PdfButtonsProps) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 h-6 px-2 text-[10px] rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition-colors"
        data-ocid={`${ocidPrefix}.view_pdf`}
      >
        <Eye className="w-3 h-3" />
        View PDF
      </a>
      <a
        href={pdfUrl}
        download
        onClick={(e) => e.stopPropagation()}
        className="inline-flex items-center gap-1 h-6 px-2 text-[10px] rounded-md border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
        data-ocid={`${ocidPrefix}.download_pdf`}
      >
        <Download className="w-3 h-3" />
        Download
      </a>
    </div>
  );
}

// ─── Flip Card ───────────────────────────────────────────────────────────────

interface FlipCardProps {
  pub: Publication;
  index: number;
}

function PublicationFlipCard({ pub, index }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const isMobile = window.matchMedia("(pointer: coarse)").matches;

  const handleInteraction = () => {
    if (isMobile) setFlipped((f) => !f);
  };

  return (
    <motion.div
      data-ocid={`publications.item.${index + 1}`}
      className="h-80 cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: "1200px" }}
      onMouseEnter={() => !isMobile && setFlipped(true)}
      onMouseLeave={() => !isMobile && setFlipped(false)}
      onClick={handleInteraction}
      aria-label={`Publication: ${pub.title}. ${flipped ? "Showing details." : "Hover to flip."}`}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-xl glass-card neon-border-cyan flex flex-col justify-between p-5 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-primary via-accent to-primary" />
          <div className="flex items-start justify-between gap-2">
            <Badge
              variant="secondary"
              className="font-mono text-xs bg-primary/10 text-primary border border-primary/30 shrink-0"
            >
              <Calendar className="w-3 h-3 mr-1" />
              {Number(pub.year)}
            </Badge>
            <FlipHorizontal className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-0.5" />
          </div>
          <div className="flex-1 flex flex-col justify-center gap-2 mt-3">
            <h3 className="font-display font-bold text-foreground text-base leading-snug line-clamp-3">
              {pub.title}
            </h3>
          </div>
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-primary truncate">
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate font-medium">{pub.journal}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                {formatAuthors(pub.authors, true)}
              </span>
            </div>
          </div>
          <p className="mt-2 text-center text-[10px] text-muted-foreground/50 font-mono">
            hover to reveal
          </p>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-xl glass-card neon-border-fuchsia flex flex-col p-5 overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-accent via-primary to-accent" />
          <div className="flex-1 overflow-y-auto scrollbar-thin pr-1 mt-1">
            <p className="text-xs text-muted-foreground leading-relaxed">
              {pub.abstract}
            </p>
          </div>
          <div className="mt-3 border-t border-border/30 pt-2.5 space-y-2">
            <div>
              <p className="text-[10px] font-mono text-accent mb-1 uppercase tracking-wider">
                Authors
              </p>
              <p className="text-xs text-foreground/80 leading-relaxed line-clamp-2">
                {formatAuthors(pub.authors, false)}
              </p>
            </div>
            {pub.doi && (
              <a
                data-ocid={`publications.doi_link.${index + 1}`}
                href={`https://doi.org/${pub.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-primary hover:text-accent transition-colors duration-200 truncate"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate font-mono">{pub.doi}</span>
              </a>
            )}
            {pub.pdfUrl && (
              <div
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <PdfButtons
                  pdfUrl={pub.pdfUrl}
                  ocidPrefix={`publications.pdf.${index + 1}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function CardSkeleton({ index }: { index: number }) {
  return (
    <motion.div
      data-ocid="publications.loading_state"
      className="h-80 rounded-xl glass-card neon-border-cyan p-5 flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Skeleton className="h-5 w-16 rounded-full bg-muted/50" />
      <div className="space-y-2 flex-1 mt-4">
        <Skeleton className="h-4 w-full bg-muted/50" />
        <Skeleton className="h-4 w-5/6 bg-muted/50" />
        <Skeleton className="h-4 w-4/5 bg-muted/50" />
      </div>
      <div className="space-y-1.5 mt-3">
        <Skeleton className="h-3 w-3/4 bg-muted/40" />
        <Skeleton className="h-3 w-2/3 bg-muted/40" />
      </div>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      data-ocid="publications.empty_state"
      className="col-span-full flex flex-col items-center justify-center py-24 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="w-20 h-20 rounded-2xl glass-card neon-border-cyan flex items-center justify-center mb-6 glow-cyan">
        <BookOpen className="w-10 h-10 text-primary" />
      </div>
      <h3 className="font-display font-bold text-xl text-foreground mb-2">
        No Publications Yet
      </h3>
      <p className="text-muted-foreground text-sm max-w-sm">
        Research publications will appear here once added. Check back soon.
      </p>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PublicationsPage() {
  const { data: publications, isLoading, isError } = usePublications();

  return (
    <Layout>
      <section
        data-ocid="publications.page"
        className="relative min-h-screen py-16 px-4"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card neon-border-cyan mb-5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono text-primary uppercase tracking-widest">
                Peer-Reviewed Research
              </span>
            </motion.div>
            <h1 className="font-display font-black text-4xl md:text-6xl tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-accent">
                Publications
              </span>
            </h1>
            <motion.p
              className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Hover over a card to reveal the full abstract, authors, and DOI.
            </motion.p>
            <motion.div
              className="mt-6 flex items-center justify-center gap-3"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary" />
              <div className="w-2 h-2 rounded-full bg-primary glow-cyan" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-accent" />
            </motion.div>
          </motion.div>

          {!isLoading &&
            !isError &&
            publications &&
            publications.length > 0 && (
              <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Badge
                  variant="outline"
                  className="font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1"
                >
                  {publications.length} publication
                  {publications.length !== 1 ? "s" : ""}
                </Badge>
              </motion.div>
            )}

          {isError && (
            <motion.div
              data-ocid="publications.error_state"
              className="col-span-full text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-destructive font-mono text-sm">
                Failed to load publications. Please try again.
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              SKELETON_KEYS.map((k, i) => <CardSkeleton key={k} index={i} />)
            ) : !isError && publications?.length === 0 ? (
              <EmptyState />
            ) : (
              publications?.map((pub, i) => (
                <PublicationFlipCard key={String(pub.id)} pub={pub} index={i} />
              ))
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
