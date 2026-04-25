import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import type { LucideProps } from "lucide-react";
import {
  Award,
  BookOpen,
  Briefcase,
  FlaskConical,
  GraduationCap,
  Star,
  Trophy,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

// ── Stat cards data ─────────────────────────────────────────────────────────
const stats: Array<{
  icon: React.FC<LucideProps>;
  value: string;
  label: string;
  color: "cyan" | "fuchsia";
}> = [
  {
    icon: BookOpen,
    value: "75+",
    label: "Research Articles",
    color: "cyan",
  },
  {
    icon: FlaskConical,
    value: "Expert",
    label: "Chromatographic Techniques",
    color: "fuchsia",
  },
  {
    icon: Award,
    value: "2021",
    label: "Best Research Paper Award",
    color: "cyan",
  },
];

// ── Expertise tags ─────────────────────────────────────────────────────────
const expertiseTags = [
  "Neuropharmacology",
  "Phytochemistry",
  "Ethnopharmacology",
  "HPLC",
  "TLC",
  "CNS Pharmacology",
  "Behavioral Models",
];

// ── Timeline entries ───────────────────────────────────────────────────────
const timelineEntries: Array<{
  year: string;
  icon: React.FC<LucideProps>;
  title: string;
  description: string;
  side: "left" | "right";
  color: "cyan" | "fuchsia";
}> = [
  {
    year: "2014",
    icon: GraduationCap,
    title: "B.Pharm",
    description:
      "Completed Bachelor of Pharmacy, laying the foundation for pharmaceutical sciences.",
    side: "left",
    color: "cyan",
  },
  {
    year: "2017",
    icon: GraduationCap,
    title: "M.Pharm (Pharmacology)",
    description:
      "Completed Master of Pharmacy with specialisation in Pharmacology, deepening expertise in drug mechanisms and therapeutic applications.",
    side: "right",
    color: "fuchsia",
  },
  {
    year: "2020–Present",
    icon: Briefcase,
    title: "Assistant Professor (Pharmacy)",
    description:
      "Currently serving at Department of Pharmacy, Jai Narain Vyas University (JNVU), Jodhpur, Rajasthan, India — shaping future pharmacists and conducting cutting-edge research.",
    side: "left",
    color: "cyan",
  },
  {
    year: "2021",
    icon: Trophy,
    title: "Best Research Paper Award",
    description:
      "Recipient of the Best Research Paper Award at the ICTASEMP Conference, recognising outstanding contributions to pharmaceutical research.",
    side: "right",
    color: "fuchsia",
  },
  {
    year: "2022–2026",
    icon: Star,
    title: "Ph.D. (Pharmacology)",
    description:
      "Pursuing Doctorate in Pharmacology from B. N. University, Udaipur, with focused research on neuropharmacology and bio-guided fractionation of medicinal plants.",
    side: "left",
    color: "cyan",
  },
];

// ── Reusable animated stat card ─────────────────────────────────────────────
function StatCard({
  icon: Icon,
  value,
  label,
  color,
  index,
}: {
  icon: React.FC<LucideProps>;
  value: string;
  label: string;
  color: "cyan" | "fuchsia";
  index: number;
}) {
  const isCyan = color === "cyan";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.04, y: -4 }}
      className={`glass-card rounded-2xl p-6 flex flex-col items-center gap-3 text-center transition-smooth cursor-default ${
        isCyan ? "neon-border-cyan" : "neon-border-fuchsia"
      }`}
      data-ocid={`about.stat_card.${index + 1}`}
    >
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center ${
          isCyan ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
        }`}
      >
        <Icon size={28} />
      </div>
      <p
        className={`text-3xl font-display font-bold ${
          isCyan ? "text-primary" : "text-accent"
        }`}
      >
        {value}
      </p>
      <p className="text-sm text-muted-foreground font-body leading-snug">
        {label}
      </p>
    </motion.div>
  );
}

// ── Timeline dot marker ──────────────────────────────────────────────────────
function TimelineDot({ color }: { color: "cyan" | "fuchsia" }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={`w-5 h-5 rounded-full border-2 pulse-glow ${
          color === "cyan"
            ? "bg-primary border-primary glow-cyan"
            : "bg-accent border-accent glow-fuchsia"
        }`}
      />
    </div>
  );
}

// ── Single timeline card ─────────────────────────────────────────────────────
function TimelineCard({
  entry,
  index,
}: {
  entry: (typeof timelineEntries)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = entry.side === "left";
  const isCyan = entry.color === "cyan";
  const Icon = entry.icon;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] items-center gap-0 md:gap-0 mb-12"
      data-ocid={`about.timeline_item.${index + 1}`}
    >
      {/* Left column */}
      <div
        className={`${isLeft ? "md:flex md:justify-end md:pr-8" : "hidden md:block"}`}
      >
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`glass-card rounded-2xl p-5 max-w-xs w-full ${
              isCyan ? "neon-border-cyan" : "neon-border-fuchsia"
            }`}
          >
            <TimelineCardContent entry={entry} isCyan={isCyan} Icon={Icon} />
          </motion.div>
        )}
      </div>

      {/* Centre dot */}
      <div className="hidden md:flex justify-center items-center relative">
        <TimelineDot color={entry.color} />
      </div>

      {/* Right column */}
      <div
        className={`${!isLeft ? "md:flex md:justify-start md:pl-8" : "hidden md:block"}`}
      >
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className={`glass-card rounded-2xl p-5 max-w-xs w-full ${
              isCyan ? "neon-border-cyan" : "neon-border-fuchsia"
            }`}
          >
            <TimelineCardContent entry={entry} isCyan={isCyan} Icon={Icon} />
          </motion.div>
        )}
      </div>

      {/* Mobile single-column card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={`md:hidden glass-card rounded-2xl p-5 ${
          isCyan ? "neon-border-cyan" : "neon-border-fuchsia"
        }`}
      >
        {/* Mobile dot */}
        <div className="flex items-center gap-3 mb-1">
          <div
            className={`w-3 h-3 rounded-full pulse-glow ${
              isCyan ? "bg-primary glow-cyan" : "bg-accent glow-fuchsia"
            }`}
          />
          <TimelineCardContent entry={entry} isCyan={isCyan} Icon={Icon} />
        </div>
      </motion.div>
    </div>
  );
}

function TimelineCardContent({
  entry,
  isCyan,
  Icon,
}: {
  entry: (typeof timelineEntries)[number];
  isCyan: boolean;
  Icon: React.FC<LucideProps>;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
            isCyan ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
          }`}
        >
          <Icon size={16} />
        </div>
        <span
          className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
            isCyan ? "bg-primary/20 text-primary" : "bg-accent/20 text-accent"
          }`}
        >
          {entry.year}
        </span>
      </div>
      <h4 className="text-base font-display font-semibold text-foreground leading-tight">
        {entry.title}
      </h4>
      <p className="text-xs text-muted-foreground font-body leading-relaxed">
        {entry.description}
      </p>
    </div>
  );
}

// ── Main About Page ───────────────────────────────────────────────────────────
export default function About() {
  return (
    <Layout>
      <div
        className="relative min-h-screen overflow-hidden"
        data-ocid="about.page"
      >
        {/* Background ambient glow blobs */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-accent/10 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[150px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* ── Page heading ── */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
            data-ocid="about.heading"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block text-xs font-mono font-bold uppercase tracking-[0.3em] text-primary mb-4 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10"
            >
              Principal Investigator
            </motion.span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
              About{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Dr. Ashwin Singh Chouhan
              </span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-4 h-0.5 w-32 bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </motion.div>

          {/* ── Two-column intro ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20 items-center">
            {/* Bio text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              data-ocid="about.bio_section"
            >
              <h2 className="text-2xl font-display font-bold text-foreground mb-4">
                Pharmacologist &amp;{" "}
                <span className="text-primary">Researcher</span>
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed text-base mb-6">
                Dr. Ashwin Singh Chouhan is an accomplished academician and
                researcher in the field of pharmaceutical sciences, currently
                serving as an{" "}
                <span className="text-foreground font-semibold">
                  Assistant Professor in the Department of Pharmacy
                </span>{" "}
                at Jai Narain Vyas University (JNVU), Jodhpur, Rajasthan, India.
                He completed his{" "}
                <span className="text-primary font-semibold">
                  Ph.D. in Pharmacology
                </span>{" "}
                from B. N. University, Udaipur, with a strong research focus on{" "}
                <span className="text-accent font-semibold">
                  neuropharmacology
                </span>{" "}
                and bio-guided fractionation of medicinal plants.
              </p>

              {/* Expertise chips */}
              <div data-ocid="about.expertise_section">
                <h3 className="text-sm font-display font-semibold uppercase tracking-widest text-primary mb-3">
                  Areas of Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {expertiseTags.map((tag, i) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                    >
                      <Badge
                        variant="outline"
                        className="border-primary/50 text-primary bg-primary/10 font-body text-xs hover:bg-primary/20 transition-smooth cursor-default"
                        data-ocid={`about.expertise_tag.${i + 1}`}
                      >
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Portrait placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
              data-ocid="about.portrait_section"
            >
              <div className="relative">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl scale-110 pulse-glow" />
                {/* Portrait frame */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full neon-border-cyan overflow-hidden glass-card">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/10 to-accent/10">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center">
                      <GraduationCap size={40} className="text-primary" />
                    </div>
                    <p className="text-sm font-display font-bold text-foreground text-center px-4">
                      Dr. Ashwin Singh Chouhan
                    </p>
                    <p className="text-xs text-muted-foreground font-body text-center px-4">
                      Asst. Professor · JNVU Jodhpur
                    </p>
                  </div>
                </div>
                {/* Floating decoration dots */}
                <div className="absolute -top-3 -right-3 w-4 h-4 rounded-full bg-primary glow-cyan floating" />
                <div
                  className="absolute -bottom-3 -left-3 w-3 h-3 rounded-full bg-accent glow-fuchsia floating"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </motion.div>
          </div>

          {/* ── Stat cards ── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-20"
            data-ocid="about.stats_section"
          >
            <h2 className="text-center text-2xl font-display font-bold text-foreground mb-8">
              Key{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Highlights
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <StatCard
                  key={stat.label}
                  {...stat}
                  index={i}
                  color={stat.color as "cyan" | "fuchsia"}
                />
              ))}
            </div>
          </motion.div>

          {/* ── Academic Journey Timeline ── */}
          <div data-ocid="about.timeline_section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground">
                Academic{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Journey
                </span>
              </h2>
              <p className="text-muted-foreground font-body mt-3 text-sm">
                A timeline of academic milestones and professional achievements
              </p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mx-auto mt-4 h-0.5 w-24 bg-gradient-to-r from-primary to-accent rounded-full"
              />
            </motion.div>

            {/* Timeline container */}
            <div className="relative">
              {/* Vertical centre line — desktop only */}
              <div
                aria-hidden
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary/60 via-accent/60 to-primary/20"
              />

              {timelineEntries.map((entry, i) => (
                <TimelineCard key={entry.year} entry={entry} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
