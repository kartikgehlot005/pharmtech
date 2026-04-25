import { j as jsxRuntimeExports, a as useActor, b as useQuery, c as createActor } from "./index-BfL2YKX-.js";
import { B as BookOpen, a as Badge } from "./badge-Dx8jHwIf.js";
import { S as Skeleton } from "./skeleton-BYpl6qp9.js";
import { L as Layout, E as Eye } from "./Layout-BJ9Xxx6n.js";
import { f as formatTimestamp } from "./api-TKou_e4I.js";
import { m as motion } from "./proxy-C2WaRF_8.js";
import { C as Calendar, D as Download } from "./download-BXg937-B.js";
import { F as FileText } from "./file-text-Ci1wuJqk.js";
function useNotes() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotes();
    },
    enabled: !!actor && !isFetching
  });
}
function PdfButtons({ pdfUrl, ocidPrefix }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: pdfUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center gap-1.5 h-8 px-3 text-xs rounded-md border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-smooth",
        "data-ocid": `${ocidPrefix}.view_pdf`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5" }),
          "View PDF"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: pdfUrl,
        download: true,
        className: "inline-flex items-center gap-1.5 h-8 px-3 text-xs rounded-md border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/60 transition-smooth",
        "data-ocid": `${ocidPrefix}.download_pdf`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
          "Download"
        ]
      }
    )
  ] });
}
function NoteCardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl p-5 flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4 bg-muted/50" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full bg-muted/40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6 bg-muted/40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3 bg-muted/40" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-auto pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 bg-muted/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-28 rounded-lg bg-muted/30" })
    ] })
  ] });
}
function NoteCard({ note, index }) {
  const pdfLink = note.pdfUrl || note.fileUrl;
  const glowClass = index % 2 === 0 ? "hover:neon-border-cyan" : "hover:neon-border-fuchsia";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      "data-ocid": `notes.item.${index + 1}`,
      initial: { opacity: 0, y: 32 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1]
      },
      className: [
        "group glass-card rounded-xl p-5 flex flex-col gap-3",
        "border border-border/20 transition-smooth cursor-default",
        "hover:-translate-y-1 hover:shadow-lg",
        glowClass
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground leading-snug line-clamp-2 pt-1 flex-1 min-w-0", children: note.title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed line-clamp-3 font-body", children: note.content || "No content available." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 mt-auto pt-3 border-t border-border/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-primary/60" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatTimestamp(note.createdAt) })
          ] }),
          pdfLink ? /* @__PURE__ */ jsxRuntimeExports.jsx(PdfButtons, { pdfUrl: pdfLink, ocidPrefix: `notes.pdf.${index + 1}` }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Badge,
            {
              variant: "secondary",
              className: "text-xs bg-muted/50 text-muted-foreground border-border/20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3 mr-1 opacity-60" }),
                "No attachment"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "notes.empty_state",
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5 },
      className: "col-span-full flex flex-col items-center justify-center py-24 gap-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl glass-card flex items-center justify-center border border-primary/20 neon-border-cyan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-9 h-9 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xl text-foreground mb-2", children: "No notes yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-body", children: "Notes and study materials will appear here once published by the admin." })
        ] })
      ]
    }
  );
}
function Notes() {
  const { data: notes, isLoading, isError } = useNotes();
  const sortedNotes = notes ? [...notes].sort((a, b) => Number(b.createdAt - a.createdAt)) : [];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      "data-ocid": "notes.page",
      className: "container mx-auto px-4 py-16 min-h-[70vh]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            "data-ocid": "notes.section",
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
            className: "mb-12 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.span,
                {
                  initial: { opacity: 0, scale: 0.8 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { duration: 0.4, delay: 0.1 },
                  className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 text-primary text-xs font-mono uppercase tracking-widest mb-5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
                    "Study Materials"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "bg-clip-text text-transparent",
                  style: { backgroundImage: "var(--gradient-primary)" },
                  children: "Notes"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body max-w-xl mx-auto text-base sm:text-lg leading-relaxed", children: "Curated notes, lecture summaries, and study resources — some with downloadable PDF attachments for offline reading." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { scaleX: 0 },
                  animate: { scaleX: 1 },
                  transition: { duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] },
                  className: "mx-auto mt-8 h-px w-48 rounded-full",
                  style: { background: "var(--gradient-primary)" }
                }
              )
            ]
          }
        ),
        !isLoading && !isError && sortedNotes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.4, delay: 0.4 },
            className: "flex justify-end mb-6",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "secondary",
                className: "font-mono text-xs bg-primary/10 text-primary border-primary/20",
                children: [
                  sortedNotes.length,
                  " ",
                  sortedNotes.length === 1 ? "note" : "notes"
                ]
              }
            )
          }
        ),
        isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            "data-ocid": "notes.error_state",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            className: "col-span-full flex flex-col items-center justify-center py-20 gap-4",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-body text-sm", children: "Failed to load notes. Please refresh the page." })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr", children: isLoading ? ["s1", "s2", "s3", "s4", "s5", "s6"].map((sk, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            "data-ocid": "notes.loading_state",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: i * 0.05 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(NoteCardSkeleton, {})
          },
          sk
        )) : !isError && sortedNotes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : sortedNotes.map((note, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(NoteCard, { note, index: i }, String(note.id))) })
      ]
    }
  ) });
}
export {
  Notes as default
};
