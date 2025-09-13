 AI Customer Support App (CRE)
 A **minimal full-stack customer support chatbot** built with **React + Node.js + Express + MongoDB +
 OpenRouter AI**.
 Users can **sign up, log in, reset password, chat with an AI assistant, and view their past chat history**.---- 
 Features
 **Authentication**- Signup, Login, Logout with **JWT**- Forget Password (reset via email or token)- Passwords hashed with **bcrypt**- Protected routes for authenticated users- 
 **Chat System**- Send messages to an AI assistant- Display AI-generated responses- Store chat history in **MongoDB** (user-scoped)- View past conversations- 
 **AI Integration**- Uses [OpenRouter API](https://openrouter.ai/) (free-tier supported)- 
 **Backend (Node.js + Express)**- `/auth/signup` → Create account- `/auth/login` → Authenticate user- `/auth/forgot-password` → Request password reset
- `/auth/reset-password` → Reset password with token- `/chat/send` → Send message, get AI response- `/chat/history` → Fetch chat logs- 
 **Frontend (React + Vite)**- Clean chat UI with TailwindCSS- Axios for API calls- JWT stored in `localStorage` (- 
 **Dockerized**
 for demo only — in production use **HTTP-only cookies**)- Run entire app with one command:
 ```bash
 docker compose up
 ```--
 Tech Stack
 | Layer | Tech |
 |-----------|------|
 | Frontend | React |
 | Backend | Node.js, Express |
 | Database | MongoDB Atlas |
 | Auth | JWT, bcrypt |
 | AI | OpenRouter API |
 | Deployment | Vercel / Render / Railway (free-tier) |
 | DevOps | Docker, Docker Compose |
--
1
 ```bash
 Setup
 Clone Repo
 git clone https://github.com/your-username/ai-support-app.git
 cd ai-support-app
 ```
 2
 ```bash
 cd server
 Backend Setup (`server/`)
 npm install
 cp .env.example .env
 ```
 Fill in your `.env`:
 ```env
 PORT=4000
 MONGO_URI=your_mongo_uri_here
 JWT_SECRET=your_jwt_secret_here
 JWT_EXPIRES=1h
 OPENROUTER_API_KEY=your_openrouter_key_here
 OPENROUTER_MODEL=openai/gpt-3.5-turbo
```
 Run server:
 ```bash
 npm run dev
 ```
 3
 ```bash
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
 Deployment- Frontend → [Vercel](https://vercel.com/)- Backend → [Render](https://render.com/) / MongoDB → [MongoDB Atlas](https://www.mongodb.com/atlas)--
 License
 MIT License — free to use and modify.
