import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Calendar, Download, Eye, FileText } from "lucide-react";
import { motion } from "motion/react";
import { createActor } from "../backend";
import { Layout } from "../components/Layout";
import { formatTimestamp } from "../lib/api";
import type { Note } from "../types";

// ─── React Query hook ────────────────────────────────────────────────────────

function useNotes() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotes();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── PDF Buttons ─────────────────────────────────────────────────────────────

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
        className="inline-flex items-center gap-1.5 h-8 px-3 text-xs rounded-md border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-smooth"
        data-ocid={`${ocidPrefix}.view_pdf`}
      >
        <Eye className="w-3.5 h-3.5" />
        View PDF
      </a>
      <a
        href={pdfUrl}
        download
        className="inline-flex items-center gap-1.5 h-8 px-3 text-xs rounded-md border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/60 transition-smooth"
        data-ocid={`${ocidPrefix}.download_pdf`}
      >
        <Download className="w-3.5 h-3.5" />
        Download
      </a>
    </div>
  );
}

// ─── Skeleton card ───────────────────────────────────────────────────────────

function NoteCardSkeleton() {
  return (
    <div className="glass-card rounded-xl p-5 flex flex-col gap-3">
      <Skeleton className="h-5 w-3/4 bg-muted/50" />
      <Skeleton className="h-4 w-full bg-muted/40" />
      <Skeleton className="h-4 w-5/6 bg-muted/40" />
      <Skeleton className="h-4 w-2/3 bg-muted/40" />
      <div className="flex items-center justify-between mt-auto pt-2">
        <Skeleton className="h-4 w-24 bg-muted/30" />
        <Skeleton className="h-8 w-28 rounded-lg bg-muted/30" />
      </div>
    </div>
  );
}

// ─── Single note card ─────────────────────────────────────────────────────────

interface NoteCardProps {
  note: Note;
  index: number;
}

function NoteCard({ note, index }: NoteCardProps) {
  // pdfUrl takes priority; fall back to legacy fileUrl for backward compat
  const pdfLink = note.pdfUrl || note.fileUrl;

  const glowClass =
    index % 2 === 0 ? "hover:neon-border-cyan" : "hover:neon-border-fuchsia";

  return (
    <motion.article
      data-ocid={`notes.item.${index + 1}`}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={[
        "group glass-card rounded-xl p-5 flex flex-col gap-3",
        "border border-border/20 transition-smooth cursor-default",
        "hover:-translate-y-1 hover:shadow-lg",
        glowClass,
      ].join(" ")}
    >
      {/* Icon + title row */}
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-smooth">
          <BookOpen className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-display font-semibold text-foreground leading-snug line-clamp-2 pt-1 flex-1 min-w-0">
          {note.title}
        </h3>
      </div>

      {/* Content preview */}
      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 font-body">
        {note.content || "No content available."}
      </p>

      {/* Footer: date + PDF/download buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-3 border-t border-border/20">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Calendar className="w-3.5 h-3.5 text-primary/60" />
          <span>{formatTimestamp(note.createdAt)}</span>
        </div>

        {pdfLink ? (
          <PdfButtons pdfUrl={pdfLink} ocidPrefix={`notes.pdf.${index + 1}`} />
        ) : (
          <Badge
            variant="secondary"
            className="text-xs bg-muted/50 text-muted-foreground border-border/20"
          >
            <FileText className="w-3 h-3 mr-1 opacity-60" />
            No attachment
          </Badge>
        )}
      </div>
    </motion.article>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <motion.div
      data-ocid="notes.empty_state"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-full flex flex-col items-center justify-center py-24 gap-5"
    >
      <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center border border-primary/20 neon-border-cyan">
        <BookOpen className="w-9 h-9 text-primary" />
      </div>
      <div className="text-center max-w-sm">
        <h3 className="font-display font-semibold text-xl text-foreground mb-2">
          No notes yet
        </h3>
        <p className="text-muted-foreground text-sm font-body">
          Notes and study materials will appear here once published by the
          admin.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Notes() {
  const { data: notes, isLoading, isError } = useNotes();

  const sortedNotes = notes
    ? [...notes].sort((a, b) => Number(b.createdAt - a.createdAt))
    : [];

  return (
    <Layout>
      <section
        data-ocid="notes.page"
        className="container mx-auto px-4 py-16 min-h-[70vh]"
      >
        <motion.div
          data-ocid="notes.section"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-12 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 text-primary text-xs font-mono uppercase tracking-widest mb-5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Study Materials
          </motion.span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-4">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Notes
            </span>
          </h1>
          <p className="text-muted-foreground font-body max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Curated notes, lecture summaries, and study resources — some with
            downloadable PDF attachments for offline reading.
          </p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="mx-auto mt-8 h-px w-48 rounded-full"
            style={{ background: "var(--gradient-primary)" }}
          />
        </motion.div>

        {!isLoading && !isError && sortedNotes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex justify-end mb-6"
          >
            <Badge
              variant="secondary"
              className="font-mono text-xs bg-primary/10 text-primary border-primary/20"
            >
              {sortedNotes.length} {sortedNotes.length === 1 ? "note" : "notes"}
            </Badge>
          </motion.div>
        )}

        {isError && (
          <motion.div
            data-ocid="notes.error_state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full flex flex-col items-center justify-center py-20 gap-4"
          >
            <p className="text-destructive font-body text-sm">
              Failed to load notes. Please refresh the page.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
          {isLoading ? (
            (["s1", "s2", "s3", "s4", "s5", "s6"] as const).map((sk, i) => (
              <motion.div
                data-ocid="notes.loading_state"
                key={sk}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <NoteCardSkeleton />
              </motion.div>
            ))
          ) : !isError && sortedNotes.length === 0 ? (
            <EmptyState />
          ) : (
            sortedNotes.map((note, i) => (
              <NoteCard key={String(note.id)} note={note} index={i} />
            ))
          )}
        </div>
      </section>
    </Layout>
  );
}
