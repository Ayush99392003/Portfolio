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
  hybrid_rag: {
    id: "hybrid_rag",
    title: "Hybrid Legal RAG",
    emoji: "⚡",
    tagline: "Sparse-Dense-Graph Retrieval System",
    description:
      "A production-grade retrieval-augmented generation system combining three retrieval modalities — sparse (BM25/FTSS), dense (FAISS + MPNet), and graph-based (PageRank) — unified with Reciprocal Rank Fusion.",
    problem:
      "Legal document search using simple keyword matching misses semantically relevant results. Single-modality retrieval systems suffer from precision-recall trade-offs that hurt legal workflows.",
    solution:
      "Fuse BM25 sparse retrieval, MPNet dense embeddings (FAISS), and PageRank authority scoring using Reciprocal Rank Fusion. This captures keyword matches, semantic similarity, AND document importance simultaneously.",
    techStack: [
      "Python",
      "FastAPI",
      "FAISS",
      "BM25/SQLite FTSS",
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
    title: "Knowledge Graph Pipeline",
    emoji: "🕸️",
    tagline: "Document Intelligence via Entity Graphs",
    description:
      "An end-to-end pipeline that transforms unstructured legal case documents into interactive, navigable knowledge graphs through multi-stage NLP and LLM processing.",
    problem:
      "Legal cases contain thousands of entities (people, organizations, statutes, events) with complex relationships that are invisible in raw text format.",
    solution:
      "Multi-stage pipeline: OCR → text cleaning → semantic chunking → LLM-based entity-relation extraction → deterministic ID mapping → fuzzy cross-chunk entity resolution → graph construction and visualization.",
    techStack: [
      "Python",
      "NetworkX",
      "PyVis",
      "LLMs",
      "spaCy",
      "Tesseract OCR",
      "FuzzyWuzzy",
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
    emoji: "⚖️",
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
    D --> E[LLM Entity Extraction]
    D --> F[LLM Relation Extraction]
    E --> G[Deterministic ID Mapping]
    F --> G
    G --> H[Cross-Chunk Fuzzy Matching\\nEntity Resolution]
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
      { name: "LLMs & Prompt Engineering", usedIn: ["PolarBrief", "Hybrid RAG", "Knowledge Graph"] },
      { name: "RAG Systems", usedIn: ["Hybrid Legal RAG", "Constitution Companion"] },
      { name: "Multi-Agent Systems (MCP)", usedIn: ["Docu3C Internship"] },
      { name: "LangChain", usedIn: ["PolarBrief"] },
      { name: "Instructor / Pydantic", usedIn: ["Docu3C Internship", "Hybrid RAG"] },
      { name: "NLP / spaCy / NLTK", usedIn: ["Knowledge Graph"] },
      { name: "Scikit-learn", usedIn: ["WESAD Emotion Recognition"] },
      { name: "FAISS / Vector DBs", usedIn: ["Hybrid Legal RAG"] },
    ],
  },
  backend: {
    id: "backend",
    title: "Backend & APIs",
    emoji: "⚙️",
    skills: [
      { name: "FastAPI", usedIn: ["Hybrid Legal RAG", "Docu3C"] },
      { name: "WebSockets & SSE", usedIn: ["Docu3C Internship"] },
      { name: "Async Python", usedIn: ["Hybrid RAG", "Docu3C"] },
      { name: "REST API Design", usedIn: ["All Projects"] },
      { name: "OAuth 2.0 / MSAL", usedIn: ["Docu3C Internship"] },
      { name: "SQLite / BM25 FTSS", usedIn: ["Hybrid Legal RAG"] },
      { name: "Azure CosmosDB", usedIn: ["Docu3C Internship"] },
    ],
  },
  cloud: {
    id: "cloud",
    title: "Cloud & DevOps",
    emoji: "☁️",
    skills: [
      { name: "Microsoft Azure", usedIn: ["Docu3C Internship"] },
      { name: "Docker", usedIn: ["Hybrid Legal RAG"] },
      { name: "Azure Blob Storage", usedIn: ["Docu3C Internship"] },
      { name: "OpenTelemetry", usedIn: ["Docu3C Internship"] },
      { name: "Arize Phoenix", usedIn: ["Docu3C Internship"] },
      { name: "uv (Package Manager)", usedIn: ["All Python Projects"] },
      { name: "Ruff / PEP8", usedIn: ["All Python Projects"] },
    ],
  },
  frontend: {
    id: "frontend",
    title: "Frontend",
    emoji: "🎨",
    skills: [
      { name: "React / Next.js", usedIn: ["Docu3C Internship", "This Portfolio"] },
      { name: "TypeScript", usedIn: ["Docu3C Internship", "This Portfolio"] },
      { name: "Tailwind CSS", usedIn: ["Docu3C Internship", "This Portfolio"] },
      { name: "Streamlit", usedIn: ["PolarBrief", "Docu3C Internship"] },
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
      "Started understanding NLP pipelines",
    ],
  },
  {
    year: "2025",
    title: "Production AI Systems",
    emoji: "⚡",
    items: [
      "Built Hybrid Legal RAG (BM25 + FAISS + PageRank)",
      "PolarBrief AI and Knowledge Graph Pipeline",
      "AI/ML Internship @ Docu3C Technologies",
      "Azure ecosystem: CosmosDB, Blob Storage, ML",
      "Microsoft Azure Data Fundamentals certified",
      "NPTEL Machine Learning certification",
      "FastAPI + WebSockets + SSE backends",
    ],
  },
  {
    year: "2026",
    title: "Agentic AI & Orchestration",
    emoji: "🧠",
    items: [
      "Deep into Multi-Agent Systems",
      "MCP (Model Context Protocol) architectures",
      "OpenTelemetry + Arize Phoenix observability",
      "Instructor / Pydantic for structured LLM outputs",
      "Exploring GPT-5 tooling capabilities",
      "125+ LeetCode problems solved",
    ],
  },
];

// ─── LINKEDIN POSTS (Placeholder) ──────────────────────────────────────────
export const linkedinPosts = [
  {
    id: "post_1",
    date: "Jun 2025",
    content:
      "Just shipped a Hybrid RAG system combining BM25 sparse retrieval, FAISS dense embeddings, and PageRank authority scoring. The RRF fusion layer is doing some serious heavy lifting — 82.4% Top-1 accuracy on 26K legal docs. Thread on what I learned 🧵",
    url: "https://www.linkedin.com/in/ayush20039939",
    likes: "🔥 Trending",
  },
  {
    id: "post_2",
    date: "May 2025",
    content:
      "Building in the Azure AI ecosystem taught me one thing: structured outputs are not optional in production. Pydantic + Instructor = LLM outputs you can actually trust at scale.",
    url: "https://www.linkedin.com/in/ayush20039939",
    likes: null,
  },
  {
    id: "post_3",
    date: "Apr 2025",
    content:
      "MCP (Model Context Protocol) is going to fundamentally change how we build agentic AI applications. Here's why tool-calling architectures matter more than the models themselves...",
    url: "https://www.linkedin.com/in/ayush20039939",
    likes: null,
  },
  {
    id: "post_4",
    date: "Mar 2025",
    content:
      "Knowledge graphs + LLMs = underrated combo. Built a pipeline that turns 1000s of unstructured legal documents into a navigable entity network. NetworkX + PyVis for the win.",
    url: "https://www.linkedin.com/in/ayush20039939",
    likes: null,
  },
];
