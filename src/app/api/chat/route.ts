import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { readFileSync } from "fs";
import { join } from "path";

// Load Ayush's portfolio data as LLM context at module level (cached)
let PORTFOLIO_CONTEXT = "";
try {
  const dataPath = join(process.cwd(), "..", "data.md");
  PORTFOLIO_CONTEXT = readFileSync(dataPath, "utf-8");
} catch {
  // Fallback context if file not found
  PORTFOLIO_CONTEXT = `
Ayush Agarwal is an AI Software Engineer and B.Tech CSE student at VIT Bhopal University (CGPA 8.52).

EXPERIENCE:
- AI Software Engineer Intern at Docu3C Technologies (Aug 2025 – Jun 2026, Remote, Seattle): Built production-grade LLM pipelines with structured outputs using Pydantic and Instructor. Designed multi-agent systems with MCP (Model Context Protocol) reducing manual financial document review by 60%. Built FastAPI backends with SSE/WebSockets, React/Streamlit frontends, CRM development, ServiceNow agentic workflows. Deployed on Microsoft Azure.

KEY PROJECTS:
1. LexAI — Full-Stack Legal Intelligence Platform: Production-grade Legal AI platform indexing 26,274 Supreme Court judgments. Hybrid RAG pipeline: BM25 (SQLite FTS5) + FAISS dense retrieval + PageRank graph ranking + Weighted RRF. FastAPI backend with WebSockets, Docker on Google Cloud Run, Firebase-hosted React web + Flutter mobile clients. Live at: lexai-3fd1a.web.app
2. PRESCRIPTION — AI Voice Medical Assistant: Voice AI converting doctor consultations to structured digital prescriptions. Faster-Whisper ASR + Groq LLM medical entity extraction + RapidFuzz matching across 30,000+ Indian medicines, PDF generation, PyTest validation suite, Docker. Live on Hugging Face Spaces.
3. Fiducia — Neuro-Symbolic Damage Claim Predictor (HackerRank Orchestrate): Dynamic AI Claim Verification system utilizing a Symbolic Router to select Strategy A (Direct Pydantic JSON extraction for low-risk users) or Strategy B (Chain-of-Thought reasoning for high-risk users). Integrated full OpenTelemetry & Arize Phoenix tracing, achieving a 93.8% Average Partial Score.
4. Video Manipulation Detection System: AI-powered video analysis pipeline built with PyTorch, Facebook DETR ResNet50 (Hugging Face) for frame-level object consistency, and OpenCV Optical Flow for motion anomaly detection. Visualized via Streamlit UI.
5. Legal Knowledge Graph Pipeline: End-to-end NLP pipeline transforming unstructured legal PDFs into knowledge graphs using OCR, spaCy NER, RapidFuzz cross-chunk entity resolution, NetworkX + PyVis visualization.
6. Hybrid Legal RAG: BM25 + FAISS + PageRank with RRF fusion. 82.4% Top-1 accuracy on 26K+ docs.
7. PolarBrief AI: Legal argument analyzer using LangChain, OCR, TF-IDF, Streamlit.
8. WESAD Emotion Recognition: ML benchmarking on physiological signals.

SKILLS: Python, TypeScript, Flutter, FastAPI, LangChain, FAISS, Pydantic, Instructor, MCP, Microsoft Azure, Google Cloud Run, Firebase, Docker, SQLAlchemy, PostgreSQL, Firestore, SQLite FTS5, RapidFuzz, spaCy, Faster-Whisper, OpenTelemetry, Arize Phoenix, React, Streamlit, PyTorch, OpenCV, Transformers.

CERTIFICATIONS: Microsoft Azure Data Fundamentals, Google Cloud GenAI (3 certs), NPTEL Machine Learning.

ACHIEVEMENTS: Top 25 team Mahakumbh Hackathon, 125+ LeetCode problems solved.

CONTACT: LinkedIn: linkedin.com/in/ayush20039939 | GitHub: github.com/Ayush99392003 | Email: ayush20039939@gmail.com | Live Project: lexai-3fd1a.web.app
  `.trim();
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {
          answer:
            "⚠️ OpenAI API key not configured. Add `OPENAI_API_KEY` to your `.env.local` file to enable AI mode.",
        },
        { status: 200 }
      );
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: `You are a conversational assistant representing Ayush Agarwal's portfolio.
Answer questions about Ayush's experience, projects, skills, and background using only the context provided.
Be concise, specific, and enthusiastic. Use markdown formatting.
If a question is not related to Ayush's portfolio, politely redirect the conversation back.

PORTFOLIO CONTEXT:
${PORTFOLIO_CONTEXT}`,
        },
        {
          role: "user",
          content: query,
        },
      ],
      max_output_tokens: 400,
    });

    const answer =
      response.output_text ??
      "I couldn't generate a response. Try asking something specific about my projects or skills!";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("[/api/chat] Error:", error);
    return NextResponse.json(
      { answer: "⚠️ Something went wrong. Please try again." },
      { status: 200 }
    );
  }
}
