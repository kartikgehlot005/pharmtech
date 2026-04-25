import { r as reactExports, j as jsxRuntimeExports } from "./index-BfL2YKX-.js";
import { L as Layout } from "./Layout-BJ9Xxx6n.js";
import { a as Badge, B as BookOpen } from "./badge-Dx8jHwIf.js";
import { c as createLucideIcon, r as resolveElements, m as motion } from "./proxy-C2WaRF_8.js";
import { F as FlaskConical } from "./flask-conical-TD_GylO8.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
const Briefcase = createLucideIcon("briefcase", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
];
const GraduationCap = createLucideIcon("graduation-cap", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
const thresholds = {
  some: 0,
  all: 1
};
function inView(elementOrSelector, onStart, { root, margin: rootMargin, amount = "some" } = {}) {
  const elements = resolveElements(elementOrSelector);
  const activeIntersections = /* @__PURE__ */ new WeakMap();
  const onIntersectionChange = (entries) => {
    entries.forEach((entry) => {
      const onEnd = activeIntersections.get(entry.target);
      if (entry.isIntersecting === Boolean(onEnd))
        return;
      if (entry.isIntersecting) {
        const newOnEnd = onStart(entry.target, entry);
        if (typeof newOnEnd === "function") {
          activeIntersections.set(entry.target, newOnEnd);
        } else {
          observer.unobserve(entry.target);
        }
      } else if (typeof onEnd === "function") {
        onEnd(entry);
        activeIntersections.delete(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(onIntersectionChange, {
    root,
    rootMargin,
    threshold: typeof amount === "number" ? amount : thresholds[amount]
  });
  elements.forEach((element) => observer.observe(element));
  return () => observer.disconnect();
}
function useInView(ref, { root, margin, amount, once = false, initial = false } = {}) {
  const [isInView, setInView] = reactExports.useState(initial);
  reactExports.useEffect(() => {
    if (!ref.current || once && isInView)
      return;
    const onEnter = () => {
      setInView(true);
      return once ? void 0 : () => setInView(false);
    };
    const options = {
      root: root && root.current || void 0,
      margin,
      amount
    };
    return inView(ref.current, onEnter, options);
  }, [root, ref, margin, once, amount]);
  return isInView;
}
const stats = [
  {
    icon: BookOpen,
    value: "75+",
    label: "Research Articles",
    color: "cyan"
  },
  {
    icon: FlaskConical,
    value: "Expert",
    label: "Chromatographic Techniques",
    color: "fuchsia"
  },
  {
    icon: Award,
    value: "2021",
    label: "Best Research Paper Award",
    color: "cyan"
  }
];
const expertiseTags = [
  "Neuropharmacology",
  "Phytochemistry",
  "Ethnopharmacology",
  "HPLC",
  "TLC",
  "CNS Pharmacology",
  "Behavioral Models"
];
const timelineEntries = [
  {
    year: "2014",
    icon: GraduationCap,
    title: "B.Pharm",
    description: "Completed Bachelor of Pharmacy, laying the foundation for pharmaceutical sciences.",
    side: "left",
    color: "cyan"
  },
  {
    year: "2017",
    icon: GraduationCap,
    title: "M.Pharm (Pharmacology)",
    description: "Completed Master of Pharmacy with specialisation in Pharmacology, deepening expertise in drug mechanisms and therapeutic applications.",
    side: "right",
    color: "fuchsia"
  },
  {
    year: "2020–Present",
    icon: Briefcase,
    title: "Assistant Professor (Pharmacy)",
    description: "Currently serving at Department of Pharmacy, Jai Narain Vyas University (JNVU), Jodhpur, Rajasthan, India — shaping future pharmacists and conducting cutting-edge research.",
    side: "left",
    color: "cyan"
  },
  {
    year: "2021",
    icon: Trophy,
    title: "Best Research Paper Award",
    description: "Recipient of the Best Research Paper Award at the ICTASEMP Conference, recognising outstanding contributions to pharmaceutical research.",
    side: "right",
    color: "fuchsia"
  },
  {
    year: "2022–2026",
    icon: Star,
    title: "Ph.D. (Pharmacology)",
    description: "Pursuing Doctorate in Pharmacology from B. N. University, Udaipur, with focused research on neuropharmacology and bio-guided fractionation of medicinal plants.",
    side: "left",
    color: "cyan"
  }
];
function StatCard({
  icon: Icon,
  value,
  label,
  color,
  index
}) {
  const isCyan = color === "cyan";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 40 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6, delay: index * 0.15 },
      whileHover: { scale: 1.04, y: -4 },
      className: `glass-card rounded-2xl p-6 flex flex-col items-center gap-3 text-center transition-smooth cursor-default ${isCyan ? "neon-border-cyan" : "neon-border-fuchsia"}`,
      "data-ocid": `about.stat_card.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-14 h-14 rounded-full flex items-center justify-center ${isCyan ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 28 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `text-3xl font-display font-bold ${isCyan ? "text-primary" : "text-accent"}`,
            children: value
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-snug", children: label })
      ]
    }
  );
}
function TimelineDot({ color }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { scale: 0 },
      whileInView: { scale: 1 },
      viewport: { once: true },
      transition: { type: "spring", stiffness: 400, damping: 20 },
      className: `w-5 h-5 rounded-full border-2 pulse-glow ${color === "cyan" ? "bg-primary border-primary glow-cyan" : "bg-accent border-accent glow-fuchsia"}`
    }
  ) });
}
function TimelineCard({
  entry,
  index
}) {
  const ref = reactExports.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = entry.side === "left";
  const isCyan = entry.color === "cyan";
  const Icon = entry.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: "relative grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] items-center gap-0 md:gap-0 mb-12",
      "data-ocid": `about.timeline_item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `${isLeft ? "md:flex md:justify-end md:pr-8" : "hidden md:block"}`,
            children: isLeft && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: -60 },
                animate: isInView ? { opacity: 1, x: 0 } : {},
                transition: { duration: 0.7, delay: 0.1 },
                className: `glass-card rounded-2xl p-5 max-w-xs w-full ${isCyan ? "neon-border-cyan" : "neon-border-fuchsia"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineCardContent, { entry, isCyan, Icon })
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:flex justify-center items-center relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineDot, { color: entry.color }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `${!isLeft ? "md:flex md:justify-start md:pl-8" : "hidden md:block"}`,
            children: !isLeft && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: 60 },
                animate: isInView ? { opacity: 1, x: 0 } : {},
                transition: { duration: 0.7, delay: 0.1 },
                className: `glass-card rounded-2xl p-5 max-w-xs w-full ${isCyan ? "neon-border-cyan" : "neon-border-fuchsia"}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineCardContent, { entry, isCyan, Icon })
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            animate: isInView ? { opacity: 1, y: 0 } : {},
            transition: { duration: 0.6 },
            className: `md:hidden glass-card rounded-2xl p-5 ${isCyan ? "neon-border-cyan" : "neon-border-fuchsia"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `w-3 h-3 rounded-full pulse-glow ${isCyan ? "bg-primary glow-cyan" : "bg-accent glow-fuchsia"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineCardContent, { entry, isCyan, Icon })
            ] })
          }
        )
      ]
    }
  );
}
function TimelineCardContent({
  entry,
  isCyan,
  Icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isCyan ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `text-xs font-mono font-bold px-2 py-0.5 rounded-md ${isCyan ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"}`,
          children: entry.year
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-display font-semibold text-foreground leading-tight", children: entry.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body leading-relaxed", children: entry.description })
  ] });
}
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative min-h-screen overflow-hidden",
      "data-ocid": "about.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": true, className: "pointer-events-none fixed inset-0 z-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-20 left-10 w-80 h-80 rounded-full bg-primary/10 blur-[100px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-40 right-10 w-96 h-96 rounded-full bg-accent/10 blur-[120px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[150px]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -30 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.8 },
              className: "text-center mb-16",
              "data-ocid": "about.heading",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.span,
                  {
                    initial: { opacity: 0, scale: 0.8 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { duration: 0.5, delay: 0.2 },
                    className: "inline-block text-xs font-mono font-bold uppercase tracking-[0.3em] text-primary mb-4 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10",
                    children: "Principal Investigator"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight", children: [
                  "About",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent", children: "Dr. Ashwin Singh Chouhan" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scaleX: 0 },
                    animate: { scaleX: 1 },
                    transition: { duration: 0.8, delay: 0.4 },
                    className: "mx-auto mt-4 h-0.5 w-32 bg-gradient-to-r from-primary to-accent rounded-full"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -40 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.8, delay: 0.2 },
                "data-ocid": "about.bio_section",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-display font-bold text-foreground mb-4", children: [
                    "Pharmacologist &",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Researcher" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-body leading-relaxed text-base mb-6", children: [
                    "Dr. Ashwin Singh Chouhan is an accomplished academician and researcher in the field of pharmaceutical sciences, currently serving as an",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-semibold", children: "Assistant Professor in the Department of Pharmacy" }),
                    " ",
                    "at Jai Narain Vyas University (JNVU), Jodhpur, Rajasthan, India. He completed his",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "Ph.D. in Pharmacology" }),
                    " ",
                    "from B. N. University, Udaipur, with a strong research focus on",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-semibold", children: "neuropharmacology" }),
                    " ",
                    "and bio-guided fractionation of medicinal plants."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "about.expertise_section", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold uppercase tracking-widest text-primary mb-3", children: "Areas of Expertise" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: expertiseTags.map((tag, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { opacity: 0, scale: 0.8 },
                        animate: { opacity: 1, scale: 1 },
                        transition: { duration: 0.4, delay: 0.3 + i * 0.06 },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Badge,
                          {
                            variant: "outline",
                            className: "border-primary/50 text-primary bg-primary/10 font-body text-xs hover:bg-primary/20 transition-smooth cursor-default",
                            "data-ocid": `about.expertise_tag.${i + 1}`,
                            children: tag
                          }
                        )
                      },
                      tag
                    )) })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, x: 40 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.8, delay: 0.3 },
                className: "flex justify-center",
                "data-ocid": "about.portrait_section",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl scale-110 pulse-glow" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-64 h-64 sm:w-72 sm:h-72 rounded-full neon-border-cyan overflow-hidden glass-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/10 to-accent/10", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 40, className: "text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-bold text-foreground text-center px-4", children: "Dr. Ashwin Singh Chouhan" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body text-center px-4", children: "Asst. Professor · JNVU Jodhpur" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 -right-3 w-4 h-4 rounded-full bg-primary glow-cyan floating" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute -bottom-3 -left-3 w-3 h-3 rounded-full bg-accent glow-fuchsia floating",
                      style: { animationDelay: "1s" }
                    }
                  )
                ] })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              transition: { duration: 0.5 },
              className: "mb-20",
              "data-ocid": "about.stats_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-center text-2xl font-display font-bold text-foreground mb-8", children: [
                  "Key",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent", children: "Highlights" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-6", children: stats.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatCard,
                  {
                    ...stat,
                    index: i,
                    color: stat.color
                  },
                  stat.label
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "about.timeline_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.6 },
                className: "text-center mb-12",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-3xl sm:text-4xl font-display font-bold text-foreground", children: [
                    "Academic",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent", children: "Journey" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-body mt-3 text-sm", children: "A timeline of academic milestones and professional achievements" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      initial: { scaleX: 0 },
                      whileInView: { scaleX: 1 },
                      viewport: { once: true },
                      transition: { duration: 0.8, delay: 0.3 },
                      className: "mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-primary to-accent rounded-full"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "aria-hidden": true,
                  className: "hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 via-accent/60 to-primary/20"
                }
              ),
              timelineEntries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineCard, { entry, index: i }, entry.year))
            ] })
          ] })
        ] })
      ]
    }
  ) });
}
export {
  About as default
};
