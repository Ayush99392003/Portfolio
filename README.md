# Ayush Agarwal — AI Software Engineer Portfolio

An interactive, premium, conversational portfolio showcasing my work as an AI Software Engineer. Built with a 3-pane responsive dashboard featuring an intelligent chat assistant, active state visualizer, and custom sidebar widgets.

Live Web App: **[lexai-3fd1a.web.app](https://lexai-3fd1a.web.app)** (Flagship Product: LexAI)

---

## ✨ Features & Capabilities

### 🌗 Light / Dark Mode System
- Dynamic custom properties for theme-aware panel backgrounds, cards, borders, text, and custom scrollbars.
- Smooth transition triggers with an animated Sun / Moon switcher in the chat header.

### 📱 Adaptive Mobile Sync
- Desktop 3-pane layout adapts to overlays/drawers on screens `< 768px`.
- Interactive touch-to-dismiss background overlay.
- Synchronized pane states: opening the Left Activity Feed automatically closes the Right Sidebar on mobile viewports.

### 💬 Guided & Conversational AI Chat
- Powered by a state machine routing system (`conversationGraph.ts`) for recruiter, engineer, founder, and student pathways.
- Integrates freeform LLM chat queries (via OpenAI `gpt-4o-mini`) using system-prompt guidelines matching the developer's experience.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons, Mermaid (interactive charts)
- **State Management**: Zustand
- **Backend & APIs**: FastAPI, OpenAI SDK, SQLite (WAL mode, FTS5)
- **Observability & Tracing**: OpenTelemetry, Arize Phoenix
- **Package Manager**: `uv`

---

## 🏗️ Flagship Projects Profiled

### 1. **LexAI — Legal AI Platform** (Live: [lexai-3fd1a.web.app](https://lexai-3fd1a.web.app))
- Production-grade platform indexing **26,274 Supreme Court judgments**.
- Hybrid RAG pipeline combining BM25 (SQLite FTS5), FAISS dense vector retrieval, PageRank citation centrality, and Weighted Reciprocal Rank Fusion.
- Flutter mobile app + React web client; backend containerized on Google Cloud Run.

### 2. **PRESCRIPTION — Voice AI Medical Assistant** (Live: Hugging Face Spaces)
- Doctor-patient voice session transcription converting consultations into digital PDF prescriptions.
- Faster-Whisper ASR, Groq LLM medical entity extractor, and RapidFuzz phonetics matching across **30,000+ Indian medicines**.
- Scoped session databases via SQLite.

### 3. **Fiducia — Neuro-Symbolic Damage Claim Predictor**
- Created for the *HackerRank Orchestrate* hackathon (Top 25 team).
- Implements a dynamic **Strategy Smart** orchestrator selecting zero-shot direct Pydantic JSON extraction (low-risk) or Chain-of-Thought reasoning (high-risk).
- Achieved a **93.8% Average Partial Score** with full Arize Phoenix telemetry.

---

## 🚀 Getting Started

### Local Setup
Ensure Node.js is installed.

1. Clone the repository and install packages:
   ```bash
   npm install
   ```

2. Create a `.env.local` file:
   ```ini
   OPENAI_API_KEY="your-api-key"
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` to interact with the portfolio.

---

*Built with ❤️ for research, learning, and pragmatic systems engineering.*
