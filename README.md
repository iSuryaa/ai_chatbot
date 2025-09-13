# AI Customer Support App (CRE)

## 📌 Overview
Minimal full-stack AI-powered customer support chatbot.  

---

## ✨ Features
- **Authentication**
  - Signup / Login / Logout (JWT)
  - Forgot / Reset Password
  - Passwords hashed with bcrypt
  - Protected routes  
- **Chat System**
  - Send messages to AI assistant
  - AI-generated responses
  - Chat history stored in MongoDB
  - View past conversations  
- **AI Integration**
  - OpenRouter API (free-tier)  
- **Backend (Node.js + Express)**
  - `/auth/signup`
  - `/auth/login`
  - `/auth/forgot-password`
  - `/auth/reset-password`
  - `/chat/send`
  - `/chat/history`  
- **Frontend (React)**
  - Core CSS
  - Axios for API calls
  - JWT stored in localStorage (demo)  
- **DevOps**
  - Docker + Docker Compose
  - One-command setup  

---

## 🛠️ Tech Stack
| Layer     | Tech                     |
|-----------|--------------------------|
| Frontend  | React
| Backend   | Node.js, Express         |
| Database  | MongoDB Atlas            |
| Auth      | JWT, bcrypt              |
| AI        | OpenRouter API           |
| Deployment| Vercel, Render
| DevOps    | Docker, Docker Compose   |

---

## ⚙️ Setup
### 1. Clone Repo

git clone [https://github.com/your-username/ai-support-app.git](https://github.com/iSuryaa/ai_chatbot.git)
cd ai_chatbot

### 2. Backend Setup (`server/`)
 
 cd server
 Backend Setup (`server/`)
 npm install
 cp .env.example .env
 
 Fill in your `.env`:
 ```env
 PORT=5000
 MONGO_URI=your_mongo_uri_here
 JWT_SECRET=your_jwt_secret_here
 JWT_EXPIRES=1h
 OPENROUTER_API_KEY=your_openrouter_key_here
 OPENROUTER_MODEL=openai/gpt-3.5-turbo
 EMAIL_USER=your_email_here
 EMAIL_PASS=your_email_password_or_app_key
```
 Run server:
 ```
 npm run dev
 ```
 ### 3. Frontend Setup (`client/`)

 cd client
 Frontend Setup (`client/`)
 npm install
 cp .env.example .env
 ```
 Fill in `.env`:
 ```env
 VITE_API_URL=http://localhost:4000
 ```
 Run client:
 ```bash
 npm run dev
 ```
 App runs at:
 **Frontend**: http://localhost:3000
 **Backend**: http://localhost:4000
--
 Docker Setup
 Run both client + server with one command:
 ```bash
 docker compose up --build
 ```---- - 
 Security Notes
 **For demo purposes**, JWT is stored in `localStorage`.
 In production:- Use **HTTP-only, Secure cookies** for tokens- Implement **refresh tokens** + short-lived access tokens- Add **rate limiting** and stricter validation- Secure password reset flow with expiring tokens--
```
 Project Structure
 client/ → React frontend
 server/ → Express backend
 ```--
 Deployment- Frontend → [Vercel](https://vercel.com/)- Backend → [Render](https://render.com/) /MongoDB → [MongoDB Atlas](https://www.mongodb.com/atlas)--
 License
 MIT License — free to use and modify
