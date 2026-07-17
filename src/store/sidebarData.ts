// sidebarData.ts
// Static data for sidebar panels: projects, architectures, skills, timeline.

export interface ProjectData {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  metrics?: string[];
  githubUrl: string;
  demoUrl?: string;
}

export interface ArchitectureData {
  id: string;
  title: string;
  mermaid: string;
}

export interface SkillDomain {
  id: string;
  title: string;
  emoji: string;
  skills: { name: string; usedIn: string[] }[];
}

// ─── PROJECT DATA ──────────────────────────────────────────────────────────
export const projectsData: Record<string, ProjectData> = {
  lexai: {
    id: "lexai",
    title: "LexAI — Legal Intelligence Platform",
    emoji: "⚖️",
    tagline: "Full-Stack Legal AI · Flutter + React + FastAPI + GCP",
    description:
      "A production-grade Legal AI platform indexing 26,274 Supreme Court judgments. Features a Hybrid RAG pipeline for high-precision precedent retrieval, with Flutter mobile and React web clients deployed on Firebase and a Docker-containerized FastAPI backend on Google Cloud Run.",
    problem:
      "Legal professionals need to search through tens of thousands of court judgments to find relevant precedents — keyword search misses semantically relevant cases and single-modality retrieval fails precision requirements for legal workflows.",
    solution:
      "Hybrid RAG pipeline combining BM25 (SQLite FTS5), FAISS dense retrieval, PageRank graph ranking, and Weighted Reciprocal Rank Fusion. Secure REST and WebSocket APIs via FastAPI, SQLite WAL mode for concurrent access, Docker containerization on Google Cloud Run, Firebase-hosted web + Flutter mobile clients.",
    techStack: [
      "Python",
      "FastAPI",
      "Flutter",
      "React",
      "FAISS",
      "BM25/SQLite FTS5",
      "PageRank",
      "Docker",
      "Google Cloud Run",
      "Firebase Hosting",
      "WebSockets",
    ],
    metrics: [
      "26,274 Supreme Court Judgments Indexed",
      "Hybrid BM25 + FAISS + PageRank + WRRF Pipeline",
      "Live Web: lexai-3fd1a.web.app",
      "Flutter Mobile + React Web Clients",
      "Docker on GCP Cloud Run",
    ],
    githubUrl: "https://github.com/Ayush99392003/Legal_AI_Backend-",
    demoUrl: "https://lexai-3fd1a.web.app",
  },

  prescription: {
    id: "prescription",
    title: "PRESCRIPTION — AI Voice Medical Assistant",
    emoji: "🏥",
    tagline: "Voice AI · Whisper + Groq + FastAPI + Docker",
    description:
      "An AI-powered voice medical assistant that converts doctor consultations into structured digital prescriptions. Integrates Faster-Whisper for speech recognition, LLM-based medical entity extraction, fuzzy medicine matching across 30,000+ Indian medicines, and generates printable PDF prescriptions.",
    problem:
      "Doctors spend significant time writing prescriptions manually after consultations. Transcribing verbal consultations into structured digital prescriptions is error-prone and time-consuming.",
    solution:
      "End-to-end voice pipeline: Faster-Whisper speech recognition → LLM medical entity extraction → RapidFuzz matching across 30,000+ Indian medicines → structured PDF generation. FastAPI backend, Docker containerization, and a comprehensive PyTest suite for validation.",
    techStack: [
      "Python",
      "FastAPI",
      "Faster-Whisper",
      "Groq LLM",
      "RapidFuzz",
      "Docker",
      "PyTest",
      "PDF Generation",
    ],
    metrics: [
      "30,000+ Indian Medicines Database",
      "Voice → Structured Prescription Pipeline",
      "Live Demo on Hugging Face Spaces",
      "Full PyTest Validation Suite",
    ],
    githubUrl: "https://github.com/Ayush99392003",
    demoUrl: "https://huggingface.co/spaces",
  },

  fiducia: {
    id: "fiducia",
    title: "Fiducia — Neuro-Symbolic Damage Claim Predictor",
    emoji: "🛡️",
    tagline: "AI Orchestration · Azure OpenAI + Pydantic + Arize Phoenix",
    description:
      "A highly optimized, neuro-symbolic damage claims verification system built for the HackerRank Orchestrate hackathon. Features the Strategy Smart orchestrator that balances latency and costs by routing claims based on user history.",
    problem:
      "Processing insurance claims with reasoning prompts (CoT) for every user results in high latency and API cost. Zero-shot direct extraction is faster but suffers from hallucinations on high-risk/complex claims.",
    solution:
      "An intent-based Symbolic Router: Low-risk users go through Fast Path (Strategy A: Zero-shot Direct Pydantic extraction). High-risk users go through Reasoning Path (Strategy B: 4-step Chain-of-Thought reasoning scratchpad). Enforces semantic guardrails inside Pydantic field descriptions.",
    techStack: [
      "Python",
      "Azure OpenAI",
      "Pydantic",
      "OpenTelemetry",
      "Arize Phoenix",
      "Rich",
      "uv",
    ],
    metrics: [
      "93.8% Average Partial Score on evaluation set",
      "Dynamic Router (Direct vs Chain-of-Thought)",
      "3x Token Savings on Direct Path",
      "Full OpenTelemetry observability traces",
    ],
    githubUrl: "https://github.com/Ayush99392003/Fiducia",
  },

  video_detection: {
    id: "video_detection",
    title: "Video Manipulation Detection System",
    emoji: "🎥",
    tagline: "Computer Vision · PyTorch + Hugging Face + OpenCV + Streamlit",
    description:
      "An AI-powered video analysis pipeline designed to detect visual tampering, object inconsistencies, and motion anomalies using object detection models and optical flow.",
    problem:
      "Detecting deepfakes or edited videos requires identifying both frame-level inconsistencies (such as changes in object count) and temporal motion anomalies that are invisible to the naked eye.",
    solution:
      "OpenCV frame extraction -> Facebook DETR ResNet50 object detection via Hugging Face -> Optical Flow calculation for motion anomalies -> JSON report generation. Visualized via an interactive Streamlit UI.",
    techStack: [
      "Python",
      "PyTorch",
      "Transformers",
      "OpenCV",
      "Streamlit",
      "FFmpeg",
      "Matplotlib",
    ],
    metrics: [
      "Frame-by-frame object count consistency analysis",
      "Optical flow motion spike detection",
      "Authenticity rating based on TAM (Tamper) scores",
    ],
    githubUrl: "https://github.com/Ayush99392003/Video_MAnipulation_Detection",
  },

  hybrid_rag: {
    id: "hybrid_rag",
    title: "Hybrid Legal RAG",
    emoji: "⚡",
    tagline: "Sparse-Dense-Graph Retrieval System",
    description:
      "A production-grade retrieval-augmented generation system combining three retrieval modalities — sparse (BM25/FTS5), dense (FAISS + MPNet), and graph-based (PageRank) — unified with Reciprocal Rank Fusion.",
    problem:
      "Legal document search using simple keyword matching misses semantically relevant results. Single-modality retrieval systems suffer from precision-recall trade-offs that hurt legal workflows.",
    solution:
      "Fuse BM25 sparse retrieval, MPNet dense embeddings (FAISS), and PageRank authority scoring using Reciprocal Rank Fusion. This captures keyword matches, semantic similarity, AND document importance simultaneously.",
    techStack: [
      "Python",
      "FastAPI",
      "FAISS",
      "BM25/SQLite FTS5",
      "MPNet",
      "PageRank",
      "Docker",
      "Pydantic",
    ],
    metrics: [
      "82.4% Top-1 Accuracy",
      "NDCG@10 = 0.89",
      "26,000+ Documents Indexed",
      "Real-time Search + Conversational Querying",
    ],
    githubUrl: "https://github.com/Ayush99392003/Legal_AI_Backend-",
  },

  polarbrief: {
    id: "polarbrief",
    title: "PolarBrief AI",
    emoji: "📄",
    tagline: "Legal Argument Analyzer",
    description:
      "An AI-powered document analysis tool that extracts, classifies, and scores arguments from unstructured legal PDF briefs. Outputs structured polarity reports with weighted argument rankings.",
    problem:
      "Legal professionals spend hours manually reading briefs to identify key arguments and their strengths. Unstructured PDFs with mixed content (tables, scanned pages) make automation challenging.",
    solution:
      "Hybrid OCR (Tesseract) + PDF parser for robust extraction, TF-IDF scoring for argument weighting, and LangChain LLMs for semantic classification and structured summarization. Interactive Streamlit UI for real-time report generation.",
    techStack: [
      "Python",
      "LangChain",
      "Tesseract OCR",
      "TF-IDF",
      "Streamlit",
      "Pydantic",
      "PyPDF2",
    ],
    githubUrl: "https://github.com/Ayush99392003/PolarBrief",
  },

  knowledge_graph: {
    id: "knowledge_graph",
    title: "Legal Knowledge Graph Pipeline",
    emoji: "🕸️",
    tagline: "Document Intelligence via Entity Graphs",
    description:
      "An end-to-end NLP pipeline that transforms unstructured legal PDFs into canonical knowledge graphs using OCR, spaCy NER, RapidFuzz, and NetworkX.",
    problem:
      "Legal cases contain thousands of entities (people, organizations, statutes, events) with complex relationships that are invisible in raw text format.",
    solution:
      "Multi-stage pipeline: OCR → text cleaning → spaCy NER → LLM entity-relation extraction → deterministic ID mapping → RapidFuzz cross-chunk entity resolution → NetworkX graph construction and PyVis visualization.",
    techStack: [
      "Python",
      "spaCy",
      "NetworkX",
      "PyVis",
      "RapidFuzz",
      "Tesseract OCR",
      "LLMs",
    ],
    githubUrl:
      "https://github.com/Ayush99392003/knowledge_graph_legal_cases",
  },

  wesad: {
    id: "wesad",
    title: "WESAD Emotion Recognition",
    emoji: "🧠",
    tagline: "Multimodal Physiological Signal Classification",
    description:
      "Comprehensive implementation and benchmarking of classical ML models for stress/emotion classification from multimodal wearable sensor data.",
    problem:
      "Understanding human emotional states from physiological signals requires handling multiple sensor modalities with different sampling rates, noise profiles, and information densities.",
    solution:
      "Systematic evaluation of LDA, Random Forest, Decision Tree, AdaBoost, and KNN across all sensor combinations (chest vs wrist vs combined) with cross-validation pipelines.",
    techStack: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
    ],
    metrics: [
      "7 Sensor Modalities Evaluated",
      "5 ML Algorithms Benchmarked",
      "Chest + Wrist + Combined Experiments",
      "ECG, EDA, EMG, BVP, ACC, Temp, Respiration",
    ],
    githubUrl:
      "https://github.com/Ayush99392003/WESAD_Multimodal_Emotion_Recognition",
  },

  constitution_companion: {
    id: "constitution_companion",
    title: "Constitution Companion",
    emoji: "📜",
    tagline: "AI-Powered Constitutional Law Guide",
    description:
      "A conversational AI system that makes the Indian Constitution accessible and navigable through natural language queries.",
    problem:
      "The Indian Constitution is a complex, dense document with 448 articles, 12 schedules, and numerous amendments — intimidating for citizens without legal training.",
    solution:
      "RAG-based conversational interface that ingests the full Constitution, allowing natural language queries to retrieve precise articles, explanations, and cross-references.",
    techStack: ["Python", "LLMs", "RAG", "Vector Store"],
    githubUrl: "https://github.com/Ayush99392003/Constitution-Companion",
  },

  simhastha: {
    id: "simhastha",
    title: "Simhastha",
    emoji: "🌐",
    tagline: "AI-Powered Kumbh Mela Guide",
    description:
      "An intelligent application built to serve millions of pilgrims attending the Simhastha Kumbh Mela with real-time information, navigation, and AI-assisted guidance.",
    problem:
      "Simhastha Kumbh Mela hosts millions of pilgrims across a large geographic area. Finding ghats, events, and services in real-time without local knowledge is challenging.",
    solution:
      "AI-powered information retrieval and navigation system with domain-specific knowledge base about the event, locations, schedules, and cultural context.",
    techStack: ["Python", "AI/LLMs", "Backend APIs"],
    githubUrl: "https://github.com/Ayush99392003/Simhastha",
  },
};

