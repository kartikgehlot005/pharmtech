import Map "mo:core/Map";
import Time "mo:core/Time";
import Types "../types/auth";
import Common "../types/common";

module {
  let ADMIN_USERNAME = "PHARMACYGUIDE";
  let ADMIN_PASSWORD = "Ashwin@pharmacytech";

  func generateToken(salt : Nat) : Text {
    let t = Time.now();
    "session_" # debug_show(t) # "_" # debug_show(salt);
  };

  public func adminLogin(
    sessions : Map.Map<Text, Int>,
    username : Text,
    password : Text,
    salt : Nat,
  ) : Common.Result<Types.SessionToken> {
    if (username != ADMIN_USERNAME or password != ADMIN_PASSWORD) {
      return #err("Invalid credentials");
    };
    let token = generateToken(salt);
    let expiry = Time.now() + 86_400_000_000_000; // 24 hours in nanoseconds
    sessions.add(token, expiry);
    #ok(token);
  };

  public func validateSession(
    sessions : Map.Map<Text, Int>,
    token : Text,
  ) : Bool {
    switch (sessions.get(token)) {
      case (?expiry) {
        if (Time.now() < expiry) {
          true;
        } else {
          sessions.remove(token);
          false;
        };
      };
      case null { false };
    };
  };

  public func adminLogout(
    sessions : Map.Map<Text, Int>,
    token : Text,
  ) : Common.Result<()> {
    switch (sessions.get(token)) {
      case (?_) {
        sessions.remove(token);
        #ok(());
      };
      case null { #err("Session not found") };
    };
  };
};
