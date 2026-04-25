import { j as jsxRuntimeExports, a as useActor, b as useQuery, r as reactExports, c as createActor } from "./index-BfL2YKX-.js";
import { B as BookOpen, a as Badge } from "./badge-Dx8jHwIf.js";
import { S as Skeleton } from "./skeleton-BYpl6qp9.js";
import { L as Layout, E as Eye } from "./Layout-BJ9Xxx6n.js";
import { c as createLucideIcon, m as motion } from "./proxy-C2WaRF_8.js";
import { C as Calendar, D as Download } from "./download-BXg937-B.js";
import { E as ExternalLink } from "./external-link-DSudotbt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3", key: "1i73f7" }],
  ["path", { d: "M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3", key: "saxlbk" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 14v2", key: "8jcxud" }],
  ["path", { d: "M12 8v2", key: "1woqiv" }],
  ["path", { d: "M12 2v2", key: "tus03m" }]
];
const FlipHorizontal = createLucideIcon("flip-horizontal", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];
function usePublications() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["publications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPublications();
    },
    enabled: !!actor && !isFetching
  });
}
function formatAuthors(authors, preview = false) {
  if (authors.length === 0) return "Unknown Authors";
  if (!preview) return authors.join(", ");
  if (authors.length <= 2) return authors.join(", ");
  return `${authors[0]}, ${authors[1]}, et al.`;
}
function PdfButtons({ pdfUrl, ocidPrefix }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: pdfUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        onClick: (e) => e.stopPropagation(),
        className: "inline-flex items-center gap-1 h-6 px-2 text-[10px] rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition-colors",
        "data-ocid": `${ocidPrefix}.view_pdf`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
          "View PDF"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: pdfUrl,
        download: true,
        onClick: (e) => e.stopPropagation(),
        className: "inline-flex items-center gap-1 h-6 px-2 text-[10px] rounded-md border border-accent/40 text-accent hover:bg-accent/10 transition-colors",
        "data-ocid": `${ocidPrefix}.download_pdf`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
          "Download"
        ]
      }
    )
  ] });
}
function PublicationFlipCard({ pub, index }) {
  const [flipped, setFlipped] = reactExports.useState(false);
  const isMobile = window.matchMedia("(pointer: coarse)").matches;
  const handleInteraction = () => {
    if (isMobile) setFlipped((f) => !f);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      "data-ocid": `publications.item.${index + 1}`,
      className: "h-80 cursor-pointer",
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
      style: { perspective: "1200px" },
      onMouseEnter: () => !isMobile && setFlipped(true),
      onMouseLeave: () => !isMobile && setFlipped(false),
      onClick: handleInteraction,
      "aria-label": `Publication: ${pub.title}. ${flipped ? "Showing details." : "Hover to flip."}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative w-full h-full transition-transform duration-700",
          style: {
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "absolute inset-0 rounded-xl glass-card neon-border-cyan flex flex-col justify-between p-5 overflow-hidden",
                style: { backfaceVisibility: "hidden" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-primary via-accent to-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Badge,
                      {
                        variant: "secondary",
                        className: "font-mono text-xs bg-primary/10 text-primary border border-primary/30 shrink-0",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3 h-3 mr-1" }),
                          Number(pub.year)
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FlipHorizontal, { className: "w-4 h-4 text-muted-foreground/50 shrink-0 mt-0.5" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col justify-center gap-2 mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-base leading-snug line-clamp-3", children: pub.title }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-primary truncate", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium", children: pub.journal })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground truncate", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: formatAuthors(pub.authors, true) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-[10px] text-muted-foreground/50 font-mono", children: "hover to reveal" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "absolute inset-0 rounded-xl glass-card neon-border-fuchsia flex flex-col p-5 overflow-hidden",
                style: { backfaceVisibility: "hidden", transform: "rotateY(180deg)" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-1 rounded-t-xl bg-gradient-to-r from-accent via-primary to-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto scrollbar-thin pr-1 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: pub.abstract }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 border-t border-border/30 pt-2.5 space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-accent mb-1 uppercase tracking-wider", children: "Authors" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 leading-relaxed line-clamp-2", children: formatAuthors(pub.authors, false) })
                    ] }),
                    pub.doi && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "a",
                      {
                        "data-ocid": `publications.doi_link.${index + 1}`,
                        href: `https://doi.org/${pub.doi}`,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center gap-1.5 text-xs text-primary hover:text-accent transition-colors duration-200 truncate",
                        onClick: (e) => e.stopPropagation(),
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5 shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono", children: pub.doi })
                        ]
                      }
                    ),
                    pub.pdfUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        onClick: (e) => e.stopPropagation(),
                        onKeyDown: (e) => e.stopPropagation(),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PdfButtons,
                          {
                            pdfUrl: pub.pdfUrl,
                            ocidPrefix: `publications.pdf.${index + 1}`
                          }
                        )
                      }
                    )
                  ] })
                ]
              }
            )
          ]
        }
      )
    }
  );
}
function CardSkeleton({ index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "publications.loading_state",
      className: "h-80 rounded-xl glass-card neon-border-cyan p-5 flex flex-col justify-between",
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.08 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full bg-muted/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1 mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full bg-muted/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-5/6 bg-muted/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-4/5 bg-muted/50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-3/4 bg-muted/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-2/3 bg-muted/40" })
        ] })
      ]
    }
  );
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "publications.empty_state",
      className: "col-span-full flex flex-col items-center justify-center py-24 text-center",
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl glass-card neon-border-cyan flex items-center justify-center mb-6 glow-cyan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-10 h-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl text-foreground mb-2", children: "No Publications Yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm", children: "Research publications will appear here once added. Check back soon." })
      ]
    }
  );
}
function PublicationsPage() {
  const { data: publications, isLoading, isError } = usePublications();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      "data-ocid": "publications.page",
      className: "relative min-h-screen py-16 px-4",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[80px]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-7xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              className: "text-center mb-14",
              initial: { opacity: 0, y: -30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, ease: "easeOut" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card neon-border-cyan mb-5",
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { delay: 0.15, duration: 0.4 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4 h-4 text-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-primary uppercase tracking-widest", children: "Peer-Reviewed Research" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-4xl md:text-6xl tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-primary via-foreground to-accent", children: "Publications" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.p,
                  {
                    className: "mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base",
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { delay: 0.3, duration: 0.5 },
                    children: "Hover over a card to reveal the full abstract, authors, and DOI."
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  motion.div,
                  {
                    className: "mt-6 flex items-center justify-center gap-3",
                    initial: { opacity: 0, scaleX: 0 },
                    animate: { opacity: 1, scaleX: 1 },
                    transition: { delay: 0.4, duration: 0.6 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-24 bg-gradient-to-r from-transparent to-primary" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary glow-cyan" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-24 bg-gradient-to-l from-transparent to-accent" })
                    ]
                  }
                )
              ]
            }
          ),
          !isLoading && !isError && publications && publications.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "flex justify-center mb-8",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 0.5 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "font-mono text-xs text-accent border-accent/30 bg-accent/5 px-3 py-1",
                  children: [
                    publications.length,
                    " publication",
                    publications.length !== 1 ? "s" : ""
                  ]
                }
              )
            }
          ),
          isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              "data-ocid": "publications.error_state",
              className: "col-span-full text-center py-16",
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-mono text-sm", children: "Failed to load publications. Please try again." })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: isLoading ? SKELETON_KEYS.map((k, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, { index: i }, k)) : !isError && (publications == null ? void 0 : publications.length) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : publications == null ? void 0 : publications.map((pub, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PublicationFlipCard, { pub, index: i }, String(pub.id))) })
        ] })
      ]
    }
  ) });
}
export {
  PublicationsPage as default
};
