import type {
  ArticleInput,
  NoteInput,
  PublicationInput,
  ResearchInput,
} from "../types";

// Helper to unwrap Result types
export function unwrapOk<T>(
  result: { __kind__: "ok"; ok: T } | { __kind__: "err"; err: string },
): T {
  if (result.__kind__ === "ok") return result.ok;
  throw new Error(result.err);
}

// Type guards
export function isOk<T>(
  result: { __kind__: "ok"; ok: T } | { __kind__: "err"; err: string },
): result is { __kind__: "ok"; ok: T } {
  return result.__kind__ === "ok";
}

export function isErr(
  result: { __kind__: "ok"; ok: unknown } | { __kind__: "err"; err: string },
): result is { __kind__: "err"; err: string } {
  return result.__kind__ === "err";
}

// ─── PDF Link Validation ──────────────────────────────────────────────────────

/**
 * Client-side HEAD fetch validation for an external PDF link.
 * Uses mode:'no-cors' — an opaque response (type='opaque') is treated as
 * reachable; a network error is treated as broken.
 * This is advisory/non-blocking — warnings do not prevent saving.
 */
export async function validatePdfLink(
  url: string,
): Promise<{ reachable: boolean }> {
  try {
    const resp = await fetch(url, { method: "HEAD", mode: "no-cors" });
    // opaque response means the request reached the server
    const reachable = resp.type === "opaque" || resp.ok;
    return { reachable };
  } catch {
    return { reachable: false };
  }
}

// ─── Input builders ──────────────────────────────────────────────────────────

export function buildResearchInput(
  data: Partial<ResearchInput>,
): ResearchInput {
  return {
    title: data.title ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    description: data.description ?? "",
    summary: data.summary ?? "",
    imageUrl: data.imageUrl,
    pdfUrl: data.pdfUrl || undefined,
  };
}

export function buildArticleInput(data: Partial<ArticleInput>): ArticleInput {
  return {
    title: data.title ?? "",
    content: data.content ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? "",
    category: data.category ?? "",
    pdfUrl: data.pdfUrl || undefined,
  };
}

export function buildPublicationInput(
  data: Partial<PublicationInput>,
): PublicationInput {
  return {
    title: data.title ?? "",
    journal: data.journal ?? "",
    year: data.year ?? BigInt(new Date().getFullYear()),
    authors: data.authors ?? [],
    abstract: data.abstract ?? "",
    doi: data.doi,
    imageUrl: data.imageUrl,
    pdfUrl: data.pdfUrl || undefined,
  };
}

export function buildNoteInput(data: Partial<NoteInput>): NoteInput {
  return {
    title: data.title ?? "",
    content: data.content ?? "",
    fileName: data.fileName,
    fileUrl: data.fileUrl,
    pdfUrl: data.pdfUrl || undefined,
  };
}

// Format BigInt timestamps
export function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
