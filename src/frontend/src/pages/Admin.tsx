import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText,
  FlaskConical,
  Loader2,
  LogOut,
  Mail,
  Pencil,
  Plus,
  Save,
  StickyNote,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { PdfLinkInput } from "../components/PdfLinkInput";
import { useAuth } from "../context/AuthContext";
import {
  buildArticleInput,
  buildNoteInput,
  buildPublicationInput,
  buildResearchInput,
  formatTimestamp,
  unwrapOk,
} from "../lib/api";
import type {
  Article,
  ArticleInput,
  ContactSubmission,
  Note,
  NoteInput,
  Publication,
  PublicationInput,
  Research,
  ResearchInput,
} from "../types";

// ─── Tab types ────────────────────────────────────────────────────────────────
type AdminTab = "research" | "articles" | "publications" | "notes" | "contacts";

const TABS: {
  id: AdminTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "research", label: "Research", icon: FlaskConical },
  { id: "articles", label: "Articles", icon: BookOpen },
  { id: "publications", label: "Publications", icon: FileText },
  { id: "notes", label: "Notes", icon: StickyNote },
  { id: "contacts", label: "Contact Submissions", icon: Mail },
];

// ─── Generic helpers ──────────────────────────────────────────────────────────
function tagsToString(tags: string[]): string {
  return tags.join(", ");
}
function stringToTags(s: string): string[] {
  return s
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ title, onAdd }: { title: string; onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-display font-bold text-foreground">
        {title}
      </h2>
      <Button
        onClick={onAdd}
        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80 transition-smooth neon-border-cyan"
        data-ocid={`admin.${title.toLowerCase()}.add_button`}
      >
        <Plus className="w-4 h-4" />
        Add New
      </Button>
    </div>
  );
}

