import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Calendar,
  Download,
  Eye,
  Search,
  Tag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { createActor } from "../backend";
import { Layout } from "../components/Layout";
import { formatTimestamp } from "../lib/api";
import type { Article } from "../types";

// ─── Hooks ─────────────────────────────────────────────────────────────────

function useArticles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getArticles();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── PDF Buttons ────────────────────────────────────────────────────────────

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
        className="inline-flex items-center gap-1 h-7 px-2 text-xs rounded-md border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-colors"
        data-ocid={`${ocidPrefix}.view_pdf`}
      >
        <Eye className="w-3 h-3" />
        View PDF
      </a>
      <a
        href={pdfUrl}
        download
        className="inline-flex items-center gap-1 h-7 px-2 text-xs rounded-md border border-accent/40 text-accent hover:bg-accent/10 hover:border-accent transition-colors"
        data-ocid={`${ocidPrefix}.download_pdf`}
      >
        <Download className="w-3 h-3" />
        Download
      </a>
    </div>
  );
}

// ─── Skeleton card ──────────────────────────────────────────────────────────

function ArticleSkeleton() {
  return (
    <div className="glass-card rounded-xl p-5 space-y-4">
      <Skeleton className="h-5 w-3/4 bg-muted/60 rounded" />
      <Skeleton className="h-3 w-full bg-muted/40 rounded" />
      <Skeleton className="h-3 w-5/6 bg-muted/40 rounded" />
      <Skeleton className="h-3 w-4/6 bg-muted/40 rounded" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-5 w-16 bg-muted/40 rounded-full" />
        <Skeleton className="h-5 w-16 bg-muted/40 rounded-full" />
      </div>
      <div className="flex justify-between pt-1">
        <Skeleton className="h-4 w-24 bg-muted/40 rounded" />
        <Skeleton className="h-4 w-20 bg-muted/40 rounded" />
      </div>
    </div>
  );
}

// ─── Article card ───────────────────────────────────────────────────────────

interface ArticleCardProps {
  article: Article;
  index: number;
}

function ArticleCard({ article, index }: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, scale: 1.015 }}
      className="group glass-card rounded-xl p-5 flex flex-col gap-3 cursor-default border border-border/20 transition-smooth hover:neon-border-cyan hover:glow-cyan"
      data-ocid={`articles.item.${index + 1}`}
    >
      {article.category && (
        <Badge className="self-start text-xs font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20 transition-colors">
          {article.category}
        </Badge>
      )}
      <h3 className="font-display text-lg font-semibold text-card-foreground leading-snug group-hover:text-primary transition-colors duration-200 line-clamp-2">
        {article.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1">
        {article.excerpt || article.content.slice(0, 180)}
      </p>
      {article.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {article.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs font-mono bg-accent/10 text-accent border border-accent/20 rounded-full px-2 py-0.5"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
          {article.tags.length > 4 && (
            <span className="text-xs text-muted-foreground self-center">
              +{article.tags.length - 4} more
            </span>
          )}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/20">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span>{article.date || formatTimestamp(article.createdAt)}</span>
        </div>
        {article.pdfUrl ? (
          <PdfButtons
            pdfUrl={article.pdfUrl}
            ocidPrefix={`articles.pdf.${index + 1}`}
          />
        ) : (
          <div className="flex items-center gap-1 text-xs text-primary/70 font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Article</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────

function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="col-span-full flex flex-col items-center justify-center py-24 gap-4"
      data-ocid="articles.empty_state"
    >
      <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center neon-border-cyan">
        <Search className="w-7 h-7 text-primary" />
      </div>
      <h3 className="font-display text-xl font-semibold text-foreground/80">
        No articles found
      </h3>
      <p className="text-muted-foreground text-sm text-center max-w-xs">
        {query
          ? `No articles match "${query}". Try a different search or clear filters.`
          : "No articles are available yet. Check back soon."}
      </p>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { data: articles = [], isLoading } = useArticles();

  const categories = useMemo(() => {
    const cats = articles.map((a) => a.category).filter(Boolean);
    return Array.from(new Set(cats)).sort();
  }, [articles]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return articles.filter((a) => {
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      const matchesCategory = !activeCategory || a.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, activeCategory]);

  const clearFilters = () => {
    setSearchQuery("");
    setActiveCategory(null);
  };
  const hasActiveFilter = !!searchQuery || !!activeCategory;

  return (
    <Layout>
      <section
        className="min-h-screen bg-background pt-24 pb-20"
        data-ocid="articles.page"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-sm font-mono text-primary uppercase tracking-[0.2em] mb-3"
            >
              Knowledge &amp; Insights
            </motion.p>
            <h1 className="font-display text-5xl sm:text-6xl font-bold tracking-tight">
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                Articles
              </span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto mt-4 h-0.5 w-24 rounded-full"
              style={{ background: "var(--gradient-primary)" }}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4 text-muted-foreground max-w-xl mx-auto"
            >
              Pharmacology insights, research commentary, and academic
              perspectives by Dr.&nbsp;Ashwin Singh Chouhan.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative max-w-2xl mx-auto mb-6"
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search by title, content or tag…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 bg-card/60 backdrop-blur-sm border-border/40 focus:border-primary/70 focus:ring-1 focus:ring-primary/40 font-body placeholder:text-muted-foreground/60 rounded-xl text-sm transition-smooth"
              data-ocid="articles.search_input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>

          {categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-wrap justify-center gap-2 mb-10"
              data-ocid="articles.filter.tab"
            >
              <button
                onClick={() => setActiveCategory(null)}
                type="button"
                className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide border transition-smooth ${!activeCategory ? "bg-primary/20 text-primary border-primary/60 glow-cyan" : "bg-card/40 text-muted-foreground border-border/30 hover:border-primary/40 hover:text-primary/80"}`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setActiveCategory(cat === activeCategory ? null : cat)
                  }
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wide border transition-smooth ${activeCategory === cat ? "bg-primary/20 text-primary border-primary/60 glow-cyan" : "bg-card/40 text-muted-foreground border-border/30 hover:border-primary/40 hover:text-primary/80"}`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}

          <AnimatePresence>
            {hasActiveFilter && !isLoading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between mb-6 px-1"
              >
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">
                    {filtered.length}
                  </span>{" "}
                  result{filtered.length !== 1 ? "s" : ""} found
                  {searchQuery && (
                    <>
                      {" "}
                      for <span className="text-primary">"{searchQuery}"</span>
                    </>
                  )}
                  {activeCategory && (
                    <>
                      {" "}
                      in <span className="text-accent">{activeCategory}</span>
                    </>
                  )}
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  <X className="w-3 h-3" /> Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              ["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((key, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <ArticleSkeleton />
                </motion.div>
              ))
            ) : filtered.length === 0 ? (
              <EmptyState query={searchQuery} />
            ) : (
              filtered.map((article, i) => (
                <ArticleCard
                  key={String(article.id)}
                  article={article}
                  index={i}
                />
              ))
            )}
          </div>

          {!isLoading && filtered.length > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs text-muted-foreground mt-12 font-mono"
            >
              Showing {filtered.length} of {articles.length} articles
            </motion.p>
          )}
        </div>
      </section>
    </Layout>
  );
}
