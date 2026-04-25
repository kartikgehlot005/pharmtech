import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Types "../types/content";
import Common "../types/common";

module {
  // Compute next ID as max existing id + 1 (safe across deletes)
  func nextResearchIdFrom(list : List.List<Types.Research>) : Nat {
    list.foldLeft<Nat, Types.Research>(0, func(acc, r) = Nat.max(acc, r.id)) + 1;
  };

  func nextArticleIdFrom(list : List.List<Types.Article>) : Nat {
    list.foldLeft<Nat, Types.Article>(0, func(acc, a) = Nat.max(acc, a.id)) + 1;
  };

  func nextPublicationIdFrom(list : List.List<Types.Publication>) : Nat {
    list.foldLeft<Nat, Types.Publication>(0, func(acc, p) = Nat.max(acc, p.id)) + 1;
  };

  func nextNoteIdFrom(list : List.List<Types.Note>) : Nat {
    list.foldLeft<Nat, Types.Note>(0, func(acc, n) = Nat.max(acc, n.id)) + 1;
  };

  // --- Research ---

  public func getResearches(researches : List.List<Types.Research>) : [Types.Research] {
    let arr = researches.toArray();
    arr.sort(func(a, b) = Int.compare(b.createdAt, a.createdAt));
  };

  public func createResearch(
    researches : List.List<Types.Research>,
    input : Types.ResearchInput,
  ) : Types.Research {
    let item : Types.Research = {
      id = nextResearchIdFrom(researches);
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

  public func updateResearch(
    researches : List.List<Types.Research>,
    id : Nat,
    input : Types.ResearchInput,
  ) : Common.Result<Types.Research> {
    var found : ?Types.Research = null;
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

  public func deleteResearch(
    researches : List.List<Types.Research>,
    id : Nat,
  ) : Common.Result<()> {
    let sizeBefore = researches.size();
    let filtered = researches.filter(func(r) { r.id != id });
    researches.clear();
    researches.append(filtered);
    if (researches.size() < sizeBefore) {
      #ok(());
    } else {
      #err("Research not found");
    };
  };

  // --- Article ---

  public func getArticles(articles : List.List<Types.Article>) : [Types.Article] {
    let arr = articles.toArray();
    arr.sort(func(a, b) = Int.compare(b.createdAt, a.createdAt));
  };

  public func createArticle(
    articles : List.List<Types.Article>,
    input : Types.ArticleInput,
  ) : Types.Article {
    let item : Types.Article = {
      id = nextArticleIdFrom(articles);
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

  public func updateArticle(
    articles : List.List<Types.Article>,
    id : Nat,
    input : Types.ArticleInput,
  ) : Common.Result<Types.Article> {
    var found : ?Types.Article = null;
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

  public func deleteArticle(
    articles : List.List<Types.Article>,
    id : Nat,
  ) : Common.Result<()> {
    let sizeBefore = articles.size();
    let filtered = articles.filter(func(a) { a.id != id });
    articles.clear();
    articles.append(filtered);
    if (articles.size() < sizeBefore) {
      #ok(());
    } else {
      #err("Article not found");
    };
  };

  // --- Publication ---

  public func getPublications(publications : List.List<Types.Publication>) : [Types.Publication] {
    let arr = publications.toArray();
    arr.sort(func(a, b) = Int.compare(b.createdAt, a.createdAt));
  };

  public func createPublication(
    publications : List.List<Types.Publication>,
    input : Types.PublicationInput,
  ) : Types.Publication {
    let item : Types.Publication = {
      id = nextPublicationIdFrom(publications);
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

  public func updatePublication(
    publications : List.List<Types.Publication>,
    id : Nat,
    input : Types.PublicationInput,
  ) : Common.Result<Types.Publication> {
    var found : ?Types.Publication = null;
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

  public func deletePublication(
    publications : List.List<Types.Publication>,
    id : Nat,
  ) : Common.Result<()> {
    let sizeBefore = publications.size();
    let filtered = publications.filter(func(p) { p.id != id });
    publications.clear();
    publications.append(filtered);
    if (publications.size() < sizeBefore) {
      #ok(());
    } else {
      #err("Publication not found");
    };
  };

  // --- Note ---

  public func getNotes(notes : List.List<Types.Note>) : [Types.Note] {
    let arr = notes.toArray();
    arr.sort(func(a, b) = Int.compare(b.createdAt, a.createdAt));
  };

  public func createNote(
    notes : List.List<Types.Note>,
    input : Types.NoteInput,
  ) : Types.Note {
    let item : Types.Note = {
      id = nextNoteIdFrom(notes);
      title = input.title;
      content = input.content;
      fileUrl = input.fileUrl;
      fileName = input.fileName;
      pdfFileId = input.pdfFileId;
      pdfFileName = input.pdfFileName;
      pdfUrl = input.pdfUrl;
      createdAt = Time.now();
    };
    notes.add(item);
    item;
  };

  public func updateNote(
    notes : List.List<Types.Note>,
    id : Nat,
    input : Types.NoteInput,
  ) : Common.Result<Types.Note> {
    var found : ?Types.Note = null;
    notes.mapInPlace(func(n) {
      if (n.id == id) {
        let updated = { n with
          title = input.title;
          content = input.content;
          fileUrl = input.fileUrl;
          fileName = input.fileName;
          pdfFileId = input.pdfFileId;
          pdfFileName = input.pdfFileName;
          pdfUrl = input.pdfUrl;
        };
        found := ?updated;
        updated;
      } else { n };
    });
    switch (found) {
      case (?item) { #ok(item) };
      case null { #err("Note not found") };
    };
  };

  public func deleteNote(
    notes : List.List<Types.Note>,
    id : Nat,
  ) : Common.Result<()> {
    let sizeBefore = notes.size();
    let filtered = notes.filter(func(n) { n.id != id });
    notes.clear();
    notes.append(filtered);
    if (notes.size() < sizeBefore) {
      #ok(());
    } else {
      #err("Note not found");
    };
  };
};