// ─── Delete confirmation ──────────────────────────────────────────────────────
function DeleteConfirm({
  open,
  title,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        className="glass-card border border-border/40"
        data-ocid="admin.delete.dialog"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display text-foreground">
            Delete "{title}"?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            className="border-border/40"
            data-ocid="admin.delete.cancel_button"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
            data-ocid="admin.delete.confirm_button"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Skeleton rows ────────────────────────────────────────────────────────────
function SkeletonRows() {
  return (
    <div className="space-y-3" data-ocid="admin.list.loading_state">
      {[1, 2, 3].map((i) => (
        <Skeleton key={i} className="h-16 w-full rounded-lg bg-muted/30" />
      ))}
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({
  label,
  htmlFor,
  children,
}: { label: string; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="text-sm font-body font-medium text-muted-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "bg-muted/20 border-border/40 text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary/40";

// ─── PDF badge ────────────────────────────────────────────────────────────────
function PdfBadge({ fileName }: { fileName: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-mono text-primary/80 bg-primary/10 border border-primary/20 rounded px-1.5 py-0.5 truncate max-w-[160px]">
      <FileText className="w-3 h-3 shrink-0" />
      {fileName}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// RESEARCH TAB
// ═══════════════════════════════════════════════════════════════════════════════
function ResearchTab({ token }: { token: string }) {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const [modal, setModal] = useState<{ open: boolean; item?: Research }>({
    open: false,
  });
  const [deleteTarget, setDeleteTarget] = useState<Research | null>(null);
  const [form, setForm] = useState<
    Partial<ResearchInput & { tagsStr: string }>
  >({});
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const { data: items = [], isLoading } = useQuery<Research[]>({
    queryKey: ["research"],
    queryFn: async () => (actor ? actor.getResearches() : []),
    enabled: !!actor,
  });

  const openAdd = () => {
    setForm({
      title: "",
      summary: "",
      description: "",
      tagsStr: "",
      date: "",
      imageUrl: "",
    });
    setPdfUrl("");
    setModal({ open: true });
  };

  const openEdit = (item: Research) => {
    setForm({
      title: item.title,
      summary: item.summary,
      description: item.description,
      tagsStr: tagsToString(item.tags),
      date: item.date,
      imageUrl: item.imageUrl ?? "",
    });
    setPdfUrl(item.pdfUrl ?? "");
    setModal({ open: true, item });
  };

  const saveMut = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const input = buildResearchInput({
        ...form,
        tags: stringToTags(form.tagsStr ?? ""),
        pdfUrl: pdfUrl.trim() || undefined,
      });
      if (modal.item) {
        return unwrapOk(
          await actor.updateResearch(token, modal.item.id, input),
        );
      }
      return unwrapOk(await actor.createResearch(token, input));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["research"] });
      toast.success(modal.item ? "Research updated" : "Research created");
      setModal({ open: false });
    },
    onError: (e) => toast.error(String(e)),
  });

  const deleteMut = useMutation({
    mutationFn: async (item: Research) => {
      if (!actor) throw new Error("Not connected");
      return unwrapOk(await actor.deleteResearch(token, item.id));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["research"] });
      toast.success("Research deleted");
      setDeleteTarget(null);
    },
    onError: (e) => toast.error(String(e)),
  });

  return (
    <div>
      <SectionHeader title="Research" onAdd={openAdd} />
      {isLoading ? (
        <SkeletonRows />
      ) : items.length === 0 ? (
        <EmptyState label="research" onAdd={openAdd} />
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={String(item.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4 flex items-start justify-between gap-4 neon-border-cyan border border-border/20"
              data-ocid={`admin.research.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-foreground truncate">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                  {item.summary}
                </p>
                <div className="flex flex-wrap gap-1 mt-2 items-center">
                  {item.tags.slice(0, 3).map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="text-xs px-2 py-0 bg-primary/10 text-primary border-primary/30"
                    >
                      {t}
                    </Badge>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">
                    {item.date}
                  </span>
                  {(item.pdfUrl || item.pdfFileName) && (
                    <PdfBadge fileName={item.pdfFileName ?? "PDF Link"} />
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => openEdit(item)}
                  className="text-primary hover:bg-primary/10"
                  data-ocid={`admin.research.edit_button.${i + 1}`}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setDeleteTarget(item)}
                  className="text-destructive hover:bg-destructive/10"
                  data-ocid={`admin.research.delete_button.${i + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog
        open={modal.open}
        onOpenChange={(o) => !saveMut.isPending && setModal({ open: o })}
      >
        <DialogContent
          className="glass-card border border-border/40 max-w-2xl"
          data-ocid="admin.research.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              {modal.item ? "Edit Research" : "Add Research"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2 max-h-[70vh] overflow-y-auto pr-1">
            <Field label="Title *">
              <Input
                className={inputClass}
                value={form.title ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                data-ocid="admin.research.title.input"
              />
            </Field>
            <Field label="Summary *">
              <Input
                className={inputClass}
                value={form.summary ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, summary: e.target.value }))
                }
                data-ocid="admin.research.summary.input"
              />
            </Field>
            <Field label="Description *">
              <Textarea
                className={inputClass}
                rows={4}
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                data-ocid="admin.research.description.textarea"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Tags (comma-separated)">
                <Input
                  className={inputClass}
                  placeholder="e.g. pharmacology, drug"
                  value={form.tagsStr ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, tagsStr: e.target.value }))
                  }
                  data-ocid="admin.research.tags.input"
                />
              </Field>
              <Field label="Date">
                <Input
                  className={inputClass}
                  placeholder="e.g. 2024"
                  value={form.date ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  data-ocid="admin.research.date.input"
                />
              </Field>
            </div>
            <Field label="Image URL (optional)">
              <Input
                className={inputClass}
                placeholder="https://..."
                value={form.imageUrl ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                data-ocid="admin.research.imageurl.input"
              />
            </Field>
            <Field label="PDF Link (optional)">
              <PdfLinkInput
                value={pdfUrl}
                onChange={setPdfUrl}
                ocidPrefix="admin.research.pdf"
              />
            </Field>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setModal({ open: false })}
              disabled={saveMut.isPending}
              data-ocid="admin.research.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={() => saveMut.mutate()}
              disabled={saveMut.isPending || !form.title?.trim()}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80"
              data-ocid="admin.research.save_button"
            >
              {saveMut.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirm
        open={!!deleteTarget}
        title={deleteTarget?.title ?? ""}
        onConfirm={() => deleteTarget && deleteMut.mutate(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARTICLES TAB
// ═══════════════════════════════════════════════════════════════════════════════
function ArticlesTab({ token }: { token: string }) {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const [modal, setModal] = useState<{ open: boolean; item?: Article }>({
    open: false,
  });
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null);
  const [form, setForm] = useState<Partial<ArticleInput & { tagsStr: string }>>(
    {},
  );
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const { data: items = [], isLoading } = useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => (actor ? actor.getArticles() : []),
    enabled: !!actor,
  });

  const openAdd = () => {
    setForm({
      title: "",
      excerpt: "",
      content: "",
      category: "",
      tagsStr: "",
      date: "",
    });
    setPdfUrl("");
    setModal({ open: true });
  };

  const openEdit = (item: Article) => {
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      tagsStr: tagsToString(item.tags),
      date: item.date,
    });
    setPdfUrl(item.pdfUrl ?? "");
    setModal({ open: true, item });
  };

  const saveMut = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const input = buildArticleInput({
        ...form,
        tags: stringToTags(form.tagsStr ?? ""),
        pdfUrl: pdfUrl.trim() || undefined,
      });
      if (modal.item)
        return unwrapOk(await actor.updateArticle(token, modal.item.id, input));
      return unwrapOk(await actor.createArticle(token, input));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      toast.success(modal.item ? "Article updated" : "Article created");
      setModal({ open: false });
    },
    onError: (e) => toast.error(String(e)),
  });

  const deleteMut = useMutation({
    mutationFn: async (item: Article) => {
      if (!actor) throw new Error("Not connected");
      return unwrapOk(await actor.deleteArticle(token, item.id));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      toast.success("Article deleted");
      setDeleteTarget(null);
    },
    onError: (e) => toast.error(String(e)),
  });

  return (
    <div>
      <SectionHeader title="Articles" onAdd={openAdd} />
      {isLoading ? (
        <SkeletonRows />
      ) : items.length === 0 ? (
        <EmptyState label="articles" onAdd={openAdd} />
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={String(item.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4 flex items-start justify-between gap-4 border border-border/20"
              data-ocid={`admin.articles.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-foreground truncate">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                  {item.excerpt}
                </p>
                <div className="flex flex-wrap gap-1 mt-2 items-center">
                  <Badge
                    variant="outline"
                    className="text-xs border-accent/30 text-accent"
                  >
                    {item.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground ml-1">
                    {item.date}
                  </span>
                  {(item.pdfUrl || item.pdfFileName) && (
                    <PdfBadge fileName={item.pdfFileName ?? "PDF Link"} />
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => openEdit(item)}
                  className="text-primary hover:bg-primary/10"
                  data-ocid={`admin.articles.edit_button.${i + 1}`}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setDeleteTarget(item)}
                  className="text-destructive hover:bg-destructive/10"
                  data-ocid={`admin.articles.delete_button.${i + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog
        open={modal.open}
        onOpenChange={(o) => !saveMut.isPending && setModal({ open: o })}
      >
        <DialogContent
          className="glass-card border border-border/40 max-w-2xl"
          data-ocid="admin.articles.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              {modal.item ? "Edit Article" : "Add Article"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2 max-h-[70vh] overflow-y-auto pr-1">
            <Field label="Title *">
              <Input
                className={inputClass}
                value={form.title ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                data-ocid="admin.articles.title.input"
              />
            </Field>
            <Field label="Excerpt *">
              <Input
                className={inputClass}
                value={form.excerpt ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, excerpt: e.target.value }))
                }
                data-ocid="admin.articles.excerpt.input"
              />
            </Field>
            <Field label="Content *">
              <Textarea
                className={inputClass}
                rows={5}
                value={form.content ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                data-ocid="admin.articles.content.textarea"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <Input
                  className={inputClass}
                  placeholder="e.g. Pharmacology"
                  value={form.category ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  data-ocid="admin.articles.category.input"
                />
              </Field>
              <Field label="Date">
                <Input
                  className={inputClass}
                  placeholder="e.g. 2024-06-15"
                  value={form.date ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, date: e.target.value }))
                  }
                  data-ocid="admin.articles.date.input"
                />
              </Field>
            </div>
            <Field label="Tags (comma-separated)">
              <Input
                className={inputClass}
                placeholder="e.g. drug discovery"
                value={form.tagsStr ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, tagsStr: e.target.value }))
                }
                data-ocid="admin.articles.tags.input"
              />
            </Field>
            <Field label="PDF Link (optional)">
              <PdfLinkInput
                value={pdfUrl}
                onChange={setPdfUrl}
                ocidPrefix="admin.articles.pdf"
              />
            </Field>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setModal({ open: false })}
              disabled={saveMut.isPending}
              data-ocid="admin.articles.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={() => saveMut.mutate()}
              disabled={saveMut.isPending || !form.title?.trim()}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80"
              data-ocid="admin.articles.save_button"
            >
              {saveMut.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirm
        open={!!deleteTarget}
        title={deleteTarget?.title ?? ""}
        onConfirm={() => deleteTarget && deleteMut.mutate(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLICATIONS TAB
// ═══════════════════════════════════════════════════════════════════════════════
function PublicationsTab({ token }: { token: string }) {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const [modal, setModal] = useState<{ open: boolean; item?: Publication }>({
    open: false,
  });
  const [deleteTarget, setDeleteTarget] = useState<Publication | null>(null);
  const [form, setForm] = useState<
    Partial<PublicationInput & { authorsStr: string; yearStr: string }>
  >({});
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const { data: items = [], isLoading } = useQuery<Publication[]>({
    queryKey: ["publications"],
    queryFn: async () => (actor ? actor.getPublications() : []),
    enabled: !!actor,
  });

  const openAdd = () => {
    setForm({
      title: "",
      authorsStr: "",
      yearStr: String(new Date().getFullYear()),
      journal: "",
      doi: "",
      abstract: "",
    });
    setPdfUrl("");
    setModal({ open: true });
  };

  const openEdit = (item: Publication) => {
    setForm({
      title: item.title,
      authorsStr: tagsToString(item.authors),
      yearStr: String(item.year),
      journal: item.journal,
      doi: item.doi ?? "",
      abstract: item.abstract,
      imageUrl: item.imageUrl ?? "",
    });
    setPdfUrl(item.pdfUrl ?? "");
    setModal({ open: true, item });
  };

  const saveMut = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const input = buildPublicationInput({
        ...form,
        authors: stringToTags(form.authorsStr ?? ""),
        year: BigInt(
          Number.parseInt(form.yearStr ?? "2024", 10) ||
            new Date().getFullYear(),
        ),
        pdfUrl: pdfUrl.trim() || undefined,
      });
      if (modal.item)
        return unwrapOk(
          await actor.updatePublication(token, modal.item.id, input),
        );
      return unwrapOk(await actor.createPublication(token, input));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["publications"] });
      toast.success(modal.item ? "Publication updated" : "Publication created");
      setModal({ open: false });
    },
    onError: (e) => toast.error(String(e)),
  });

  const deleteMut = useMutation({
    mutationFn: async (item: Publication) => {
      if (!actor) throw new Error("Not connected");
      return unwrapOk(await actor.deletePublication(token, item.id));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["publications"] });
      toast.success("Publication deleted");
      setDeleteTarget(null);
    },
    onError: (e) => toast.error(String(e)),
  });

  return (
    <div>
      <SectionHeader title="Publications" onAdd={openAdd} />
      {isLoading ? (
        <SkeletonRows />
      ) : items.length === 0 ? (
        <EmptyState label="publications" onAdd={openAdd} />
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={String(item.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4 flex items-start justify-between gap-4 border border-border/20"
              data-ocid={`admin.publications.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-foreground truncate">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {item.authors.slice(0, 2).join(", ")} • {item.journal} •{" "}
                  {String(item.year)}
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5 items-center">
                  {item.doi && (
                    <p className="text-xs text-primary/70 truncate">
                      DOI: {item.doi}
                    </p>
                  )}
                  {(item.pdfUrl || item.pdfFileName) && (
                    <PdfBadge fileName={item.pdfFileName ?? "PDF Link"} />
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => openEdit(item)}
                  className="text-primary hover:bg-primary/10"
                  data-ocid={`admin.publications.edit_button.${i + 1}`}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setDeleteTarget(item)}
                  className="text-destructive hover:bg-destructive/10"
                  data-ocid={`admin.publications.delete_button.${i + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog
        open={modal.open}
        onOpenChange={(o) => !saveMut.isPending && setModal({ open: o })}
      >
        <DialogContent
          className="glass-card border border-border/40 max-w-2xl"
          data-ocid="admin.publications.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              {modal.item ? "Edit Publication" : "Add Publication"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2 max-h-[70vh] overflow-y-auto pr-1">
            <Field label="Title *">
              <Input
                className={inputClass}
                value={form.title ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                data-ocid="admin.publications.title.input"
              />
            </Field>
            <Field label="Authors (comma-separated) *">
              <Input
                className={inputClass}
                placeholder="e.g. Ashwin S. Chouhan, Co-Author"
                value={form.authorsStr ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, authorsStr: e.target.value }))
                }
                data-ocid="admin.publications.authors.input"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Year *">
                <Input
                  className={inputClass}
                  type="number"
                  placeholder="2024"
                  value={form.yearStr ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, yearStr: e.target.value }))
                  }
                  data-ocid="admin.publications.year.input"
                />
              </Field>
              <Field label="Journal *">
                <Input
                  className={inputClass}
                  placeholder="Journal name"
                  value={form.journal ?? ""}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, journal: e.target.value }))
                  }
                  data-ocid="admin.publications.journal.input"
                />
              </Field>
            </div>
            <Field label="DOI (optional)">
              <Input
                className={inputClass}
                placeholder="10.xxxx/xxxxx"
                value={form.doi ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, doi: e.target.value }))
                }
                data-ocid="admin.publications.doi.input"
              />
            </Field>
            <Field label="Abstract *">
              <Textarea
                className={inputClass}
                rows={4}
                value={form.abstract ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, abstract: e.target.value }))
                }
                data-ocid="admin.publications.abstract.textarea"
              />
            </Field>
            <Field label="PDF Link (optional)">
              <PdfLinkInput
                value={pdfUrl}
                onChange={setPdfUrl}
                ocidPrefix="admin.publications.pdf"
              />
            </Field>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setModal({ open: false })}
              disabled={saveMut.isPending}
              data-ocid="admin.publications.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={() => saveMut.mutate()}
              disabled={saveMut.isPending || !form.title?.trim()}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80"
              data-ocid="admin.publications.save_button"
            >
              {saveMut.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirm
        open={!!deleteTarget}
        title={deleteTarget?.title ?? ""}
        onConfirm={() => deleteTarget && deleteMut.mutate(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NOTES TAB
// ═══════════════════════════════════════════════════════════════════════════════
function NotesTab({ token }: { token: string }) {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const [modal, setModal] = useState<{ open: boolean; item?: Note }>({
    open: false,
  });
  const [deleteTarget, setDeleteTarget] = useState<Note | null>(null);
  const [form, setForm] = useState<Partial<NoteInput>>({});
  const [pdfUrl, setPdfUrl] = useState<string>("");

  const { data: items = [], isLoading } = useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => (actor ? actor.getNotes() : []),
    enabled: !!actor,
  });

  const openAdd = () => {
    setForm({ title: "", content: "" });
    setPdfUrl("");
    setModal({ open: true });
  };

  const openEdit = (item: Note) => {
    setForm({ title: item.title, content: item.content });
    setPdfUrl(item.pdfUrl ?? "");
    setModal({ open: true, item });
  };

  const saveMut = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const input = buildNoteInput({
        ...form,
        pdfUrl: pdfUrl.trim() || undefined,
      });
      if (modal.item)
        return unwrapOk(await actor.updateNote(token, modal.item.id, input));
      return unwrapOk(await actor.createNote(token, input));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      toast.success(modal.item ? "Note updated" : "Note created");
      setModal({ open: false });
    },
    onError: (e) => toast.error(String(e)),
  });

  const deleteMut = useMutation({
    mutationFn: async (item: Note) => {
      if (!actor) throw new Error("Not connected");
      return unwrapOk(await actor.deleteNote(token, item.id));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted");
      setDeleteTarget(null);
    },
    onError: (e) => toast.error(String(e)),
  });

  return (
    <div>
      <SectionHeader title="Notes" onAdd={openAdd} />
      {isLoading ? (
        <SkeletonRows />
      ) : items.length === 0 ? (
        <EmptyState label="notes" onAdd={openAdd} />
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={String(item.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-xl p-4 flex items-start justify-between gap-4 border border-border/20"
              data-ocid={`admin.notes.item.${i + 1}`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-foreground truncate">
                  {item.title}
                </p>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                  {item.content}
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5 items-center">
                  {(item.pdfUrl || item.pdfFileName || item.fileName) && (
                    <PdfBadge
                      fileName={item.pdfFileName ?? item.fileName ?? "PDF Link"}
                    />
                  )}
                  <span className="text-xs text-muted-foreground/50">
                    {formatTimestamp(item.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => openEdit(item)}
                  className="text-primary hover:bg-primary/10"
                  data-ocid={`admin.notes.edit_button.${i + 1}`}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setDeleteTarget(item)}
                  className="text-destructive hover:bg-destructive/10"
                  data-ocid={`admin.notes.delete_button.${i + 1}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Dialog
        open={modal.open}
        onOpenChange={(o) => !saveMut.isPending && setModal({ open: o })}
      >
        <DialogContent
          className="glass-card border border-border/40 max-w-2xl"
          data-ocid="admin.notes.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">
              {modal.item ? "Edit Note" : "Add Note"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-2 max-h-[70vh] overflow-y-auto pr-1">
            <Field label="Title *">
              <Input
                className={inputClass}
                value={form.title ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                data-ocid="admin.notes.title.input"
              />
            </Field>
            <Field label="Content *">
              <Textarea
                className={inputClass}
                rows={5}
                value={form.content ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                data-ocid="admin.notes.content.textarea"
              />
            </Field>
            <Field label="PDF Link (optional)">
              <PdfLinkInput
                value={pdfUrl}
                onChange={setPdfUrl}
                ocidPrefix="admin.notes.pdf"
              />
            </Field>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setModal({ open: false })}
              disabled={saveMut.isPending}
              data-ocid="admin.notes.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={() => saveMut.mutate()}
              disabled={saveMut.isPending || !form.title?.trim()}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/80"
              data-ocid="admin.notes.save_button"
            >
              {saveMut.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirm
        open={!!deleteTarget}
        title={deleteTarget?.title ?? ""}
        onConfirm={() => deleteTarget && deleteMut.mutate(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACTS TAB
// ═══════════════════════════════════════════════════════════════════════════════
function ContactsTab({ token }: { token: string }) {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const [expandedId, setExpandedId] = useState<bigint | null>(null);

  const { data: items = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getContactSubmissions(token);
      if (result.__kind__ === "ok") {
        return [...result.ok].sort((a, b) =>
          Number(b.submittedAt - a.submittedAt),
        );
      }
      return [];
    },
    enabled: !!actor,
  });

  const markReadMut = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      return unwrapOk(await actor.markContactRead(token, id));
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
    onError: (e) => toast.error(String(e)),
  });

  const handleExpand = useCallback(
    (sub: ContactSubmission) => {
      const id = sub.id;
      setExpandedId((prev) => (prev === id ? null : id));
      if (!sub.isRead) markReadMut.mutate(id);
    },
    [markReadMut],
  );

  const unreadCount = items.filter((i) => !i.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-display font-bold text-foreground">
            Contact Submissions
          </h2>
          {unreadCount > 0 && (
            <Badge className="bg-accent/20 text-accent border-accent/40">
              {unreadCount} unread
            </Badge>
          )}
        </div>
      </div>

      {isLoading ? (
        <SkeletonRows />
      ) : items.length === 0 ? (
        <div
          className="glass-card rounded-xl p-12 text-center border border-border/20"
          data-ocid="admin.contacts.empty_state"
        >
          <Mail className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground font-body">
            No contact submissions yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((sub, i) => {
            const isExpanded = expandedId === sub.id;
            return (
              <motion.div
                key={String(sub.id)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`glass-card rounded-xl border transition-smooth ${sub.isRead ? "border-border/20" : "border-accent/30 neon-border-cyan"}`}
                data-ocid={`admin.contacts.item.${i + 1}`}
              >
                <button
                  type="button"
                  className="w-full p-4 flex items-start justify-between gap-4 text-left"
                  onClick={() => handleExpand(sub)}
                  data-ocid={`admin.contacts.toggle.${i + 1}`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {!sub.isRead && (
                      <span className="w-2 h-2 rounded-full bg-accent mt-2 shrink-0 animate-pulse" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="font-display font-semibold text-foreground">
                          {sub.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {sub.email}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                        {sub.message}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground/60 hidden sm:block">
                      {formatTimestamp(sub.submittedAt)}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-0 border-t border-border/20">
                        <p className="text-sm text-muted-foreground mb-2 mt-3">
                          <span className="font-medium text-foreground">
                            Email:
                          </span>{" "}
                          {sub.email}
                        </p>
                        <p className="text-sm text-muted-foreground mb-2">
                          <span className="font-medium text-foreground">
                            Submitted:
                          </span>{" "}
                          {formatTimestamp(sub.submittedAt)}
                        </p>
                        <div className="mt-3 p-3 rounded-lg bg-muted/20 border border-border/20">
                          <p className="text-sm text-foreground whitespace-pre-wrap">
                            {sub.message}
                          </p>
                        </div>
                        {sub.isRead && (
                          <p className="text-xs text-muted-foreground/50 mt-2">
                            ✓ Read
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Empty state ─────────────────────────────────────────────────────────────
function EmptyState({ label, onAdd }: { label: string; onAdd: () => void }) {
  return (
    <div
      className="glass-card rounded-xl p-12 text-center border border-border/20"
      data-ocid={`admin.${label}.empty_state`}
    >
      <Plus className="w-12 h-12 mx-auto text-muted-foreground/40 mb-3" />
      <p className="text-muted-foreground font-body mb-4">
        No {label} yet. Add the first one!
      </p>
      <Button
        onClick={onAdd}
        className="bg-primary text-primary-foreground hover:bg-primary/80 gap-2"
      >
        <Plus className="w-4 h-4" /> Add {label}
      </Button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN ADMIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function AdminPage() {
  const { sessionToken, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("research");

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/" });
  };

  if (!sessionToken) return null;

  return (
    <div className="min-h-screen bg-background flex" data-ocid="admin.page">
      {/* ── Sidebar (desktop) ── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 min-h-screen bg-card/60 backdrop-blur-md border-r border-border/30 sticky top-0">
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="text-primary font-display font-bold text-sm">
                A
              </span>
            </div>
            <div>
              <p className="font-display font-bold text-foreground text-sm">
                Admin Panel
              </p>
              <p className="text-xs text-muted-foreground">PharmacyGuide</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-body font-medium transition-smooth ${
                  isActive
                    ? "bg-primary/15 text-primary border border-primary/30 glow-cyan"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                }`}
                data-ocid={`admin.sidebar.${tab.id}.tab`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/30">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
            data-ocid="admin.sidebar.logout_button"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Mobile header */}
        <header className="lg:hidden sticky top-0 z-30 bg-card/80 backdrop-blur-md border-b border-border/30 px-4 py-3 flex items-center justify-between">
          <p className="font-display font-bold text-foreground">Admin Panel</p>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleLogout}
            className="gap-2 text-destructive hover:bg-destructive/10"
            data-ocid="admin.mobile.logout_button"
          >
            <LogOut className="w-4 h-4" />
            <span className="sr-only sm:not-sr-only">Logout</span>
          </Button>
        </header>

        {/* Mobile tab bar */}
        <div className="lg:hidden overflow-x-auto border-b border-border/30 bg-card/40 backdrop-blur-sm">
          <div className="flex px-2 py-2 gap-1 min-w-max">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium whitespace-nowrap transition-smooth ${isActive ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground hover:text-foreground hover:bg-muted/20"}`}
                  data-ocid={`admin.mobiletab.${tab.id}.tab`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content area */}
        <main className="flex-1 p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "research" && <ResearchTab token={sessionToken} />}
              {activeTab === "articles" && <ArticlesTab token={sessionToken} />}
              {activeTab === "publications" && (
                <PublicationsTab token={sessionToken} />
              )}
              {activeTab === "notes" && <NotesTab token={sessionToken} />}
              {activeTab === "contacts" && <ContactsTab token={sessionToken} />}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="border-t border-border/20 px-6 py-3 text-center">
          <p className="text-xs text-muted-foreground/50 font-body">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="text-primary/60 hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