// ─── ARCHITECTURE MERMAID GRAPHS ──────────────────────────────────────────
export const architecturesData: Record<string, ArchitectureData> = {
  lexai: {
    id: "lexai",
    title: "LexAI — Full-Stack Legal AI Architecture",
    mermaid: `flowchart TD
    A[User Query] --> B[FastAPI Backend]
    B --> C[BM25 / SQLite FTS5\\nSparse Retrieval]
    B --> D[FAISS Dense Retrieval\\nEmbeddings]
    B --> E[PageRank\\nGraph Ranking]
    C --> F[Weighted RRF Fusion]
    D --> F
    E --> F
    F --> G[Top-K Re-ranked Judgments]
    G --> H[LLM Context Assembly]
    H --> I[Streaming Response]
    I --> J[React Web Client]
    I --> K[Flutter Mobile Client]

    style A fill:#4F46E5,color:#fff
    style F fill:#06B6D4,color:#fff
    style J fill:#4F46E5,color:#fff
    style K fill:#7C3AED,color:#fff`,
  },

  prescription: {
    id: "prescription",
    title: "PRESCRIPTION — Voice Medical AI Pipeline",
    mermaid: `flowchart TD
    A[Doctor Voice Input] --> B[Faster-Whisper ASR]
    B --> C[Transcript Text]
    C --> D[Groq LLM\\nMedical Entity Extraction]
    D --> E[Medicine Name\\nExtracted]
    E --> F[RapidFuzz Matching\\n30000+ Indian Medicines DB]
    F --> G[Matched Medicine\\nDosage + Frequency]
    G --> H[Structured Prescription JSON]
    H --> I[PDF Generation]
    H --> J[FastAPI Response]
    I --> K[Printable Prescription]

    style A fill:#4F46E5,color:#fff
    style F fill:#06B6D4,color:#fff
    style K fill:#4F46E5,color:#fff`,
  },

  fiducia: {
    id: "fiducia",
    title: "Fiducia — Neuro-Symbolic Claim Verifier",
    mermaid: `flowchart TD
    A[Incoming Claim & Image] --> B[Symbolic Router]
    B -->|Low Risk\\n0 Claims| C[Strategy A: Direct JSON]
    B -->|High Risk\\nClaims > 0| D[Strategy B: Chain-of-Thought]
    C --> E[Pydantic Validation]
    D -->|4-step reasoning scratchpad| E
    E --> F[Semantic Guardrails]
    F --> G[Final Verified Claim Output]

    style A fill:#4F46E5,color:#fff
    style B fill:#06B6D4,color:#fff
    style G fill:#4F46E5,color:#fff`,
  },

  video_detection: {
    id: "video_detection",
    title: "Video Manipulation Detection Pipeline",
    mermaid: `flowchart TD
    A[Upload Video] --> B[OpenCV Frame Extraction]
    B --> C[DETR ResNet50 Object Detection]
    B --> D[Optical Flow Motion Analysis]
    C --> E[Anomaly Scoring & Verification]
    D --> E
    E --> F[Structured JSON Report]
    F --> G[Streamlit UI Visualization]

    style A fill:#4F46E5,color:#fff
    style E fill:#06B6D4,color:#fff
    style G fill:#4F46E5,color:#fff`,
  },

  hybrid_rag: {
    id: "hybrid_rag",
    title: "Hybrid Legal RAG Architecture",
    mermaid: `flowchart TD
    A[User Query] --> B[Query Processing Layer]
    B --> C[BM25 / FTSS Sparse Retrieval]
    B --> D[FAISS Dense Retrieval\\nMPNet Embeddings]
    B --> E[Graph-Based Ranking\\nPageRank Scores]
    C --> F[Reciprocal Rank Fusion]
    D --> F
    E --> F
    F --> G[Top-K Re-ranked Documents]
    G --> H[LLM Context Assembly]
    H --> I[FastAPI Response]
    I --> J[Conversational Answer]

    style A fill:#4F46E5,color:#fff
    style F fill:#06B6D4,color:#fff
    style J fill:#4F46E5,color:#fff`,
  },

  polarbrief: {
    id: "polarbrief",
    title: "PolarBrief AI Pipeline",
    mermaid: `flowchart TD
    A[PDF Upload] --> B{Has Text Layer?}
    B -->|Yes| C[PyPDF2 Extraction]
    B -->|No| D[Tesseract OCR]
    C --> E[Text Cleaning & Chunking]
    D --> E
    E --> F[TF-IDF Scoring]
    E --> G[LangChain LLM Analysis]
    F --> H[Argument Weighting]
    G --> H
    H --> I[Polarity Classification\\nPro / Con / Neutral]
    I --> J[Structured JSON Report]
    J --> K[Streamlit UI Visualization]

    style A fill:#4F46E5,color:#fff
    style I fill:#06B6D4,color:#fff
    style K fill:#4F46E5,color:#fff`,
  },

  knowledge_graph: {
    id: "knowledge_graph",
    title: "Knowledge Graph Pipeline",
    mermaid: `flowchart TD
    A[Raw Documents] --> B[OCR Layer\\nTesseract]
    B --> C[Text Cleaning & Normalization]
    C --> D[Semantic Chunking]
    D --> E[spaCy NER\\nEntity Extraction]
    D --> F[LLM Relation Extraction]
    E --> G[Deterministic ID Mapping]
    F --> G
    G --> H[RapidFuzz Cross-Chunk\\nEntity Resolution]
    H --> I[Graph Construction\\nNetworkX]
    I --> J[PyVis Visualization\\nInteractive Explorer]

    style A fill:#4F46E5,color:#fff
    style H fill:#06B6D4,color:#fff
    style J fill:#4F46E5,color:#fff`,
  },
};

