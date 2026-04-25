import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import ContentTypes "types/content";
import ContactTypes "types/contact";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import AuthMixin "mixins/auth-api";
import ContentMixin "mixins/content-api";
import ContactMixin "mixins/contact-api";
import ContentPdfMixin "mixins/content-pdf-extension-api";
import PdfMixin "mixins/pdf-api";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Auth state
  let sessions = Map.empty<Text, Int>();

  // Content state
  let researches = List.empty<ContentTypes.Research>();
  let articles = List.empty<ContentTypes.Article>();
  let publications = List.empty<ContentTypes.Publication>();
  let notes = List.empty<ContentTypes.Note>();

  // PDF metadata: fileId -> { fileName, contentType, url, registeredAt }
  let pdfFiles = Map.empty<Text, { fileName : Text; contentType : Text; url : Text; registeredAt : Int }>();

  // Contact state
  let submissions = List.empty<ContactTypes.ContactSubmission>();

  // --- Sample content seeding (runs once on init) ---
  let t0 = Time.now();
  let t1 = t0 - 86_400_000_000_000;   // 1 day ago
  let t2 = t0 - 172_800_000_000_000;  // 2 days ago

  // Seed researches
  researches.add({
    id = 1;
    title = "Novel Drug Delivery Systems for Anti-Hypertensive Agents";
    summary = "Investigating nanoparticle-based delivery to improve bioavailability of anti-hypertensive drugs.";
    description = "This research explores lipid nanoparticle formulations for improved systemic delivery of amlodipine and telmisartan, demonstrating enhanced bioavailability and sustained release profiles in preclinical studies.";
    tags = ["Drug Delivery", "Nanoparticles", "Hypertension", "Pharmacokinetics"];
    imageUrl = null;
    date = "2024-03-15";
    pdfFileId = null;
    pdfFileName = null;
    pdfUrl = null;
    createdAt = t2;
  });

  researches.add({
    id = 2;
    title = "Phytochemical Analysis of Medicinal Plants in Central India";
    summary = "Screening bioactive compounds in traditional medicinal plants for anti-diabetic properties.";
    description = "A comprehensive phytochemical screening of 12 medicinal plant species commonly used in traditional Ayurvedic medicine, evaluating their anti-diabetic, antioxidant, and anti-inflammatory potential.";
    tags = ["Phytochemistry", "Traditional Medicine", "Diabetes", "Antioxidants"];
    imageUrl = null;
    date = "2024-06-20";
    pdfFileId = null;
    pdfFileName = null;
    pdfUrl = null;
    createdAt = t1;
  });

  // Seed articles
  articles.add({
    id = 1;
    title = "Understanding Pharmacokinetics: A Beginner's Guide";
    excerpt = "A concise overview of how drugs move through the human body — absorption, distribution, metabolism, and excretion.";
    content = "Pharmacokinetics (PK) is the study of drug movement within a biological system. The four fundamental processes — ADME (Absorption, Distribution, Metabolism, and Excretion) — determine a drug's concentration-time profile. Understanding PK principles is essential for rational drug design and optimal therapeutic outcomes.";
    category = "Education";
    tags = ["Pharmacokinetics", "ADME", "Drug Design"];
    date = "2024-04-10";
    pdfFileId = null;
    pdfFileName = null;
    pdfUrl = null;
    createdAt = t2;
  });

  articles.add({
    id = 2;
    title = "The Role of Nanotechnology in Modern Therapeutics";
    excerpt = "How nanoparticle platforms are transforming drug delivery and enabling targeted cancer therapies.";
    content = "Nanotechnology has opened new horizons in pharmaceutical sciences. Nanocarriers such as liposomes, polymeric nanoparticles, dendrimers, and solid lipid nanoparticles offer unique advantages including targeted delivery, controlled release, and improved solubility for poorly water-soluble drugs. This article reviews recent advances and clinical translations.";
    category = "Research";
    tags = ["Nanotechnology", "Drug Delivery", "Cancer", "Therapeutics"];
    date = "2024-07-05";
    pdfFileId = null;
    pdfFileName = null;
    pdfUrl = null;
    createdAt = t1;
  });

  // Seed publications
  publications.add({
    id = 1;
    title = "Lipid Nanoparticles for Oral Delivery of Telmisartan: Formulation and In Vitro Evaluation";
    authors = ["Ashwin Singh Chouhan", "R. K. Sharma", "P. Mishra"];
    year = 2023;
    journal = "Journal of Pharmaceutical Sciences";
    doi = ?"10.1016/j.pharmsci.2023.04.012";
    abstract = "Solid lipid nanoparticles (SLNs) loaded with telmisartan were prepared using high-pressure homogenization. Formulations were characterized for particle size, zeta potential, entrapment efficiency, and in vitro drug release. The optimized SLN formulation showed significantly enhanced dissolution and permeability compared to pure drug suspension.";
    imageUrl = null;
    pdfFileId = null;
    pdfFileName = null;
    pdfUrl = null;
    createdAt = t2;
  });

  publications.add({
    id = 2;
    title = "Anti-Diabetic Activity of Morinda citrifolia Fruit Extract: In Vitro and In Vivo Studies";
    authors = ["Ashwin Singh Chouhan", "S. Tiwari", "A. Dubey"];
    year = 2024;
    journal = "Phytomedicine";
    doi = ?"10.1016/j.phymed.2024.01.008";
    abstract = "The present study evaluated the anti-diabetic potential of standardized ethanolic extract of Morinda citrifolia fruits. Alpha-glucosidase inhibitory activity and STZ-induced diabetic rat models were employed. Results indicated significant blood glucose reduction and improved insulin sensitivity.";
    imageUrl = null;
    pdfFileId = null;
    pdfFileName = null;
    pdfUrl = null;
    createdAt = t1;
  });

  // Seed notes
  notes.add({
    id = 1;
    title = "Key Concepts in Biopharmaceutics Classification System (BCS)";
    content = "The BCS classifies drugs into four classes based on solubility and permeability:\n- Class I: High solubility, High permeability (e.g., Metoprolol)\n- Class II: Low solubility, High permeability (e.g., Ibuprofen)\n- Class III: High solubility, Low permeability (e.g., Atenolol)\n- Class IV: Low solubility, Low permeability (e.g., Furosemide)\n\nBCS guides formulation strategy and biowaivers for generic drug approval.";
    fileUrl = null;
    fileName = null;
    pdfFileId = null;
    pdfFileName = null;
    pdfUrl = null;
    createdAt = t1;
  });

  // Mixin composition
  include MixinObjectStorage();
  include AuthMixin(sessions);
  include ContentMixin(sessions, researches, articles, publications, notes);
  include ContactMixin(sessions, submissions);
  include ContentPdfMixin(sessions, researches, articles, publications);
  include PdfMixin(sessions, pdfFiles);
};
