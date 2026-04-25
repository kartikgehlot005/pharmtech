import List "mo:core/List";
import ContentTypes "../types/content";
import ContentLib "../lib/content";
import AuthLib "../lib/auth";
import MapMod "mo:core/Map";
import Common "../types/common";

mixin (
  sessions : MapMod.Map<Text, Int>,
  researches : List.List<ContentTypes.Research>,
  articles : List.List<ContentTypes.Article>,
  publications : List.List<ContentTypes.Publication>,
  notes : List.List<ContentTypes.Note>,
) {
  // --- Public read ---

  public query func getResearches() : async [ContentTypes.Research] {
    ContentLib.getResearches(researches);
  };

  public query func getArticles() : async [ContentTypes.Article] {
    ContentLib.getArticles(articles);
  };

  public query func getPublications() : async [ContentTypes.Publication] {
    ContentLib.getPublications(publications);
  };

  public query func getNotes() : async [ContentTypes.Note] {
    ContentLib.getNotes(notes);
  };

  // --- Admin: Research ---

  public func createResearch(token : Text, input : ContentTypes.ResearchInput) : async Common.Result<ContentTypes.Research> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    #ok(ContentLib.createResearch(researches, input));
  };

  public func updateResearch(token : Text, id : Nat, input : ContentTypes.ResearchInput) : async Common.Result<ContentTypes.Research> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    ContentLib.updateResearch(researches, id, input);
  };

  public func deleteResearch(token : Text, id : Nat) : async Common.Result<()> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    ContentLib.deleteResearch(researches, id);
  };

  // --- Admin: Article ---

  public func createArticle(token : Text, input : ContentTypes.ArticleInput) : async Common.Result<ContentTypes.Article> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    #ok(ContentLib.createArticle(articles, input));
  };

  public func updateArticle(token : Text, id : Nat, input : ContentTypes.ArticleInput) : async Common.Result<ContentTypes.Article> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    ContentLib.updateArticle(articles, id, input);
  };

  public func deleteArticle(token : Text, id : Nat) : async Common.Result<()> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    ContentLib.deleteArticle(articles, id);
  };

  // --- Admin: Publication ---

  public func createPublication(token : Text, input : ContentTypes.PublicationInput) : async Common.Result<ContentTypes.Publication> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    #ok(ContentLib.createPublication(publications, input));
  };

  public func updatePublication(token : Text, id : Nat, input : ContentTypes.PublicationInput) : async Common.Result<ContentTypes.Publication> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    ContentLib.updatePublication(publications, id, input);
  };

  public func deletePublication(token : Text, id : Nat) : async Common.Result<()> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    ContentLib.deletePublication(publications, id);
  };

  // --- Admin: Note ---

  public func createNote(token : Text, input : ContentTypes.NoteInput) : async Common.Result<ContentTypes.Note> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    #ok(ContentLib.createNote(notes, input));
  };

  public func updateNote(token : Text, id : Nat, input : ContentTypes.NoteInput) : async Common.Result<ContentTypes.Note> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    ContentLib.updateNote(notes, id, input);
  };

  public func deleteNote(token : Text, id : Nat) : async Common.Result<()> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    ContentLib.deleteNote(notes, id);
  };
};
