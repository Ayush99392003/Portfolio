// conversationGraph.ts
// The complete state machine powering the "Chat With Ayush" portfolio.
// Each node has a bot_message, option buttons, and optional sidebar triggers.

export type SidebarContentType =
  | "feed"
  | "project"
  | "architecture"
  | "resume"
  | "skills"
  | "timeline"
  | "contact";

export interface ChatOption {
  label: string;
  nextNodeId: string;
  sidebarAction?: {
    contentType: SidebarContentType;
    contentId?: string;
  };
  externalUrl?: string;
  downloadUrl?: string;
}

export interface ChatNode {
  id: string;
  botMessage: string;
  options: ChatOption[];
}

export const conversationGraph: Record<string, ChatNode> = {
  // ─── ROOT / LANDING ────────────────────────────────────────────────
  root: {
    id: "root",
    botMessage: `Hey there 👋 I'm **Ayush Agarwal**.

AI Software Engineer building:
• Full-Stack Legal AI (Flutter + React + FastAPI + GCP)
• Agentic AI & Multi-Agent Systems with MCP
• Production-grade Hybrid RAG Pipelines
• Voice AI & Medical Intelligence Systems

Who are you? I'll tailor this experience for you.`,
    options: [
      { label: "👔 I'm a Recruiter", nextNodeId: "path_recruiter" },
      { label: "💻 I'm an Engineer", nextNodeId: "path_engineer" },
      { label: "🚀 I'm a Founder", nextNodeId: "path_founder" },
      { label: "🎓 I'm a Student", nextNodeId: "path_student" },
      { label: "✨ Surprise Me", nextNodeId: "surprise" },
    ],
  },

  // ─── RECRUITER PATH ────────────────────────────────────────────────
  path_recruiter: {
    id: "path_recruiter",
    botMessage: `Hi Recruiter 👋

I'm an AI/ML Engineer with hands-on experience building:
• End-to-end LLM applications (Azure AI ecosystem)
• Multi-agent systems using MCP
• FastAPI backends with real-time streaming
• React/Streamlit frontends for AI workflows

Currently a B.Tech CSE student at VIT Bhopal (CGPA 8.52).

What would you like to explore?`,
    options: [
      {
        label: "📄 Download Resume",
        nextNodeId: "resume_download",
        sidebarAction: { contentType: "resume" },
      },
      { label: "⭐ Quick Highlights", nextNodeId: "recruiter_highlights" },
      { label: "🏗️ My Projects", nextNodeId: "projects_hub" },
      { label: "🛠️ My Skills", nextNodeId: "skills_hub" },
      { label: "✉️ Let's Connect", nextNodeId: "contact_node" },
    ],
  },

  recruiter_highlights: {
    id: "recruiter_highlights",
    botMessage: `Here's the quick snapshot:

• 🏢 **AI Software Engineer Intern** @ Docu3C Technologies (Aug 2025 – Jun 2026)
• 🚀 **LexAI** — Live Legal AI Platform · 26,274 SC judgments indexed
• 🏥 **PRESCRIPTION** — Voice AI Medical Assistant on Hugging Face
• 📊 **60% reduction** in manual document review via MCP agentic workflows
• 🧠 **Multi-agent orchestration** with MCP, Instructor & Pydantic
• ☁️ Microsoft Azure & Google Cloud certified
• 🏆 **Top 25 team — Mahakumbh Hackathon**
• 👥 Event Lead: organized 5+ workshops for 200+ participants`,
    options: [
      { label: "🏗️ Dive into Projects", nextNodeId: "projects_hub" },
      {
        label: "📄 See Full Resume",
        nextNodeId: "resume_download",
        sidebarAction: { contentType: "resume" },
      },
      { label: "✉️ Connect with Me", nextNodeId: "contact_node" },
      { label: "← Back to Start", nextNodeId: "root" },
    ],
  },

  resume_download: {
    id: "resume_download",
    botMessage: `My resume is now open on the right →

You can also download the PDF directly. It covers:
• My internship experience at Docu3C
• All 4 major AI/ML projects
• Certifications from Microsoft & Google Cloud
• Education & leadership roles`,
    options: [
      { label: "🏗️ Explore Projects", nextNodeId: "projects_hub" },
      { label: "✉️ Get in Touch", nextNodeId: "contact_node" },
      { label: "← Back", nextNodeId: "path_recruiter" },
    ],
  },

  // ─── ENGINEER PATH ─────────────────────────────────────────────────
  path_engineer: {
    id: "path_engineer",
    botMessage: `Welcome, Engineer 👋

I love building systems that work at the edges of what's possible with LLMs. My focus areas:

• **Hybrid RAG** — BM25 + FAISS + PageRank + Weighted RRF fusion
• **Multi-Agent Orchestration** — MCP, tool-calling, Instructor, Pydantic
• **Real-time Backends** — FastAPI + SSE + WebSockets + Docker + GCP
• **Voice AI** — Faster-Whisper + LLM extraction + RapidFuzz matching
• **Observability** — OpenTelemetry + Arize Phoenix

What do you want to explore?`,
    options: [
      { label: "⚙️ System Architectures", nextNodeId: "engineer_architectures" },
      { label: "🏗️ All Projects", nextNodeId: "projects_hub" },
      { label: "🧪 Current Experiments", nextNodeId: "engineer_experiments" },
      {
        label: "🐙 GitHub Profile",
        nextNodeId: "path_engineer",
        externalUrl: "https://github.com/Ayush99392003",
      },
      { label: "🛠️ My Tech Stack", nextNodeId: "skills_hub" },
    ],
  },

  engineer_architectures: {
    id: "engineer_architectures",
    botMessage: `Select a system to explore its architecture:`,
    options: [
      {
        label: "⚖️ LexAI Full-Stack Platform",
        nextNodeId: "arch_lexai",
        sidebarAction: { contentType: "architecture", contentId: "lexai" },
      },
      {
        label: "🏥 PRESCRIPTION Voice AI",
        nextNodeId: "arch_prescription",
        sidebarAction: { contentType: "architecture", contentId: "prescription" },
      },
      {
        label: "⚡ Hybrid Legal RAG",
        nextNodeId: "arch_hybrid_rag",
        sidebarAction: { contentType: "architecture", contentId: "hybrid_rag" },
      },
      {
        label: "📄 PolarBrief AI Pipeline",
        nextNodeId: "arch_polarbrief",
        sidebarAction: {
          contentType: "architecture",
          contentId: "polarbrief",
        },
      },
      {
        label: "🕸️ Knowledge Graph Pipeline",
        nextNodeId: "arch_knowledge_graph",
        sidebarAction: {
          contentType: "architecture",
          contentId: "knowledge_graph",
        },
      },
      { label: "← Back", nextNodeId: "path_engineer" },
    ],
  },

  arch_lexai: {
    id: "arch_lexai",
    botMessage: `**LexAI** — Full-Stack Legal AI Architecture →

Key design decisions:
• Hybrid RAG: BM25 (SQLite FTS5) + FAISS + PageRank + Weighted RRF
• 26,274 Supreme Court judgments indexed
• FastAPI backend with WebSockets on Google Cloud Run
• Flutter mobile + React web clients on Firebase Hosting
• Live demo: lexai-3fd1a.web.app`,
    options: [
      {
        label: "📦 View Full Project",
        nextNodeId: "project_lexai",
        sidebarAction: { contentType: "project", contentId: "lexai" },
      },
      {
        label: "🌐 Live Demo",
        nextNodeId: "arch_lexai",
        externalUrl: "https://lexai-3fd1a.web.app",
      },
      { label: "← Other Architectures", nextNodeId: "engineer_architectures" },
    ],
  },

  arch_prescription: {
    id: "arch_prescription",
    botMessage: `**PRESCRIPTION** — Voice Medical AI Architecture →

Key design decisions:
• Faster-Whisper for low-latency speech recognition
• Groq LLM for medical entity extraction
• RapidFuzz matching across 30,000+ Indian medicines
• Full PyTest validation suite for medical accuracy
• Docker containerized, live on Hugging Face Spaces`,
    options: [
      {
        label: "📦 View Full Project",
        nextNodeId: "project_prescription",
        sidebarAction: { contentType: "project", contentId: "prescription" },
      },
      { label: "← Other Architectures", nextNodeId: "engineer_architectures" },
    ],
  },

  arch_hybrid_rag: {
    id: "arch_hybrid_rag",
    botMessage: `**Hybrid Legal RAG** — Architecture open on the right →

Key design decisions:
• Combined BM25 (sparse) + FAISS MPNet (dense) retrieval
• PageRank-based graph re-ranking for document authority
• Reciprocal Rank Fusion to merge all signals
• 26K+ documents indexed | 82.4% Top-1 | NDCG@10 = 0.89`,
    options: [
      {
        label: "📦 View Full Project",
        nextNodeId: "project_hybrid_rag",
        sidebarAction: { contentType: "project", contentId: "hybrid_rag" },
      },
      {
        label: "🔗 GitHub Repo",
        nextNodeId: "arch_hybrid_rag",
        externalUrl: "https://github.com/Ayush99392003/Legal_AI_Backend-",
      },
      { label: "← Other Architectures", nextNodeId: "engineer_architectures" },
    ],
  },

  arch_polarbrief: {
    id: "arch_polarbrief",
    botMessage: `**PolarBrief AI** — Architecture open on the right →

Key design decisions:
• Hybrid OCR (Tesseract) + PDF parser for robust extraction
• TF-IDF + LLM scoring for argument polarity weighting
• LangChain for structured summarization and heading generation
• Streamlit for interactive real-time report generation`,
    options: [
      {
        label: "📦 View Full Project",
        nextNodeId: "project_polarbrief",
        sidebarAction: { contentType: "project", contentId: "polarbrief" },
      },
      {
        label: "🔗 GitHub Repo",
        nextNodeId: "arch_polarbrief",
        externalUrl: "https://github.com/Ayush99392003/PolarBrief",
      },
      { label: "← Other Architectures", nextNodeId: "engineer_architectures" },
    ],
  },

  arch_knowledge_graph: {
    id: "arch_knowledge_graph",
    botMessage: `**Knowledge Graph Pipeline** — Architecture open on the right →

Key design decisions:
• Multi-stage: OCR → Cleaning → Chunking → Entity Extraction
• Deterministic ID mapping for cross-chunk entity resolution
• Fuzzy matching for entity deduplication
• NetworkX + PyVis for interactive graph visualization`,
    options: [
      {
        label: "📦 View Full Project",
        nextNodeId: "project_knowledge_graph",
        sidebarAction: {
          contentType: "project",
          contentId: "knowledge_graph",
        },
      },
      {
        label: "🔗 GitHub Repo",
        nextNodeId: "arch_knowledge_graph",
        externalUrl:
          "https://github.com/Ayush99392003/knowledge_graph_legal_cases",
      },
      { label: "← Other Architectures", nextNodeId: "engineer_architectures" },
    ],
  },

  engineer_experiments: {
    id: "engineer_experiments",
    botMessage: `**Currently Exploring 🧪**

• **MCP Architecture** — Designing production-grade tool-calling workflows
• **Multi-Agent Systems** — Orchestration patterns and failure modes
• **Agent Observability** — OpenTelemetry + Arize Phoenix tracing
• **Structured LLM Outputs** — Pydantic + Instructor for guaranteed schemas
• **GPT-5 Tooling** — Evaluating new model capabilities for agent systems`,
    options: [
      { label: "🏗️ See My Projects", nextNodeId: "projects_hub" },
      { label: "← Back", nextNodeId: "path_engineer" },
    ],
  },

  // ─── FOUNDER PATH ──────────────────────────────────────────────────
  path_founder: {
    id: "path_founder",
    botMessage: `Hi Founder 👋

I think like an engineer who ships products. Every project starts with:

**Problem → Solution → Metrics → Outcome**

I've built AI-powered tools that turn complex, unstructured data into actionable insights for real workflows.

What do you want to see?`,
    options: [
      { label: "💡 Products Built", nextNodeId: "projects_hub" },
      { label: "📊 Business Impact", nextNodeId: "founder_impact" },
      { label: "✉️ Let's Talk", nextNodeId: "contact_node" },
    ],
  },

  founder_impact: {
    id: "founder_impact",
    botMessage: `**Business-Level Impact:**

**LexAI — Live Legal AI Platform**
→ 26,274 Supreme Court judgments indexed and searchable
→ Flutter mobile + React web serving real users
→ lexai-3fd1a.web.app

**PRESCRIPTION — Voice Medical AI**
→ Converts doctor consultations to structured prescriptions
→ 30,000+ Indian medicines database with fuzzy matching

**Docu3C Agentic Workflows**
→ 60% reduction in manual financial document review
→ MCP tool-calling pipelines for ServiceNow integrations`,
    options: [
      { label: "🔍 Project Deep Dives", nextNodeId: "projects_hub" },
      { label: "✉️ Get in Touch", nextNodeId: "contact_node" },
      { label: "← Back", nextNodeId: "path_founder" },
    ],
  },

  // ─── STUDENT PATH ──────────────────────────────────────────────────
  path_student: {
    id: "path_student",
    botMessage: `Hey! Fellow learner 👋

Here's my journey so far:

**2023** — Started B.Tech CSE @ VIT Bhopal
**2024** — ML fundamentals, Google Cloud GenAI certs, first LLMs
**2025** — LexAI platform, PRESCRIPTION AI, Docu3C internship, Azure + GCP
**2026** — Agentic AI, MCP, multi-agent orchestration, Top 25 @ Mahakumbh Hackathon

The biggest lesson: **ship things early, learn from real problems.**`,
    options: [
      {
        label: "📅 Full Learning Timeline",
        nextNodeId: "student_timeline",
        sidebarAction: { contentType: "timeline" },
      },
      { label: "🏗️ See What I've Built", nextNodeId: "projects_hub" },
      { label: "📜 My Certifications", nextNodeId: "student_certs" },
    ],
  },

  student_timeline: {
    id: "student_timeline",
    botMessage:
      "Your full learning timeline is open on the right → From Python basics in 2023 all the way to Agentic AI in 2026.",
    options: [
      { label: "🏗️ See My Projects", nextNodeId: "projects_hub" },
      { label: "← Back", nextNodeId: "path_student" },
    ],
  },

  student_certs: {
    id: "student_certs",
    botMessage: `**My Certifications 📜**

• ☁️ **Microsoft Azure Data Fundamentals** (Jun 2025)
• 🧠 **Introduction to Machine Learning** — NPTEL (May 2025)
• 🤖 **Introduction to Large Language Models** — Google Cloud (Apr 2024)
• ✨ **Introduction to Generative AI** — Google Cloud (Apr 2024)
• 🎯 **Prompt Design in Vertex AI** — Google Cloud (Jul 2024)`,
    options: [
      { label: "🏗️ See My Projects", nextNodeId: "projects_hub" },
      { label: "← Back", nextNodeId: "path_student" },
    ],
  },

  // ─── PROJECTS HUB ──────────────────────────────────────────────────
  projects_hub: {
    id: "projects_hub",
    botMessage: `**My Projects** — Pick one to explore:`,
    options: [
      {
        label: "⚖️ LexAI — Legal AI Platform",
        nextNodeId: "project_lexai",
        sidebarAction: { contentType: "project", contentId: "lexai" },
      },
      {
        label: "🏥 PRESCRIPTION — Voice Medical AI",
        nextNodeId: "project_prescription",
        sidebarAction: { contentType: "project", contentId: "prescription" },
      },
      {
        label: "🛡️ Fiducia — Neuro-Symbolic Verifier",
        nextNodeId: "project_fiducia",
        sidebarAction: { contentType: "project", contentId: "fiducia" },
      },
      {
        label: "🎥 Video Manipulation Detection",
        nextNodeId: "project_video_detection",
        sidebarAction: { contentType: "project", contentId: "video_detection" },
      },
      {
        label: "⚡ Hybrid Legal RAG",
        nextNodeId: "project_hybrid_rag",
        sidebarAction: { contentType: "project", contentId: "hybrid_rag" },
      },
      {
        label: "📄 PolarBrief AI",
        nextNodeId: "project_polarbrief",
        sidebarAction: { contentType: "project", contentId: "polarbrief" },
      },
      {
        label: "🕸️ Knowledge Graph Pipeline",
        nextNodeId: "project_knowledge_graph",
        sidebarAction: {
          contentType: "project",
          contentId: "knowledge_graph",
        },
      },
      {
        label: "🧠 WESAD Emotion Recognition",
        nextNodeId: "project_wesad",
        sidebarAction: { contentType: "project", contentId: "wesad" },
      },
    ],
  },

  project_lexai: {
    id: "project_lexai",
    botMessage: `**LexAI** — Full details on the right →

Production-grade Legal AI Platform indexing 26,274 Supreme Court judgments. Hybrid RAG: BM25 + FAISS + PageRank + Weighted RRF. Flutter mobile + React web on Firebase. Docker backend on Google Cloud Run.

**Live:** lexai-3fd1a.web.app`,
    options: [
      {
        label: "⚙️ View Architecture",
        nextNodeId: "arch_lexai",
        sidebarAction: { contentType: "architecture", contentId: "lexai" },
      },
      {
        label: "🌐 Live Demo",
        nextNodeId: "project_lexai",
        externalUrl: "https://lexai-3fd1a.web.app",
      },
      {
        label: "🔗 GitHub",
        nextNodeId: "project_lexai",
        externalUrl: "https://github.com/Ayush99392003/Legal_AI_Backend-",
      },
      { label: "← All Projects", nextNodeId: "projects_hub" },
    ],
  },

  project_prescription: {
    id: "project_prescription",
    botMessage: `**PRESCRIPTION** — Full details on the right →

AI Voice Medical Assistant converting doctor consultations into structured digital prescriptions. Faster-Whisper ASR + Groq LLM entity extraction + RapidFuzz matching across 30,000+ Indian medicines.

**Live on Hugging Face Spaces.**`,
    options: [
      {
        label: "⚙️ View Architecture",
        nextNodeId: "arch_prescription",
        sidebarAction: { contentType: "architecture", contentId: "prescription" },
      },
      { label: "← All Projects", nextNodeId: "projects_hub" },
    ],
  },

  project_fiducia: {
    id: "project_fiducia",
    botMessage: `**Fiducia** — Full details on the right →

HackerRank Orchestrate Hackathon final submission. Dynamic neuro-symbolic claims verification system routing claims based on user risk profiles.

**Key metrics:** 93.8% Average Partial Score | Direct vs CoT Router | OpenTelemetry + Arize Phoenix`,
    options: [
      {
        label: "⚙️ View Architecture",
        nextNodeId: "arch_fiducia",
        sidebarAction: { contentType: "architecture", contentId: "fiducia" },
      },
      {
        label: "🔗 GitHub",
        nextNodeId: "project_fiducia",
        externalUrl: "https://github.com/Ayush99392003/Fiducia",
      },
      { label: "← All Projects", nextNodeId: "projects_hub" },
    ],
  },

  project_video_detection: {
    id: "project_video_detection",
    botMessage: `**Video Manipulation Detection System** — Full details on the right →

AI-powered video analysis pipeline built with PyTorch, DETR ResNet50, and Optical Flow (OpenCV) to detect deepfakes, frame-tampering, and motion anomalies.`,
    options: [
      {
        label: "⚙️ View Architecture",
        nextNodeId: "arch_video_detection",
        sidebarAction: { contentType: "architecture", contentId: "video_detection" },
      },
      {
        label: "🔗 GitHub",
        nextNodeId: "project_video_detection",
        externalUrl: "https://github.com/Ayush99392003/Video_MAnipulation_Detection",
      },
      { label: "← All Projects", nextNodeId: "projects_hub" },
    ],
  },

  project_hybrid_rag: {
    id: "project_hybrid_rag",
    botMessage: `**Hybrid Legal RAG** — Full details on the right →

The retrieval engine powering LexAI. Combines BM25 (SQLite FTS5), FAISS dense embeddings, and PageRank-based graph ranking into a unified system with Weighted Reciprocal Rank Fusion.

**Key metrics:** 82.4% Top-1 accuracy | NDCG@10 = 0.89 | 26K+ docs`,
    options: [
      {
        label: "⚙️ View Architecture",
        nextNodeId: "arch_hybrid_rag",
        sidebarAction: { contentType: "architecture", contentId: "hybrid_rag" },
      },
      {
        label: "🔗 GitHub",
        nextNodeId: "project_hybrid_rag",
        externalUrl: "https://github.com/Ayush99392003/Legal_AI_Backend-",
      },
      { label: "← All Projects", nextNodeId: "projects_hub" },
    ],
  },

  project_polarbrief: {
    id: "project_polarbrief",
    botMessage: `**PolarBrief AI** — Full details on the right →

AI-powered legal argument analyzer. Extracts, classifies, and scores arguments from PDFs using LangChain + TF-IDF + custom OCR pipeline.

**Output:** Structured argument polarity reports with weighted scoring.`,
    options: [
      {
        label: "⚙️ View Architecture",
        nextNodeId: "arch_polarbrief",
        sidebarAction: {
          contentType: "architecture",
          contentId: "polarbrief",
        },
      },
      {
        label: "🔗 GitHub",
        nextNodeId: "project_polarbrief",
        externalUrl: "https://github.com/Ayush99392003/PolarBrief",
      },
      { label: "← All Projects", nextNodeId: "projects_hub" },
    ],
  },

  project_knowledge_graph: {
    id: "project_knowledge_graph",
    botMessage: `**Knowledge Graph Pipeline** — Full details on the right →

End-to-end pipeline: OCR → entity extraction → relation mapping → graph construction. Uses deterministic ID mapping and fuzzy matching for entity resolution across document chunks.`,
    options: [
      {
        label: "⚙️ View Architecture",
        nextNodeId: "arch_knowledge_graph",
        sidebarAction: {
          contentType: "architecture",
          contentId: "knowledge_graph",
        },
      },
      {
        label: "🔗 GitHub",
        nextNodeId: "project_knowledge_graph",
        externalUrl:
          "https://github.com/Ayush99392003/knowledge_graph_legal_cases",
      },
      { label: "← All Projects", nextNodeId: "projects_hub" },
    ],
  },

  project_wesad: {
    id: "project_wesad",
    botMessage: `**WESAD Multimodal Emotion Recognition** — Full details on the right →

Implemented and benchmarked LDA, Random Forest, Decision Tree, AdaBoost, and KNN on multimodal physiological signals (ECG, EDA, EMG, BVP, ACC, Temperature, Respiration).`,
    options: [
      {
        label: "🔗 GitHub",
        nextNodeId: "project_wesad",
        externalUrl:
          "https://github.com/Ayush99392003/WESAD_Multimodal_Emotion_Recognition",
      },
      { label: "← All Projects", nextNodeId: "projects_hub" },
    ],
  },

  project_constitution: {
    id: "project_constitution",
    botMessage: `**Constitution Companion** — Full details on the right →

An AI-powered tool for navigating and understanding the Indian Constitution. Built with conversational AI to make constitutional law accessible.`,
    options: [
      {
        label: "🔗 GitHub",
        nextNodeId: "project_constitution",
        externalUrl:
          "https://github.com/Ayush99392003/Constitution-Companion",
      },
      { label: "← All Projects", nextNodeId: "projects_hub" },
    ],
  },

  project_simhastha: {
    id: "project_simhastha",
    botMessage: `**Simhastha** — Full details on the right →

A specialized application built around the Simhastha Kumbh Mela event. Leverages AI to serve relevant information and navigation for attendees.`,
    options: [
      {
        label: "🔗 GitHub",
        nextNodeId: "project_simhastha",
        externalUrl: "https://github.com/Ayush99392003/Simhastha",
      },
      { label: "← All Projects", nextNodeId: "projects_hub" },
    ],
  },

  // ─── SKILLS HUB ────────────────────────────────────────────────────
  skills_hub: {
    id: "skills_hub",
    botMessage: `**My Tech Stack** — Choose a domain:`,
    options: [
      {
        label: "🤖 AI & ML",
        nextNodeId: "skills_ai",
        sidebarAction: { contentType: "skills", contentId: "ai" },
      },
      {
        label: "⚙️ Backend & APIs",
        nextNodeId: "skills_backend",
        sidebarAction: { contentType: "skills", contentId: "backend" },
      },
      {
        label: "☁️ Cloud & DevOps",
        nextNodeId: "skills_cloud",
        sidebarAction: { contentType: "skills", contentId: "cloud" },
      },
      {
        label: "🎨 Frontend",
        nextNodeId: "skills_frontend",
        sidebarAction: { contentType: "skills", contentId: "frontend" },
      },
    ],
  },

  skills_ai: {
    id: "skills_ai",
    botMessage: `**AI & ML Stack** — Details on the right →

Core: Python • LLMs • RAG • Prompt Engineering • Multi-Agent Systems (MCP) • NLP • Faster-Whisper • RapidFuzz

Projects using these skills:
• LexAI • PRESCRIPTION • Hybrid Legal RAG • PolarBrief • Knowledge Graph • WESAD`,
    options: [
      { label: "🏗️ See AI Projects", nextNodeId: "projects_hub" },
      { label: "← Other Domains", nextNodeId: "skills_hub" },
    ],
  },

  skills_backend: {
    id: "skills_backend",
    botMessage: `**Backend & API Stack** — Details on the right →

Core: FastAPI • REST APIs • WebSockets • SSE • Async Python • SQLAlchemy • Pydantic • Instructor • PyTest

Projects using these skills:
• LexAI • PRESCRIPTION • Hybrid Legal RAG • Docu3C AI pipelines`,
    options: [
      { label: "← Other Domains", nextNodeId: "skills_hub" },
    ],
  },

  skills_cloud: {
    id: "skills_cloud",
    botMessage: `**Cloud & DevOps** — Details on the right →

Core: Google Cloud Run • Firebase Hosting • Cloud Build • Microsoft Azure • Docker • Azure CosmosDB • OpenTelemetry • Arize Phoenix

Certifications: Azure Data Fundamentals • 3× Google Cloud GenAI`,
    options: [
      { label: "← Other Domains", nextNodeId: "skills_hub" },
    ],
  },

  skills_frontend: {
    id: "skills_frontend",
    botMessage: `**Frontend Stack** — Details on the right →

Core: Flutter (mobile) • React / Next.js • TypeScript • Tailwind CSS • Streamlit

Built LexAI mobile (Flutter) + web (React) clients. AI-driven frontends at Docu3C.`,
    options: [
      { label: "← Other Domains", nextNodeId: "skills_hub" },
    ],
  },

  // ─── CONTACT ───────────────────────────────────────────────────────
  contact_node: {
    id: "contact_node",
    botMessage: `Great! Let's connect 🤝

I'm always open to conversations about:
• Interesting AI/ML engineering roles
• Collaborative research or projects
• Technical discussions on LLMs and Agentic systems

Reach out on any platform:`,
    options: [
      {
        label: "💼 LinkedIn",
        nextNodeId: "contact_node",
        externalUrl: "https://www.linkedin.com/in/ayush20039939",
      },
      {
        label: "🐙 GitHub",
        nextNodeId: "contact_node",
        externalUrl: "https://github.com/Ayush99392003",
      },
      {
        label: "📧 Email",
        nextNodeId: "contact_node",
        externalUrl: "mailto:ayush20039939@gmail.com",
      },
      {
        label: "📄 Download Resume",
        nextNodeId: "resume_download",
        sidebarAction: { contentType: "resume" },
      },
      { label: "← Back to Start", nextNodeId: "root" },
    ],
  },

  // ─── SURPRISE ME ───────────────────────────────────────────────────
  surprise: {
    id: "surprise",
    botMessage: `🎲 **Random Fact about Ayush:**

I built LexAI — a full-stack legal AI platform with Flutter mobile + React web + FastAPI on GCP — while also maintaining a production internship at Docu3C.

Indexed 26,274 Supreme Court judgments with a Hybrid RAG pipeline. Live at lexai-3fd1a.web.app.

Want to explore more?`,
    options: [
      { label: "🏗️ See My Projects", nextNodeId: "projects_hub" },
      { label: "💻 For Engineers", nextNodeId: "path_engineer" },
      { label: "✨ Surprise Me Again", nextNodeId: "surprise2" },
      { label: "← Back to Start", nextNodeId: "root" },
    ],
  },

  surprise2: {
    id: "surprise2",
    botMessage: `🎲 **Another one:**

I once debugged an OpenTelemetry trace that was silently dropping spans for 3 days.

The fix? A single missing flush call before process exit.

Now I add observability first — before even writing the core logic.`,
    options: [
      { label: "🧪 See My Experiments", nextNodeId: "engineer_experiments" },
      { label: "← Back to Start", nextNodeId: "root" },
    ],
  },
};
