// This module is retained for backwards compatibility but the PDF fields
// (pdfFileId, pdfFileName) are now part of the core content types in
// types/content.mo. The extended input types here are type aliases.
import ContentTypes "content";

module {
  public type ResearchPdfInput = ContentTypes.ResearchInput;
  public type ArticlePdfInput = ContentTypes.ArticleInput;
  public type PublicationPdfInput = ContentTypes.PublicationInput;
};
