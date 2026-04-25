import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Nat "mo:core/Nat";
import Types "../types/contact";
import Common "../types/common";

module {
  func nextIdFrom(list : List.List<Types.ContactSubmission>) : Nat {
    list.foldLeft<Nat, Types.ContactSubmission>(0, func(acc, s) = Nat.max(acc, s.id)) + 1;
  };

  public func submitContact(
    submissions : List.List<Types.ContactSubmission>,
    name : Text,
    email : Text,
    message : Text,
  ) : Common.Result<()> {
    if (name.size() == 0) { return #err("Name is required") };
    if (email.size() == 0) { return #err("Email is required") };
    if (message.size() == 0) { return #err("Message is required") };
    let item : Types.ContactSubmission = {
      id = nextIdFrom(submissions);
      name;
      email;
      message;
      submittedAt = Time.now();
      isRead = false;
    };
    submissions.add(item);
    #ok(());
  };

  public func getContactSubmissions(
    submissions : List.List<Types.ContactSubmission>
  ) : [Types.ContactSubmission] {
    let arr = submissions.toArray();
    arr.sort(func(a, b) = Int.compare(b.submittedAt, a.submittedAt));
  };

  public func markContactRead(
    submissions : List.List<Types.ContactSubmission>,
    id : Nat,
  ) : Common.Result<()> {
    var found = false;
    submissions.mapInPlace(func(s) {
      if (s.id == id) {
        found := true;
        { s with isRead = true };
      } else { s };
    });
    if (found) { #ok(()) } else { #err("Submission not found") };
  };
};
