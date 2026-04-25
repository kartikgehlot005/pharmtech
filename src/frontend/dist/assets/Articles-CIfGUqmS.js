import { r as reactExports, j as jsxRuntimeExports, a as useActor, b as useQuery, c as createActor } from "./index-BfL2YKX-.js";
import { a as Badge, B as BookOpen } from "./badge-Dx8jHwIf.js";
import { c as createLucideIcon, m as motion, I as Input, X } from "./proxy-C2WaRF_8.js";
import { S as Skeleton } from "./skeleton-BYpl6qp9.js";
import { L as Layout, E as Eye } from "./Layout-BJ9Xxx6n.js";
import { f as formatTimestamp } from "./api-TKou_e4I.js";
import { A as AnimatePresence } from "./index-ESarLDpb.js";
import { C as Calendar, D as Download } from "./download-BXg937-B.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
function useArticles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getArticles();
    },
    enabled: !!actor && !isFetching
  });
}
function PdfButtons({ pdfUrl, ocidPrefix }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "a",
      {
        href: pdfUrl,
        target: "_blank",
        rel: "noopener noreferrer",
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
function ArticleSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-xl p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-3/4 bg-muted/60 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-full bg-muted/40 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-5/6 bg-muted/40 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-4/6 bg-muted/40 rounded" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 bg-muted/40 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 bg-muted/40 rounded-full" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24 bg-muted/40 rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20 bg-muted/40 rounded" })
    ] })
  ] });
}
function ArticleCard({ article, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 32 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1]
      },
      whileHover: { y: -6, scale: 1.015 },
      className: "group glass-card rounded-xl p-5 flex flex-col gap-3 cursor-default border border-border/20 transition-smooth hover:neon-border-cyan hover:glow-cyan",
      "data-ocid": `articles.item.${index + 1}`,
      children: [
        article.category && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "self-start text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors", children: article.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold text-card-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2", children: article.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1", children: article.excerpt || article.content.slice(0, 180) }),
        article.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
          article.tags.slice(0, 4).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 text-xs font-mono bg-accent/10 text-accent border border-accent/20 rounded-full px-2 py-0.5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-2.5 h-2.5" }),
                tag
              ]
            },
            tag
          )),
          article.tags.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground self-center", children: [
            "+",
            article.tags.length - 4,
            " more"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: article.date || formatTimestamp(article.createdAt) })
          ] }),
          article.pdfUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            PdfButtons,
            {
              pdfUrl: article.pdfUrl,
              ocidPrefix: `articles.pdf.${index + 1}`
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-primary/70 font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Article" })
          ] })
        ] })
      ]
    }
  );
}
function EmptyState({ query }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4 },
      className: "col-span-full flex flex-col items-center justify-center py-24 gap-4",
      "data-ocid": "articles.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full glass-card flex items-center justify-center neon-border-cyan", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-7 h-7 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-xl font-semibold text-foreground/80", children: "No articles found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center max-w-xs", children: query ? `No articles match "${query}". Try a different search or clear filters.` : "No articles are available yet. Check back soon." })
      ]
    }
  );
}
function ArticlesPage() {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState(null);
  const { data: articles = [], isLoading } = useArticles();
  const categories = reactExports.useMemo(() => {
    const cats = articles.map((a) => a.category).filter(Boolean);
    return Array.from(new Set(cats)).sort();
  }, [articles]);
  const filtered = reactExports.useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return articles.filter((a) => {
      const matchesSearch = !q || a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = !activeCategory || a.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, activeCategory]);
  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory(null);
  };
  const hasActiveFilter = !!searchQuery || !!activeCategory;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "min-h-screen bg-background pt-24 pb-20",
      "data-ocid": "articles.page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -24 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            className: "text-center mb-12",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.15, duration: 0.5 },
                  className: "text-sm font-mono text-primary uppercase tracking-[0.2em] mb-3",
                  children: "Knowledge & Insights"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl sm:text-6xl font-bold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-transparent bg-clip-text",
                  style: { backgroundImage: "var(--gradient-primary)" },
                  children: "Articles"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { scaleX: 0 },
                  animate: { scaleX: 1 },
                  transition: {
                    delay: 0.3,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1]
                  },
                  className: "mx-auto mt-4 h-0.5 w-24 rounded-full",
                  style: { background: "var(--gradient-primary)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.4, duration: 0.5 },
                  className: "mt-4 text-muted-foreground max-w-xl mx-auto",
                  children: "Pharmacology insights, research commentary, and academic perspectives by Dr. Ashwin Singh Chouhan."
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.2, duration: 0.5 },
            className: "relative max-w-2xl mx-auto mb-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  type: "text",
                  placeholder: "Search by title, content or tag…",
                  value: searchQuery,
                  onChange: (e) => setSearchQuery(e.target.value),
                  className: "pl-10 pr-10 h-12 bg-card/60 backdrop-blur-sm border-border/40 focus:border-primary/70 focus:ring-1 focus:ring-primary/40 font-body placeholder:text-muted-foreground/60 rounded-xl text-sm transition-smooth",
                  "data-ocid": "articles.search_input"
                }
              ),
              searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSearchQuery(""),
                  className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Clear search",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ]
          }
        ),
        categories.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.3, duration: 0.4 },
            className: "flex flex-wrap justify-center gap-2 mb-10",
            "data-ocid": "articles.filter.tab",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => setActiveCategory(null),
                  type: "button",
                  className: `px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide border transition-smooth ${!activeCategory ? "bg-primary/20 text-primary border-primary/60 glow-cyan" : "bg-card/40 text-muted-foreground border-border/30 hover:border-primary/40 hover:text-primary/80"}`,
                  children: "All"
                }
              ),
              categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setActiveCategory(cat === activeCategory ? null : cat),
                  className: `px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide border transition-smooth ${activeCategory === cat ? "bg-primary/20 text-primary border-primary/60 glow-cyan" : "bg-card/40 text-muted-foreground border-border/30 hover:border-primary/40 hover:text-primary/80"}`,
                  children: cat
                },
                cat
              ))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hasActiveFilter && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "flex items-center justify-between mb-6 px-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: filtered.length }),
                " ",
                "result",
                filtered.length !== 1 ? "s" : "",
                " found",
                searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  " ",
                  "for ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary", children: [
                    '"',
                    searchQuery,
                    '"'
                  ] })
                ] }),
                activeCategory && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  " ",
                  "in ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: activeCategory })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: clearFilters,
                  className: "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
                    " Clear filters"
                  ]
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: isLoading ? ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: i * 0.06 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArticleSkeleton, {})
          },
          key
        )) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { query: searchQuery }) : filtered.map((article, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArticleCard,
          {
            article,
            index: i
          },
          String(article.id)
        )) }),
        !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.p,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.5 },
            className: "text-center text-xs text-muted-foreground mt-12 font-mono",
            children: [
              "Showing ",
              filtered.length,
              " of ",
              articles.length,
              " articles"
            ]
          }
        )
      ] })
    }
  ) });
}
export {
  ArticlesPage as default
};
