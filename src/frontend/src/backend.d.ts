import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Article {
    id: bigint;
    title: string;
    content: string;
    date: string;
    createdAt: bigint;
    tags: Array<string>;
    pdfUrl?: string;
    excerpt: string;
    category: string;
    pdfFileName?: string;
    pdfFileId?: string;
}
export type Result_2 = {
    __kind__: "ok";
    ok: Publication;
} | {
    __kind__: "err";
    err: string;
};
export interface PublicationInput {
    doi?: string;
    title: string;
    journal: string;
    year: bigint;
    imageUrl?: string;
    authors: Array<string>;
    pdfUrl?: string;
    abstract: string;
    pdfFileName?: string;
    pdfFileId?: string;
}
export type Result_6 = {
    __kind__: "ok";
    ok: string;
} | {
    __kind__: "err";
    err: string;
};
export interface ContactSubmission {
    id: bigint;
    name: string;
    submittedAt: bigint;
    isRead: boolean;
    email: string;
    message: string;
}
export type Result_5 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: string;
};
export type Result_1 = {
    __kind__: "ok";
    ok: Research;
} | {
    __kind__: "err";
    err: string;
};
export interface UploadResult {
    url: string;
    fileId: string;
}
export type Result_4 = {
    __kind__: "ok";
    ok: Article;
} | {
    __kind__: "err";
    err: string;
};
export type Result = {
    __kind__: "ok";
    ok: UploadResult;
} | {
    __kind__: "err";
    err: string;
};
export type Result_3 = {
    __kind__: "ok";
    ok: Note;
} | {
    __kind__: "err";
    err: string;
};
export interface NoteInput {
    title: string;
    content: string;
    fileName?: string;
    pdfUrl?: string;
    pdfFileName?: string;
    pdfFileId?: string;
    fileUrl?: string;
}
export type SessionToken = string;
export type Result_8 = {
    __kind__: "ok";
    ok: SessionToken;
} | {
    __kind__: "err";
    err: string;
};
export type Result_7 = {
    __kind__: "ok";
    ok: Array<ContactSubmission>;
} | {
    __kind__: "err";
    err: string;
};
export interface Publication {
    id: bigint;
    doi?: string;
    title: string;
    journal: string;
    createdAt: bigint;
    year: bigint;
    imageUrl?: string;
    authors: Array<string>;
    pdfUrl?: string;
    abstract: string;
    pdfFileName?: string;
    pdfFileId?: string;
}
export interface ArticleInput {
    title: string;
    content: string;
    date: string;
    tags: Array<string>;
    pdfUrl?: string;
    excerpt: string;
    category: string;
    pdfFileName?: string;
    pdfFileId?: string;
}
export interface Research {
    id: bigint;
    title: string;
    date: string;
    createdAt: bigint;
    tags: Array<string>;
    description: string;
    summary: string;
    imageUrl?: string;
    pdfUrl?: string;
    pdfFileName?: string;
    pdfFileId?: string;
}
export interface ResearchInput {
    title: string;
    date: string;
    tags: Array<string>;
    description: string;
    summary: string;
    imageUrl?: string;
    pdfUrl?: string;
    pdfFileName?: string;
    pdfFileId?: string;
}
export interface Note {
    id: bigint;
    title: string;
    content: string;
    createdAt: bigint;
    fileName?: string;
    pdfUrl?: string;
    pdfFileName?: string;
    pdfFileId?: string;
    fileUrl?: string;
}
export interface backendInterface {
    adminLogin(username: string, password: string): Promise<Result_8>;
    adminLogout(token: string): Promise<Result_5>;
    createArticle(token: string, input: ArticleInput): Promise<Result_4>;
    createArticleWithPdf(token: string, input: ArticleInput): Promise<Result_4>;
    createNote(token: string, input: NoteInput): Promise<Result_3>;
    createPublication(token: string, input: PublicationInput): Promise<Result_2>;
    createPublicationWithPdf(token: string, input: PublicationInput): Promise<Result_2>;
    createResearch(token: string, input: ResearchInput): Promise<Result_1>;
    createResearchWithPdf(token: string, input: ResearchInput): Promise<Result_1>;
    deleteArticle(token: string, id: bigint): Promise<Result_5>;
    deleteNote(token: string, id: bigint): Promise<Result_5>;
    deletePdf(token: string, fileId: string): Promise<Result_5>;
    deletePublication(token: string, id: bigint): Promise<Result_5>;
    deleteResearch(token: string, id: bigint): Promise<Result_5>;
    getArticles(): Promise<Array<Article>>;
    getContactSubmissions(token: string): Promise<Result_7>;
    getNotes(): Promise<Array<Note>>;
    getPdfUrl(fileId: string): Promise<Result_6>;
    getPublications(): Promise<Array<Publication>>;
    getResearches(): Promise<Array<Research>>;
    markContactRead(token: string, id: bigint): Promise<Result_5>;
    submitContact(name: string, email: string, message: string): Promise<Result_5>;
    updateArticle(token: string, id: bigint, input: ArticleInput): Promise<Result_4>;
    updateArticleWithPdf(token: string, id: bigint, input: ArticleInput): Promise<Result_4>;
    updateNote(token: string, id: bigint, input: NoteInput): Promise<Result_3>;
    updatePublication(token: string, id: bigint, input: PublicationInput): Promise<Result_2>;
    updatePublicationWithPdf(token: string, id: bigint, input: PublicationInput): Promise<Result_2>;
    updateResearch(token: string, id: bigint, input: ResearchInput): Promise<Result_1>;
    updateResearchWithPdf(token: string, id: bigint, input: ResearchInput): Promise<Result_1>;
    uploadPdf(token: string, fileName: string, contentType: string, fileId: string): Promise<Result>;
    validateSession(token: string): Promise<boolean>;
}