// ─── SKILLS DATA ───────────────────────────────────────────────────────────
export const skillsData: Record<string, SkillDomain> = {
  ai: {
    id: "ai",
    title: "AI & Machine Learning",
    emoji: "🤖",
    skills: [
      { name: "Python", usedIn: ["All Projects"] },
      { name: "LLMs & Prompt Engineering", usedIn: ["LexAI", "PolarBrief", "Hybrid RAG", "PRESCRIPTION", "Fiducia"] },
      { name: "RAG Systems", usedIn: ["LexAI", "Hybrid Legal RAG", "Constitution Companion"] },
      { name: "Multi-Agent Systems (MCP)", usedIn: ["Docu3C Internship"] },
      { name: "LangChain", usedIn: ["PolarBrief"] },
      { name: "Instructor / Pydantic", usedIn: ["Docu3C Internship", "Hybrid RAG", "Fiducia"] },
      { name: "spaCy / NLP", usedIn: ["Knowledge Graph", "PRESCRIPTION"] },
      { name: "Scikit-learn", usedIn: ["WESAD Emotion Recognition"] },
      { name: "FAISS / Vector DBs", usedIn: ["LexAI", "Hybrid Legal RAG"] },
      { name: "Faster-Whisper / ASR", usedIn: ["PRESCRIPTION"] },
      { name: "RapidFuzz", usedIn: ["PRESCRIPTION", "Knowledge Graph"] },
      { name: "PyTorch / DETR (Vision)", usedIn: ["Video Detection"] },
      { name: "Optical Flow / OpenCV", usedIn: ["Video Detection"] },
    ],
  },
  backend: {
    id: "backend",
    title: "Backend & APIs",
    emoji: "⚙️",
    skills: [
      { name: "FastAPI", usedIn: ["LexAI", "PRESCRIPTION", "Hybrid Legal RAG", "Docu3C"] },
      { name: "WebSockets & SSE", usedIn: ["LexAI", "Docu3C Internship"] },
      { name: "Async Python", usedIn: ["LexAI", "Hybrid RAG", "Docu3C"] },
      { name: "REST API Design", usedIn: ["All Projects"] },
      { name: "SQLAlchemy", usedIn: ["Docu3C Internship"] },
      { name: "SQLite FTS5 / BM25", usedIn: ["LexAI", "Hybrid Legal RAG"] },
      { name: "PostgreSQL / Firestore", usedIn: ["LexAI"] },
      { name: "Azure CosmosDB", usedIn: ["Docu3C Internship"] },
      { name: "PyTest", usedIn: ["PRESCRIPTION"] },
    ],
  },
  cloud: {
    id: "cloud",
    title: "Cloud & DevOps",
    emoji: "☁️",
    skills: [
      { name: "Google Cloud Run", usedIn: ["LexAI"] },
      { name: "Firebase Hosting", usedIn: ["LexAI"] },
      { name: "Cloud Build", usedIn: ["LexAI"] },
      { name: "Microsoft Azure", usedIn: ["Docu3C Internship", "Fiducia"] },
      { name: "Docker", usedIn: ["LexAI", "PRESCRIPTION", "Hybrid Legal RAG"] },
      { name: "Azure Blob Storage", usedIn: ["Docu3C Internship"] },
      { name: "OpenTelemetry", usedIn: ["Docu3C Internship", "Fiducia"] },
      { name: "Arize Phoenix", usedIn: ["Docu3C Internship", "Fiducia"] },
      { name: "uv (Package Manager)", usedIn: ["All Python Projects"] },
      { name: "Ruff / PEP8", usedIn: ["All Python Projects"] },
    ],
  },
  frontend: {
    id: "frontend",
    title: "Frontend",
    emoji: "🎨",
    skills: [
      { name: "Flutter (Mobile)", usedIn: ["LexAI Mobile Client"] },
      { name: "React / Next.js", usedIn: ["LexAI Web", "Docu3C Internship", "This Portfolio"] },
      { name: "TypeScript", usedIn: ["Docu3C Internship", "This Portfolio"] },
      { name: "Tailwind CSS", usedIn: ["Docu3C Internship", "This Portfolio"] },
      { name: "Streamlit", usedIn: ["PolarBrief", "Docu3C Internship", "Video Detection"] },
      { name: "Framer Motion", usedIn: ["This Portfolio"] },
    ],
  },
};

