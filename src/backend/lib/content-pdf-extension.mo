import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import ContentTypes "../types/content";
import Common "../types/common";

// Domain logic for creating and updating Research, Article, and Publication
// records that carry optional PDF file metadata (pdfFileId, pdfFileName).
// These functions mirror the core content lib but accept extended input types
// that include the pdf fields.
module {
  func nextResearchId(list : List.List<ContentTypes.Research>) : Nat {
    list.foldLeft<Nat, ContentTypes.Research>(0, func(acc, r) = Nat.max(acc, r.id)) + 1;
  };

  func nextArticleId(list : List.List<ContentTypes.Article>) : Nat {
    list.foldLeft<Nat, ContentTypes.Article>(0, func(acc, a) = Nat.max(acc, a.id)) + 1;
  };

  func nextPublicationId(list : List.List<ContentTypes.Publication>) : Nat {
    list.foldLeft<Nat, ContentTypes.Publication>(0, func(acc, p) = Nat.max(acc, p.id)) + 1;
  };

  /// Create a Research record that includes optional PDF fields.
  public func createResearchWithPdf(
    researches : List.List<ContentTypes.Research>,
    input : ContentTypes.ResearchInput,
  ) : ContentTypes.Research {
    let item : ContentTypes.Research = {
      id = nextResearchId(researches);
      title = input.title;
      summary = input.summary;
      description = input.description;
      tags = input.tags;
      imageUrl = input.imageUrl;
      date = input.date;
      pdfFileId = input.pdfFileId;
      pdfFileName = input.pdfFileName;
      pdfUrl = input.pdfUrl;
      createdAt = Time.now();
    };
    researches.add(item);
    item;
  };

  /// Update a Research record including optional PDF fields.
  public func updateResearchWithPdf(
    researches : List.List<ContentTypes.Research>,
    id : Nat,
    input : ContentTypes.ResearchInput,
  ) : Common.Result<ContentTypes.Research> {
    var found : ?ContentTypes.Research = null;
    researches.mapInPlace(func(r) {
      if (r.id == id) {
        let updated = { r with
          title = input.title;
          summary = input.summary;
          description = input.description;
          tags = input.tags;
          imageUrl = input.imageUrl;
          date = input.date;
          pdfFileId = input.pdfFileId;
          pdfFileName = input.pdfFileName;
          pdfUrl = input.pdfUrl;
        };
        found := ?updated;
        updated;
      } else { r };
    });
    switch (found) {
      case (?item) { #ok(item) };
      case null { #err("Research not found") };
    };
  };

  /// Create an Article record that includes optional PDF fields.
  public func createArticleWithPdf(
    articles : List.List<ContentTypes.Article>,
    input : ContentTypes.ArticleInput,
  ) : ContentTypes.Article {
    let item : ContentTypes.Article = {
      id = nextArticleId(articles);
      title = input.title;
      excerpt = input.excerpt;
      content = input.content;
      category = input.category;
      tags = input.tags;
      date = input.date;
      pdfFileId = input.pdfFileId;
      pdfFileName = input.pdfFileName;
      pdfUrl = input.pdfUrl;
      createdAt = Time.now();
    };
    articles.add(item);
    item;
  };

  /// Update an Article record including optional PDF fields.
  public func updateArticleWithPdf(
    articles : List.List<ContentTypes.Article>,
    id : Nat,
    input : ContentTypes.ArticleInput,
  ) : Common.Result<ContentTypes.Article> {
    var found : ?ContentTypes.Article = null;
    articles.mapInPlace(func(a) {
      if (a.id == id) {
        let updated = { a with
          title = input.title;
          excerpt = input.excerpt;
          content = input.content;
          category = input.category;
          tags = input.tags;
          date = input.date;
          pdfFileId = input.pdfFileId;
          pdfFileName = input.pdfFileName;
          pdfUrl = input.pdfUrl;
        };
        found := ?updated;
        updated;
      } else { a };
    });
    switch (found) {
      case (?item) { #ok(item) };
      case null { #err("Article not found") };
    };
  };

  /// Create a Publication record that includes optional PDF fields.
  public func createPublicationWithPdf(
    publications : List.List<ContentTypes.Publication>,
    input : ContentTypes.PublicationInput,
  ) : ContentTypes.Publication {
    let item : ContentTypes.Publication = {
      id = nextPublicationId(publications);
      title = input.title;
      authors = input.authors;
      year = input.year;
      journal = input.journal;
      doi = input.doi;
      abstract = input.abstract;
      imageUrl = input.imageUrl;
      pdfFileId = input.pdfFileId;
      pdfFileName = input.pdfFileName;
      pdfUrl = input.pdfUrl;
      createdAt = Time.now();
    };
    publications.add(item);
    item;
  };

  /// Update a Publication record including optional PDF fields.
  public func updatePublicationWithPdf(
    publications : List.List<ContentTypes.Publication>,
    id : Nat,
    input : ContentTypes.PublicationInput,
  ) : Common.Result<ContentTypes.Publication> {
    var found : ?ContentTypes.Publication = null;
    publications.mapInPlace(func(p) {
      if (p.id == id) {
        let updated = { p with
          title = input.title;
          authors = input.authors;
          year = input.year;
          journal = input.journal;
          doi = input.doi;
          abstract = input.abstract;
          imageUrl = input.imageUrl;
          pdfFileId = input.pdfFileId;
          pdfFileName = input.pdfFileName;
          pdfUrl = input.pdfUrl;
        };
        found := ?updated;
        updated;
      } else { p };
    });
    switch (found) {
      case (?item) { #ok(item) };
      case null { #err("Publication not found") };
    };
  };
};
