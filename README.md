# 🧮 AlgoLab - Interactive Algorithm Visualizer

[![Live Demo on Vercel](https://img.shields.io/badge/Live%20Demo-Visit%20Vercel%20App-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://algorithm-visualizer-web-project.vercel.app)

**🌟 Live Demo:** [https://algorithm-visualizer-web-project.vercel.app](https://algorithm-visualizer-web-project.vercel.app)

AlgoLab is an interactive platform designed to help you learn and understand algorithms through step-by-step visualizations. Explore sorting, searching, graph algorithms, and more in a hands-on environment.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Vite** | Fast build tool & dev server |
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | UI components |
| **Vercel / Node.js** | Serverless backend (`/api/chatbot` & `/api/generate-problem`) |
| **OpenRouter API** | AI-powered algorithm tutor & problem generator |

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Netlify CLI** (optional, for full features) - installed automatically with dependencies

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GIT_URL>
cd Algo-Lab
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables (for AI Chatbot)

Create a `.env` file in the root directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

> 💡 Get your API key from [OpenRouter](https://openrouter.ai/)

### 4. Run the development server

**Option A: Frontend Only (Vite)**
```bash
npm run dev:vite
```
Opens at: `http://localhost:5173`

**Option B: Fullstack with AI Backend (Express Server + Vite)**
Open two terminals:
1. Start the local backend API server (`port 3001`):
```bash
cd server
npm install
npm run dev
```
2. Start the Vite dev server (`port 5173` with proxy to `/api`):
```bash
npm run dev:vite
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev:vite` | Start Vite dev server (no backend) |
| `npm run dev:netlify` | Start with Netlify Functions (AI Chatbot) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📁 Project Structure

```
Algo-Lab/
├── api/                    # Vercel Serverless Functions
│   ├── chatbot.ts          # AI Tutor endpoint (/api/chatbot)
│   └── generate-problem.ts # AI Problem Generator endpoint (/api/generate-problem)
├── server/                 # Express backend server for local dev & alternative deployment
│   ├── src/index.ts
│   └── package.json
├── src/
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── AlgorithmVisualizer.tsx
│   │   ├── AlgorithmBattle.tsx
│   │   ├── LearningTest.tsx
│   │   └── Docs.tsx
│   ├── components/         # Reusable UI components
│   ├── algorithms/         # Algorithm implementations
│   └── App.tsx             # Main app entry
├── public/                 # Static assets
├── vercel.json             # Vercel routing configuration
├── package.json
├── vite.config.ts          # Vite configuration
└── tailwind.config.ts      # Tailwind configuration
```

## ✨ Features

- 📊 **Interactive Visualizations** - Step-by-step algorithm animations
- 🤖 **AI Tutor** - Ask questions about any algorithm
- ⚔️ **Algorithm Battle** - Compare algorithms side by side
- 📚 **Learning Tests** - Practice with algorithm problems
- 🎨 **Modern UI** - Clean, responsive design

## 🌐 Deployment

This project is fully configured and deployed on **Vercel** (`vercel.json` + serverless functions in `api/`):

**🌟 Live URL:** [https://algorithm-visualizer-web-project.vercel.app](https://algorithm-visualizer-web-project.vercel.app)

### Deploying Your Own Instance on Vercel:
1. Push your code repository to GitHub.
2. Import the repository into [Vercel](https://vercel.com/).
3. Add the `OPENROUTER_API_KEY` environment variable inside your Vercel Project Settings (`Settings` -> `Environment Variables`).
4. Click **Deploy**! Vercel automatically deploys the Vite frontend alongside the serverless functions in `/api`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

TEKERS License