// ─── LEARNING TIMELINE ─────────────────────────────────────────────────────
export const timelineData = [
  {
    year: "2023",
    title: "Foundation",
    emoji: "🐍",
    items: [
      "Started B.Tech CSE @ VIT Bhopal",
      "Learned Python fundamentals",
      "First algorithms and data structures",
      "Solved initial LeetCode problems",
    ],
  },
  {
    year: "2024",
    title: "Machine Learning",
    emoji: "🤖",
    items: [
      "Deep dive into ML: Scikit-learn, Pandas, NumPy",
      "WESAD Multimodal Emotion Recognition project",
      "Google Cloud GenAI certifications (3 certs)",
      "First LLM experiments with Vertex AI",
      "NLP pipelines and spaCy",
    ],
  },
  {
    year: "2025",
    title: "Production AI Systems",
    emoji: "⚡",
    items: [
      "Built LexAI — Full-Stack Legal AI Platform on GCP",
      "PRESCRIPTION — AI Voice Medical Assistant",
      "Hybrid Legal RAG (BM25 + FAISS + PageRank)",
      "PolarBrief AI and Knowledge Graph Pipeline",
      "AI Software Engineer Intern @ Docu3C Technologies",
      "Azure ecosystem: CosmosDB, Blob Storage, ML",
      "Microsoft Azure Data Fundamentals certified",
      "NPTEL Machine Learning certification",
      "FastAPI + WebSockets + SSE + Docker",
    ],
  },
  {
    year: "2026",
    title: "Agentic AI & Orchestration",
    emoji: "🧠",
    items: [
      "Deep into Multi-Agent Systems with MCP",
      "60% reduction in manual document review at Docu3C",
      "ServiceNow agentic workflow integrations",
      "OpenTelemetry + Arize Phoenix observability",
      "Instructor / Pydantic for structured LLM outputs",
      "Flutter mobile development (LexAI mobile client)",
      "125+ LeetCode problems solved",
      "Top 25 team — Mahakumbh Hackathon",
    ],
  },
];

