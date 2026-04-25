import Map "mo:core/Map";
import AuthLib "../lib/auth";
import AuthTypes "../types/auth";
import Common "../types/common";

mixin (
  sessions : Map.Map<Text, Int>,
) {
  public func adminLogin(username : Text, password : Text) : async Common.Result<AuthTypes.SessionToken> {
    AuthLib.adminLogin(sessions, username, password, sessions.size());
  };

  public query func validateSession(token : Text) : async Bool {
    AuthLib.validateSession(sessions, token);
  };

  public func adminLogout(token : Text) : async Common.Result<()> {
    AuthLib.adminLogout(sessions, token);
  };
};
