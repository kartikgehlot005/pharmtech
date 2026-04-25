import type { backendInterface } from "../backend";

// biome-ignore lint/suspicious/noExplicitAny: mock stubs use any intentionally
const stub = (): any => Promise.resolve({ __kind__: "ok" as const, ok: null });
// biome-ignore lint/suspicious/noExplicitAny: mock stubs use any intentionally
const stubArr = (): any => Promise.resolve([]);
// biome-ignore lint/suspicious/noExplicitAny: mock stubs use any intentionally
const stubFalse = (): any => Promise.resolve(false);

export const mockBackend: backendInterface = {
  adminLogin: async (_username: string, _password: string) => ({
    __kind__: "ok" as const,
    ok: "mock-session-token-12345",
  }),
  adminLogout: stub,
  validateSession: stubFalse,

  getResearches: async () => [
    {
      id: BigInt(1),
      title: "Novel Drug Delivery Systems for Anti-Hypertensive Agents",
      summary:
        "Investigating nanoparticle-based delivery to improve bioavailability of anti-hypertensive drugs.",
      description:
        "This research explores lipid nanoparticle formulations for improved systemic delivery of amlodipine and telmisartan, demonstrating enhanced bioavailability and sustained release profiles in preclinical studies.",
      tags: ["Drug Delivery", "Nanoparticles", "Hypertension", "Pharmacokinetics"],
      imageUrl: undefined,
      date: "2024-03-15",
      createdAt: BigInt(Date.now() - 172800000) * BigInt(1000000),
    },
    {
      id: BigInt(2),
      title: "Phytochemical Analysis of Medicinal Plants in Central India",
      summary:
        "Screening bioactive compounds in traditional medicinal plants for anti-diabetic properties.",
      description:
        "A comprehensive phytochemical screening of 12 medicinal plant species commonly used in traditional Ayurvedic medicine, evaluating their anti-diabetic, antioxidant, and anti-inflammatory potential.",
      tags: ["Phytochemistry", "Traditional Medicine", "Diabetes", "Antioxidants"],
      imageUrl: undefined,
      date: "2024-06-20",
      createdAt: BigInt(Date.now() - 86400000) * BigInt(1000000),
    },
  ],

  getArticles: async () => [
    {
      id: BigInt(1),
      title: "Understanding Pharmacokinetics: A Beginner's Guide",
      excerpt:
        "A concise overview of how drugs move through the human body — absorption, distribution, metabolism, and excretion.",
      content:
        "Pharmacokinetics (PK) is the study of drug movement within a biological system. The four fundamental processes — ADME — determine a drug's concentration-time profile.",
      category: "Education",
      tags: ["Pharmacokinetics", "ADME", "Drug Design"],
      date: "2024-04-10",
      createdAt: BigInt(Date.now() - 172800000) * BigInt(1000000),
    },
    {
      id: BigInt(2),
      title: "The Role of Nanotechnology in Modern Therapeutics",
      excerpt:
        "How nanoparticle platforms are transforming drug delivery and enabling targeted cancer therapies.",
      content:
        "Nanotechnology has opened new horizons in pharmaceutical sciences. Nanocarriers offer unique advantages including targeted delivery and controlled release.",
      category: "Research",
      tags: ["Nanotechnology", "Drug Delivery", "Cancer", "Therapeutics"],
      date: "2024-07-05",
      createdAt: BigInt(Date.now() - 86400000) * BigInt(1000000),
    },
  ],

  getPublications: async () => [
    {
      id: BigInt(1),
      title:
        "Lipid Nanoparticles for Oral Delivery of Telmisartan: Formulation and In Vitro Evaluation",
      authors: ["Ashwin Singh Chouhan", "R. K. Sharma", "P. Mishra"],
      year: BigInt(2023),
      journal: "Journal of Pharmaceutical Sciences",
      doi: "10.1016/j.pharmsci.2023.04.012",
      abstract:
        "Solid lipid nanoparticles (SLNs) loaded with telmisartan were prepared using high-pressure homogenization. Formulations were characterized for particle size, zeta potential, entrapment efficiency, and in vitro drug release.",
      imageUrl: undefined,
      createdAt: BigInt(Date.now() - 172800000) * BigInt(1000000),
    },
    {
      id: BigInt(2),
      title:
        "Anti-Diabetic Activity of Morinda citrifolia Fruit Extract: In Vitro and In Vivo Studies",
      authors: ["Ashwin Singh Chouhan", "S. Tiwari", "A. Dubey"],
      year: BigInt(2024),
      journal: "Phytomedicine",
      doi: "10.1016/j.phymed.2024.01.008",
      abstract:
        "The present study evaluated the anti-diabetic potential of standardized ethanolic extract of Morinda citrifolia fruits. Results indicated significant blood glucose reduction and improved insulin sensitivity.",
      imageUrl: undefined,
      createdAt: BigInt(Date.now() - 86400000) * BigInt(1000000),
    },
  ],

  getNotes: async () => [
    {
      id: BigInt(1),
      title: "Key Concepts in Biopharmaceutics Classification System (BCS)",
      content:
        "The BCS classifies drugs into four classes based on solubility and permeability:\n- Class I: High solubility, High permeability\n- Class II: Low solubility, High permeability\n- Class III: High solubility, Low permeability\n- Class IV: Low solubility, Low permeability",
      fileUrl: undefined,
      fileName: undefined,
      createdAt: BigInt(Date.now() - 86400000) * BigInt(1000000),
    },
  ],

  getContactSubmissions: async (_token: string) => ({
    __kind__: "ok" as const,
    ok: [
      {
        id: BigInt(1),
        name: "Test User",
        email: "test@example.com",
        message: "Hello Dr. Chouhan, I am interested in your research on drug delivery systems.",
        submittedAt: BigInt(Date.now() - 3600000) * BigInt(1000000),
        isRead: false,
      },
    ],
  }),

  submitContact: stub,
  markContactRead: stub,

  // ── CRUD ──
  createResearch: stub,
  updateResearch: stub,
  deleteResearch: stub,
  createArticle: stub,
  updateArticle: stub,
  deleteArticle: stub,
  createPublication: stub,
  updatePublication: stub,
  deletePublication: stub,
  createNote: stub,
  updateNote: stub,
  deleteNote: stub,

  // ── PDF methods ──
  uploadPdf: async (_token, fileName, _contentType, fileId) => ({
    __kind__: "ok" as const,
    ok: { fileId, url: `https://mock-cdn.example.com/${fileId}` },
  }),
  deletePdf: stub,
  getPdfUrl: async (_fileId) => ({
    __kind__: "ok" as const,
    ok: "https://mock-cdn.example.com/sample.pdf",
  }),

  // ── WithPdf variants ──
  createResearchWithPdf: stub,
  updateResearchWithPdf: stub,
  createArticleWithPdf: stub,
  updateArticleWithPdf: stub,
  createPublicationWithPdf: stub,
  updatePublicationWithPdf: stub,

  // ── Object storage internal (required by interface from backend.ts) ──
  _immutableObjectStorageBlobsAreLive: stubArr,
  _immutableObjectStorageBlobsToDelete: stubArr,
  _immutableObjectStorageConfirmBlobDeletion: stub,
  _immutableObjectStorageCreateCertificate: stub,
  _immutableObjectStorageRefillCashier: stub,
  _immutableObjectStorageUpdateGatewayPrincipals: stub,
};
