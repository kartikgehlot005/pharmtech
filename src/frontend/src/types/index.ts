import type {
  Article,
  ArticleInput,
  ContactSubmission,
  Note,
  NoteInput,
  Publication,
  PublicationInput,
  Research,
  ResearchInput,
  SessionToken,
  UploadResult,
} from "../backend.d";

export type {
  Research,
  ResearchInput,
  Article,
  ArticleInput,
  Publication,
  PublicationInput,
  Note,
  NoteInput,
  ContactSubmission,
  SessionToken,
  UploadResult,
};

export interface AdminCredentials {
  username: string;
  password: string;
}

export interface NavLink {
  label: string;
  path: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Home", path: "/" },
  { label: "Research", path: "/research" },
  { label: "Articles", path: "/articles" },
  { label: "Publications", path: "/publications" },
  { label: "Notes", path: "/notes" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

/** Shape of a pending PDF upload in form state */
export interface PdfAttachment {
  fileId: string;
  fileName: string;
}
