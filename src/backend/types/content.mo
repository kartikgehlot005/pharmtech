module {
  public type Research = {
    id : Nat;
    title : Text;
    summary : Text;
    description : Text;
    tags : [Text];
    imageUrl : ?Text;
    date : Text;
    pdfFileId : ?Text;
    pdfFileName : ?Text;
    pdfUrl : ?Text;
    createdAt : Int;
  };

  public type ResearchInput = {
    title : Text;
    summary : Text;
    description : Text;
    tags : [Text];
    imageUrl : ?Text;
    date : Text;
    pdfFileId : ?Text;
    pdfFileName : ?Text;
    pdfUrl : ?Text;
  };

  public type Article = {
    id : Nat;
    title : Text;
    excerpt : Text;
    content : Text;
    category : Text;
    tags : [Text];
    date : Text;
    pdfFileId : ?Text;
    pdfFileName : ?Text;
    pdfUrl : ?Text;
    createdAt : Int;
  };

  public type ArticleInput = {
    title : Text;
    excerpt : Text;
    content : Text;
    category : Text;
    tags : [Text];
    date : Text;
    pdfFileId : ?Text;
    pdfFileName : ?Text;
    pdfUrl : ?Text;
  };

  public type Publication = {
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
    pdfUrl : ?Text;
    createdAt : Int;
  };

  public type PublicationInput = {
    title : Text;
    authors : [Text];
    year : Nat;
    journal : Text;
    doi : ?Text;
    abstract : Text;
    imageUrl : ?Text;
    pdfFileId : ?Text;
    pdfFileName : ?Text;
    pdfUrl : ?Text;
  };

  public type Note = {
    id : Nat;
    title : Text;
    content : Text;
    fileUrl : ?Text;
    fileName : ?Text;
    pdfFileId : ?Text;
    pdfFileName : ?Text;
    pdfUrl : ?Text;
    createdAt : Int;
  };

  public type NoteInput = {
    title : Text;
    content : Text;
    fileUrl : ?Text;
    fileName : ?Text;
    pdfFileId : ?Text;
    pdfFileName : ?Text;
    pdfUrl : ?Text;
  };
};