// ─── LINKEDIN POSTS (Placeholder) ──────────────────────────────────────────
export const linkedinPosts = [
  {
    id: "post_1",
    date: "Jun 2025",
    content:
      "Just shipped LexAI — a production Legal AI platform indexing 26,274 Supreme Court judgments. Hybrid RAG: BM25 + FAISS + PageRank + Weighted RRF. Flutter mobile + React web on Firebase. Backend on GCP Cloud Run 🚀",
    url: "https://www.linkedin.com/in/ayush20039939",
    likes: "🔥 Trending",
  },
  {
    id: "post_2",
    date: "May 2025",
    content:
      "Built PRESCRIPTION — an AI voice assistant that turns doctor consultations into structured digital prescriptions. Faster-Whisper + Groq LLM + RapidFuzz across 30K+ Indian medicines. Live on Hugging Face Spaces.",
    url: "https://www.linkedin.com/in/ayush20039939",
    likes: null,
  },
  {
    id: "post_3",
    date: "Apr 2025",
    content:
      "Building in the Azure AI ecosystem taught me one thing: structured outputs are not optional in production. Pydantic + Instructor = LLM outputs you can actually trust at scale.",
    url: "https://www.linkedin.com/in/ayush20039939",
    likes: null,
  },
  {
    id: "post_4",
    date: "Mar 2025",
    content:
      "MCP (Model Context Protocol) is going to fundamentally change how we build agentic AI applications. Reduced manual financial document review by 60% using tool-calling architectures at Docu3C.",
    url: "https://www.linkedin.com/in/ayush20039939",
    likes: null,
  },
];
