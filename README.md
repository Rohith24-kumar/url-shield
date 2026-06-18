# 🔍 URL Shield — DNS Health & Phishing Detector

A full-stack MERN application that analyzes any URL for security threats in real time. It runs 5 parallel security checks and returns a risk score, verdict, and detailed breakdown — all stored in MongoDB for history tracking.

![Tech Stack](https://img.shields.io/badge/Stack-MERN-blue?style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react)
![Backend](https://img.shields.io/badge/Backend-Express-000000?style=flat-square&logo=express)
![Database](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb)
![Runtime](https://img.shields.io/badge/Runtime-Node.js-339933?style=flat-square&logo=nodedotjs)

---

## 🚀 Features

- **5-Layer Security Analysis** — DNS, SSL, WHOIS, URL Pattern, and Redirect Tracking run in parallel
- **Smart Risk Scoring** — weighted algorithm produces a 0–100 risk score
- **Verdict System** — Safe, Suspicious, or Danger with a detailed summary
- **Scan History** — all results saved to MongoDB, viewable and clearable from the UI
- **Real-time Analysis** — no third-party APIs, all checks run directly from the backend
- **Responsive UI** — works on desktop and mobile

---

## 🛡️ How the Security Checks Work

| Check | What It Does | Risk Weight |
|-------|-------------|-------------|
| DNS Validation | Resolves the hostname — fails if domain doesn't exist | 25 |
| SSL Certificate | Verifies HTTPS and a valid certificate | 20 |
| WHOIS Lookup | Flags hidden or redacted registrant information | 15 |
| URL Pattern | Detects phishing keywords, IP hostnames, brand spoofing, excessive subdomains | 25 |
| Redirect Tracking | Follows the redirect chain — flags more than 2 hops | 15 |

**Risk Score = sum of weights of failed checks (max 100)**

| Score | Verdict |
|-------|---------|
| 0 – 34 | ✅ Safe |
| 35 – 69 | ⚠️ Suspicious |
| 70 – 100 | 🚨 Danger |

---

## 🗂️ Project Structure

```
url-scanner/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── SearchBox.jsx
│   │   ├── ResultCard.jsx
│   │   ├── RiskScore.jsx
│   │   ├── SecurityChecks.jsx
│   │   ├── VerdictBadge.jsx
│   │   ├── HistoryCard.jsx
│   │   ├── HistorySection.jsx
│   │   ├── HistoryFilters.jsx
│   │   ├── FeaturesSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── Loader.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── HistoryPage.jsx
│   │   ├── FeaturesPage.jsx
│   │   └── AboutPage.jsx
│   ├── services/
│   │   └── api.js          ← all API calls to the backend
│   ├── utils/
│   │   └── helpers.js
│   └── App.js
├── backend/
│   ├── models/
│   │   └── ScanResult.js   ← MongoDB schema
│   ├── routes/
│   │   ├── analyze.js      ← POST /api/analyze
│   │   └── history.js      ← GET + DELETE /api/history
│   ├── server.js           ← Express entry point
│   ├── .env.example        ← environment variable template
│   └── package.json
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18 or higher
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) account

### 1. Clone the repository

```bash
git clone https://github.com/your-username/url-shield.git
cd url-shield
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create your `.env` file:

```bash
cp .env.example .env
```

Open `backend/.env` and fill in your MongoDB connection string:

```
PORT=5000
MONGO_URI=mongodb+srv://yourUsername:yourPassword@cluster0.xxxxx.mongodb.net/urlscanner
```

> **How to get your MongoDB URI:** Log in to [MongoDB Atlas](https://cloud.mongodb.com) → click Connect on your cluster → choose Drivers → copy the connection string → replace `<password>` with your real password.

### 3. Start the backend

```bash
node server.js
```

You should see:
```
Connected to MongoDB
Server running on http://localhost:5000
```

### 4. Set up and start the frontend

Open a new terminal in the project root:

```bash
npm install
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000)

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| GET | `/api/health` | Check server status | — |
| POST | `/api/analyze` | Analyze a URL | `{ "url": "https://example.com" }` |
| GET | `/api/history` | Get all past scans | — |
| DELETE | `/api/history` | Clear all scan history | — |

---

## 🧰 Tech Stack

**Frontend**
- React 18
- Axios (HTTP requests)
- Framer Motion (animations)
- React Icons

**Backend**
- Node.js
- Express
- Mongoose
- whois (WHOIS lookups)
- Node built-ins: `dns`, `https`, `http` (no paid APIs)

**Database**
- MongoDB Atlas (free tier)

---

## 🔒 Environment Variables

Never commit your `.env` file. Use `.env.example` as the template:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

---

## 📄 License

MIT License — feel free to use, modify, and distribute.
