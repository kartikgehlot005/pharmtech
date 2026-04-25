import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Prim "mo:prim";
import AuthLib "../lib/auth";
import Common "../types/common";

// Public API mixin for PDF file metadata management.
//
// How object-storage works on the Caffeine platform:
//   1. The frontend calls _immutableObjectStorageCreateCertificate(blobHash) to get
//      an upload certificate, then uploads the blob directly to the storage gateway.
//   2. After successful upload, the frontend calls uploadPdf with the fileId (hash)
//      and metadata so the canister records the association and returns the URL.
//   3. getPdfUrl retrieves the stored URL for a fileId.
mixin (
  sessions : Map.Map<Text, Int>,
  pdfFiles : Map.Map<Text, { fileName : Text; contentType : Text; url : Text; registeredAt : Int }>,
) {
  type UploadResult = { fileId : Text; url : Text };

  /// Register a PDF file's metadata after it has been uploaded to object storage (admin only).
  /// fileId is the hex-encoded blob hash returned by the storage gateway.
  /// Returns the serving URL built from the canister's own principal.
  public shared func uploadPdf(
    token : Text,
    fileName : Text,
    contentType : Text,
    fileId : Text,
  ) : async Common.Result<UploadResult> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    if (fileId.isEmpty()) {
      return #err("fileId must not be empty");
    };
    let selfPrincipal = Prim.getSelfPrincipal<system>();
    let url = "https://" # selfPrincipal.toText() # ".raw.icp0.io/pdf/" # fileId;
    pdfFiles.add(fileId, { fileName; contentType; url; registeredAt = Time.now() });
    #ok({ fileId; url });
  };

  /// Remove a PDF file entry from the metadata registry (admin only).
  /// The underlying blob will be garbage-collected by the platform.
  public func deletePdf(token : Text, fileId : Text) : async Common.Result<()> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    switch (pdfFiles.get(fileId)) {
      case null { #err("File not found") };
      case (?_) {
        pdfFiles.remove(fileId);
        #ok(());
      };
    };
  };

  /// Get the serving URL for a stored PDF by fileId (public).
  public query func getPdfUrl(fileId : Text) : async Common.Result<Text> {
    switch (pdfFiles.get(fileId)) {
      case null { #err("File not found") };
      case (?meta) { #ok(meta.url) };
    };
  };
};
