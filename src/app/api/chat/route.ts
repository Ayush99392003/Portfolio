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
Ayush Agarwal is an AI/ML Engineer and B.Tech CSE student at VIT Bhopal (CGPA 8.52).

EXPERIENCE:
- AI/ML Intern at Docu3C Technologies: Built LLM pipelines with Azure AI, multi-agent systems using MCP, FastAPI backends with SSE/WebSockets, Streamlit/React frontends.

KEY PROJECTS:
1. Hybrid Legal RAG: BM25 + FAISS + PageRank with RRF fusion. 82.4% Top-1 accuracy on 26K+ docs.
2. PolarBrief AI: Legal argument analyzer using LangChain, OCR, TF-IDF, Streamlit.
3. Knowledge Graph Pipeline: NLP entity extraction, NetworkX/PyVis visualization.
4. WESAD Emotion Recognition: ML benchmarking on physiological signals.
5. Constitution Companion: AI-powered Indian Constitution guide.
6. Simhastha: AI guide for Kumbh Mela pilgrims.

SKILLS: Python, TypeScript, FastAPI, LangChain, FAISS, Pydantic, Instructor, MCP, Azure, Docker, OpenTelemetry, Arize Phoenix, React, Streamlit.

CERTIFICATIONS: Microsoft Azure Data Fundamentals, Google Cloud GenAI (3 certs), NPTEL Machine Learning.

CONTACT: LinkedIn: linkedin.com/in/ayush20039939 | GitHub: github.com/Ayush99392003 | Email: ayush20039939@gmail.com
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
