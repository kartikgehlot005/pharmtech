function unwrapOk(result) {
  if (result.__kind__ === "ok") return result.ok;
  throw new Error(result.err);
}
function isOk(result) {
  return result.__kind__ === "ok";
}
async function validatePdfLink(url) {
  try {
    const resp = await fetch(url, { method: "HEAD", mode: "no-cors" });
    const reachable = resp.type === "opaque" || resp.ok;
    return { reachable };
  } catch {
    return { reachable: false };
  }
}
function buildResearchInput(data) {
  return {
    title: data.title ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    description: data.description ?? "",
    summary: data.summary ?? "",
    imageUrl: data.imageUrl,
    pdfUrl: data.pdfUrl || void 0
  };
}
function buildArticleInput(data) {
  return {
    title: data.title ?? "",
    content: data.content ?? "",
    date: data.date ?? "",
    tags: data.tags ?? [],
    excerpt: data.excerpt ?? "",
    category: data.category ?? "",
    pdfUrl: data.pdfUrl || void 0
  };
}
function buildPublicationInput(data) {
  return {
    title: data.title ?? "",
    journal: data.journal ?? "",
    year: data.year ?? BigInt((/* @__PURE__ */ new Date()).getFullYear()),
    authors: data.authors ?? [],
    abstract: data.abstract ?? "",
    doi: data.doi,
    imageUrl: data.imageUrl,
    pdfUrl: data.pdfUrl || void 0
  };
}
function buildNoteInput(data) {
  return {
    title: data.title ?? "",
    content: data.content ?? "",
    fileName: data.fileName,
    fileUrl: data.fileUrl,
    pdfUrl: data.pdfUrl || void 0
  };
}
function formatTimestamp(ts) {
  const ms = Number(ts / BigInt(1e6));
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
export {
  buildArticleInput as a,
  buildResearchInput as b,
  buildPublicationInput as c,
  buildNoteInput as d,
  formatTimestamp as f,
  isOk as i,
  unwrapOk as u,
  validatePdfLink as v
};
