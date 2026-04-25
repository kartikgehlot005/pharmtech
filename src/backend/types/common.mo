module {
  public type Timestamp = Int;

  public type Result<T> = {
    #ok : T;
    #err : Text;
  };
};
