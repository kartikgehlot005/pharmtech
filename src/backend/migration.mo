import List "mo:core/List";
import Map "mo:core/Map";
import ContentTypes "types/content";
import ContactTypes "types/contact";

module {
  // ── Old types (copied from previous version, without pdfUrl) ──────────────

  type OldResearch = {
    id : Nat;
    title : Text;
    summary : Text;
    description : Text;
    tags : [Text];
    imageUrl : ?Text;
    date : Text;
    pdfFileId : ?Text;
    pdfFileName : ?Text;
    createdAt : Int;
  };

  type OldArticle = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    category : Text;
    tags : [Text];
    date : Text;
    pdfFileId : ?Text;
    pdfFileName : ?Text;
    createdAt : Int;
  };

  type OldPublication = {
    id : Nat;
    title : Text;
    authors : [Text];
    year : Nat;
    journal : Text;
    doi : ?Text;
    abstract : Text;
    imageUrl : ?Text;
    pdfFileId : ?Text;
    pdfFileName : ?Text;
    createdAt : Int;
  };

  type OldNote = {
    id : Nat;
    title : Text;
    content : Text;
    fileUrl : ?Text;
    fileName : ?Text;
    pdfFileId : ?Text;
    pdfFileName : ?Text;
    createdAt : Int;
  };

  // ── State record types ────────────────────────────────────────────────────

  type OldActor = {
    sessions : Map.Map<Text, Int>;
    researches : List.List<OldResearch>;
    articles : List.List<OldArticle>;
    publications : List.List<OldPublication>;
    notes : List.List<OldNote>;
    pdfFiles : Map.Map<Text, { fileName : Text; contentType : Text; url : Text; registeredAt : Int }>;
    submissions : List.List<ContactTypes.ContactSubmission>;
  };

  type NewActor = {
    sessions : Map.Map<Text, Int>;
    researches : List.List<ContentTypes.Research>;
    articles : List.List<ContentTypes.Article>;
    publications : List.List<ContentTypes.Publication>;
    notes : List.List<ContentTypes.Note>;
    pdfFiles : Map.Map<Text, { fileName : Text; contentType : Text; url : Text; registeredAt : Int }>;
    submissions : List.List<ContactTypes.ContactSubmission>;
  };

  // ── Migration function ────────────────────────────────────────────────────

  public func run(old : OldActor) : NewActor {
    let researches = old.researches.map<OldResearch, ContentTypes.Research>(
      func(r) { { r with pdfUrl = null } }
    );
    let articles = old.articles.map<OldArticle, ContentTypes.Article>(
      func(a) { { a with pdfUrl = null } }
    );
    let publications = old.publications.map<OldPublication, ContentTypes.Publication>(
      func(p) { { p with pdfUrl = null } }
    );
    let notes = old.notes.map<OldNote, ContentTypes.Note>(
      func(n) { { n with pdfUrl = null } }
    );
    {
      sessions = old.sessions;
      researches;
      articles;
      publications;
      notes;
      pdfFiles = old.pdfFiles;
      submissions = old.submissions;
    };
  };
};
