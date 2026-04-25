import List "mo:core/List";
import ContactTypes "../types/contact";
import ContactLib "../lib/contact";
import AuthLib "../lib/auth";
import MapMod "mo:core/Map";
import Common "../types/common";

mixin (
  sessions : MapMod.Map<Text, Int>,
  submissions : List.List<ContactTypes.ContactSubmission>,
) {
  public func submitContact(name : Text, email : Text, message : Text) : async Common.Result<()> {
    ContactLib.submitContact(submissions, name, email, message);
  };

  public func getContactSubmissions(token : Text) : async Common.Result<[ContactTypes.ContactSubmission]> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    #ok(ContactLib.getContactSubmissions(submissions));
  };

  public func markContactRead(token : Text, id : Nat) : async Common.Result<()> {
    if (not AuthLib.validateSession(sessions, token)) {
      return #err("Unauthorized");
    };
    ContactLib.markContactRead(submissions, id);
  };
};
