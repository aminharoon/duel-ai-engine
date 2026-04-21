# AI Battle Arena ⚔️

An automated "Synthetic Colosseum" where AI models battle to solve problems, judged by a third impartial AI model.

## 🚀 Overview

AI Battle Arena is a full-stack platform that leverages multi-agent orchestration to pit different Large Language Models (LLMs) against each other. When a user submits a problem, two distinct AI models generate solutions simultaneously. A third, high-reasoning model then evaluates both solutions based on correctness, efficiency, and clarity, providing scores and constructive feedback.

## 🧠 Architecture

The project uses **LangGraph** to orchestrate the "Battle" workflow:
1. **START**: Receives the user problem.
2. **Solution Node**: Triggers parallel requests to **Mistral** and **Cohere** to generate competing solutions.
3. **Judge Node**: Sends the problem and both solutions to **Google Gemini** (Gemini 2.5 Flash) for structured evaluation.
4. **END**: Returns the final results, including solutions, scores, and feedback.

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern UI library for a responsive experience.
- **Vite**: Ultra-fast build tool.
- **Tailwind CSS v4**: Utility-first styling with the latest features.
- **Axios**: For seamless API communication.

### Backend
- **Express 5**: Fast, unopinionated web framework for Node.js.
- **TypeScript**: Ensuring type safety across the backend.
- **LangChain & LangGraph**: Powering the multi-agent orchestration and state management.
- **Zod**: For robust schema validation.

### AI Models
- **Mistral AI**: Solution Generator 1 (`mistral-medium-latest`).
- **Cohere**: Solution Generator 2 (`command-a-03-2025`).
- **Google Gemini**: The Judge (`gemini-2.5-flash`).

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- API Keys for Google (Gemini), Mistral, and Cohere.

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and add your API keys:
   ```env
   GOOGLE_API=your_google_api_key
   MISTRAL_API=your_mistral_api_key
   COHERE_API=your_cohere_api_key
   PORT=3000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173`.

## 📁 Project Structure

```text
AI BATTLE ARENA/
├── Backend/
│   ├── src/
│   │   ├── ai/            # LangGraph logic and AI model configurations
│   │   ├── config/        # Environment configurations
│   │   └── app.ts         # Express app and routes
│   ├── server.ts          # Entry point
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── features/      # Feature-based architecture (chat/battle)
│   │   ├── app/           # Core app setup
│   │   └── main.jsx       # Entry point
│   └── package.json
└── README.md
```
