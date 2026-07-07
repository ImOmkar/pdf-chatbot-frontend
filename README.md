# DocMind AI – Frontend

Frontend application for **DocMind AI**, an AI-powered document assistant that enables users to upload, manage, and chat with one or multiple PDF documents using Retrieval-Augmented Generation (RAG).

Built with **React**, **Vite**, **Tailwind CSS**, and **Axios**.

---

## ✨ Features

### 📄 Document Management

- Upload PDF documents
- Drag & Drop PDF upload
- Multi-document selection
- Remove individual selected documents
- Document summaries
- View uploaded documents
- Delete documents

### 💬 AI Chat Experience

- Streaming AI responses
- Chat with multiple PDFs simultaneously
- Source citations with page references
- Suggested follow-up questions
- Regenerate AI responses
- Stop response generation
- Export conversations

### 📂 Session Management

- Create new conversations
- Rename chats
- Pin / Unpin sessions
- Delete sessions
- Search conversations
- Persistent chat history

### 🎨 User Experience

- Responsive desktop & mobile layout
- Independent sidebar and chat scrolling
- Mobile bottom sheets
- Modern dark UI
- Loading states
- Confirmation dialogs
- About dialog
- Drag & Drop overlay

---

## 🛠 Tech Stack

- React
- Vite
- Tailwind CSS
- Axios
- Lucide React
- React Markdown
- Server-Sent Events (Streaming)

---

## 📁 Project Structure

```text
src/
├── components/
├── pages/
├── services/
├── hooks/
├── utils/
├── assets/
└── ...
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/<your-username>/docmind-ai-frontend.git

cd docmind-ai-frontend
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file.

```env
VITE_API_URL=http://localhost:8000
```

### Start development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

---

## 🌐 Production Build

```bash
npm run build
```

Preview locally

```bash
npm run preview
```

---

## 🔗 Backend

This frontend communicates with the **DocMind AI Backend** built using:

- FastAPI
- LangChain
- Google Gemini
- ChromaDB
- SQLAlchemy
- SQLite

Backend Repository:

```
<backend-repository-link>
```

---

## 🎯 Highlights

- Modern responsive UI
- Multi-document AI chat
- Streaming responses
- Source-grounded answers
- Mobile-first design
- Clean component architecture
- Reusable dialogs and bottom sheets

---

## 📸 Screenshots

> Screenshots will be added after deployment.

---

## 🌍 Live Demo

Frontend

```
Coming Soon
```

Backend API

```
Coming Soon
```

---

## 📄 License

This project is created for learning and portfolio purposes.

---

## 👨‍💻 Author

**Omkar Parab**

If you found this project interesting, feel free to connect or explore the backend repository.