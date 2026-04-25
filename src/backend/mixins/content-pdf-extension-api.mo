import List "mo:core/List";
import MapMod "mo:core/Map";
import ContentTypes "../types/content";
import PdfExtLib "../lib/content-pdf-extension";
import AuthLib "../lib/auth";
import Common "../types/common";

// Public API mixin that exposes PDF-aware create/update endpoints for
// Research, Article, and Publication content types.
mixin (
  sessions : MapMod.Map<Text, Int>,
  researches : List.List<ContentTypes.Research>,
  articles : List.List<ContentTypes.Article>,
  publications : List.List<ContentTypes.Publication>,
) {
  /// Create a Research entry with optional PDF attachment (admin only).
  public func createResearchWithPdf(
    token : Text,
    input : ContentTypes.ResearchInput,
  ) : async Common.Result<ContentTypes.Research> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    #ok(PdfExtLib.createResearchWithPdf(researches, input));
  };

  /// Update a Research entry with optional PDF attachment (admin only).
  public func updateResearchWithPdf(
    token : Text,
    id : Nat,
    input : ContentTypes.ResearchInput,
  ) : async Common.Result<ContentTypes.Research> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    PdfExtLib.updateResearchWithPdf(researches, id, input);
  };

  /// Create an Article entry with optional PDF attachment (admin only).
  public func createArticleWithPdf(
    token : Text,
    input : ContentTypes.ArticleInput,
  ) : async Common.Result<ContentTypes.Article> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    #ok(PdfExtLib.createArticleWithPdf(articles, input));
  };

  /// Update an Article entry with optional PDF attachment (admin only).
  public func updateArticleWithPdf(
    token : Text,
    id : Nat,
    input : ContentTypes.ArticleInput,
  ) : async Common.Result<ContentTypes.Article> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    PdfExtLib.updateArticleWithPdf(articles, id, input);
  };

  /// Create a Publication entry with optional PDF attachment (admin only).
  public func createPublicationWithPdf(
    token : Text,
    input : ContentTypes.PublicationInput,
  ) : async Common.Result<ContentTypes.Publication> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    #ok(PdfExtLib.createPublicationWithPdf(publications, input));
  };

  /// Update a Publication entry with optional PDF attachment (admin only).
  public func updatePublicationWithPdf(
    token : Text,
    id : Nat,
    input : ContentTypes.PublicationInput,
  ) : async Common.Result<ContentTypes.Publication> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    PdfExtLib.updatePublicationWithPdf(publications, id, input);
  };
};
