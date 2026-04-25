import { a as useActor, j as jsxRuntimeExports, b as useQuery, r as reactExports, c as createActor } from "./index-BfL2YKX-.js";
import { L as Layout, E as Eye } from "./Layout-BJ9Xxx6n.js";
import { a as Badge, B as BookOpen } from "./badge-Dx8jHwIf.js";
import { c as createLucideIcon, m as motion, B as Button } from "./proxy-C2WaRF_8.js";
import { S as Skeleton } from "./skeleton-BYpl6qp9.js";
import { F as FlaskConical } from "./flask-conical-TD_GylO8.js";
import { C as Calendar, D as Download } from "./download-BXg937-B.js";
import { A as ArrowRight } from "./arrow-right-BHXj50J4.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 18h8", key: "1borvv" }],
  ["path", { d: "M3 22h18", key: "8prr45" }],
  ["path", { d: "M14 22a7 7 0 1 0 0-14h-1", key: "1jwaiy" }],
  ["path", { d: "M9 14h2", key: "197e7h" }],
  ["path", { d: "M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z", key: "1bmzmy" }],
  ["path", { d: "M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3", key: "1drr47" }]
];
const Microscope = createLucideIcon("microscope", __iconNode);
function useResearches() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["researches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getResearches();
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
        onClick: (e) => e.stopPropagation(),
        className: "inline-flex items-center gap-1 h-7 px-2 text-xs rounded-md border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-colors",
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
        className: "inline-flex items-center gap-1 h-7 px-2 text-xs rounded-md border border-accent/40 text-accent hover:bg-accent/10 hover:border-accent transition-colors",
        "data-ocid": `${ocidPrefix}.download_pdf`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3" }),
          "Download"
        ]
      }
    )
  ] });
}
function ResearchFlipCard({ item, index }) {
  const [flipped, setFlipped] = reactExports.useState(false);
  const toggle = () => setFlipped((f) => !f);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 40 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: index * 0.1, ease: "easeOut" },
      "data-ocid": `research.item.${index + 1}`,
      className: "group",
      style: { perspective: "1200px" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: toggle,
          "aria-label": `Research card: ${item.title}. Press Enter to flip.`,
          className: "relative w-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary text-left",
          style: {
            transformStyle: "preserve-3d",
            transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            minHeight: "340px"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "absolute inset-0 rounded-xl glass-card overflow-hidden",
                style: {
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-1 w-full",
                      style: { background: "var(--gradient-primary)" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300",
                      style: {
                        boxShadow: "inset 0 0 40px oklch(0.65 0.2 200 / 0.08), 0 0 30px oklch(0.65 0.2 200 / 0.25)",
                        border: "1.5px solid oklch(0.65 0.2 200 / 0.6)",
                        borderRadius: "0.75rem"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col h-full gap-4 pt-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-11 h-11 rounded-lg flex items-center justify-center shrink-0",
                        style: {
                          background: "oklch(0.65 0.2 200 / 0.12)",
                          border: "1px solid oklch(0.65 0.2 200 / 0.35)"
                        },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Microscope, { className: "w-5 h-5 text-primary" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg text-card-foreground leading-snug line-clamp-2", children: item.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1", children: item.summary }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
                      item.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-xs px-2 py-0.5 font-mono neon-border-cyan bg-transparent text-primary",
                          children: tag
                        },
                        tag
                      )),
                      item.tags.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          variant: "outline",
                          className: "text-xs px-2 py-0.5 text-muted-foreground",
                          children: [
                            "+",
                            item.tags.length - 3
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border/20", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.date })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-primary/70 font-mono", children: "Tap to flip →" })
                    ] })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "absolute inset-0 rounded-xl overflow-hidden",
                style: {
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  background: "linear-gradient(135deg, oklch(0.18 0.06 270 / 0.95), oklch(0.14 0.05 280 / 0.98))",
                  border: "1.5px solid oklch(0.65 0.25 320 / 0.5)",
                  boxShadow: "inset 0 0 40px oklch(0.65 0.25 320 / 0.08), 0 0 30px oklch(0.65 0.25 320 / 0.2)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-1 w-full",
                      style: {
                        background: "linear-gradient(90deg, oklch(0.65 0.25 320), oklch(0.65 0.2 200))"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex flex-col h-full gap-4 pt-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                          style: {
                            background: "oklch(0.65 0.25 320 / 0.15)",
                            border: "1px solid oklch(0.65 0.25 320 / 0.4)"
                          },
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-4.5 h-4.5 text-accent" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-base text-card-foreground leading-snug line-clamp-2", children: item.title })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed flex-1 overflow-y-auto", children: item.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: item.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "text-xs px-2 py-0.5 font-mono neon-border-fuchsia bg-transparent text-accent",
                        children: tag
                      },
                      tag
                    )) }),
                    item.pdfUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "pt-1",
                        onClick: (e) => e.stopPropagation(),
                        onKeyDown: (e) => e.stopPropagation(),
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PdfButtons,
                          {
                            pdfUrl: item.pdfUrl,
                            ocidPrefix: `research.pdf.${index + 1}`
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-accent/20", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-accent/70" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.date })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          "data-ocid": `research.view_details.${index + 1}`,
                          onClick: (e) => {
                            e.stopPropagation();
                            toggle();
                          },
                          className: "h-7 text-xs gap-1 border-accent/50 text-accent hover:bg-accent/10 hover:border-accent",
                          children: [
                            "Flip back",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
                          ]
                        }
                      )
                    ] })
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
const SKELETON_KEYS = ["sk-a", "sk-b", "sk-c", "sk-d", "sk-e", "sk-f"];
function ResearchCardSkeleton({ index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.07 },
      className: "rounded-xl glass-card overflow-hidden p-6 flex flex-col gap-4",
      style: { minHeight: "340px" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-11 h-11 rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-14 rounded-full" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-1 border-t border-border/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" })
        ] })
      ]
    }
  );
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.5, ease: "easeOut" },
      "data-ocid": "research.empty_state",
      className: "col-span-full flex flex-col items-center justify-center gap-6 py-24 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-24 h-24 rounded-full flex items-center justify-center floating",
            style: {
              background: "oklch(0.65 0.2 200 / 0.08)",
              border: "2px solid oklch(0.65 0.2 200 / 0.3)",
              boxShadow: "0 0 40px oklch(0.65 0.2 200 / 0.15)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-10 h-10 text-primary pulse-glow" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl font-bold text-foreground", children: "No Research Works Yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm text-sm leading-relaxed", children: "Research publications and works will appear here once added by the administrator." })
        ] })
      ]
    }
  );
}
function ResearchPage() {
  const { data: researches = [], isLoading, isError } = useResearches();
  useActor(createActor);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-12 md:py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
        className: "text-center mb-14",
        "data-ocid": "research.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5, delay: 0.1 },
              className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-semibold tracking-widest uppercase mb-5",
              style: {
                background: "oklch(0.65 0.2 200 / 0.1)",
                border: "1px solid oklch(0.65 0.2 200 / 0.4)",
                color: "oklch(0.65 0.2 200)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Microscope, { className: "w-3.5 h-3.5" }),
                "Research Works"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h1,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.2 },
              className: "font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    background: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  },
                  children: "Research Works"
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.3 },
              className: "text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed",
              children: "Exploring the frontiers of pharmacology — hover or tap a card to reveal the full research details."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scaleX: 0 },
              animate: { scaleX: 1 },
              transition: { duration: 0.7, delay: 0.45 },
              className: "mx-auto mt-6 h-px w-32",
              style: { background: "var(--gradient-primary)" }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8",
        "data-ocid": "research.list",
        children: [
          isLoading && SKELETON_KEYS.map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ResearchCardSkeleton, { index: i }, key)),
          isError && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              "data-ocid": "research.error_state",
              className: "col-span-full flex flex-col items-center gap-4 py-20 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-16 h-16 rounded-full flex items-center justify-center",
                    style: {
                      background: "oklch(0.58 0.21 22 / 0.12)",
                      border: "1px solid oklch(0.58 0.21 22 / 0.4)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "w-7 h-7 text-destructive" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive font-display font-semibold text-lg", children: "Failed to load research" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Please refresh the page to try again." })
              ]
            }
          ),
          !isLoading && !isError && researches.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}),
          !isLoading && !isError && researches.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ResearchFlipCard,
            {
              item,
              index
            },
            String(item.id)
          ))
        ]
      }
    ),
    !isLoading && !isError && researches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.6, duration: 0.4 },
        className: "text-center mt-14",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "inline-block px-5 py-2 rounded-full text-xs font-mono text-muted-foreground",
            style: {
              background: "oklch(0.22 0.05 270 / 0.5)",
              border: "1px solid oklch(var(--border) / 0.3)"
            },
            children: [
              researches.length,
              " research",
              " ",
              researches.length === 1 ? "work" : "works",
              " published"
            ]
          }
        )
      }
    )
  ] }) });
}
export {
  ResearchPage as default
};
