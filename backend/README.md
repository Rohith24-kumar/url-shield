# URL Scanner — Backend

Express + MongoDB backend for the URL Scanner app.

---

## Folder structure

```
backend/
  models/
    ScanResult.js     ← MongoDB schema
  routes/
    analyze.js        ← POST /api/analyze (runs 5 security checks)
    history.js        ← GET /api/history, DELETE /api/history
  server.js           ← Entry point
  .env                ← Your secret config (never commit this)
  .env.example        ← Template showing what .env needs
```

---

## Setup steps

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Create your MongoDB database (free)
- Go to https://www.mongodb.com/atlas
- Create a free account and a free cluster
- Click "Connect" → "Connect your application"
- Copy the connection string — it looks like:
  `mongodb+srv://yourname:yourpassword@cluster0.xxxxx.mongodb.net/`

### 3. Configure your .env file
Open `backend/.env` and replace the placeholder with your real connection string:
```
PORT=5000
MONGO_URI=mongodb+srv://yourname:yourpassword@cluster0.xxxxx.mongodb.net/urlscanner
```

### 4. Start the backend
```bash
node server.js
```
You should see:
```
Connected to MongoDB
Server running on http://localhost:5000
```

### 5. Start the React frontend (separate terminal)
```bash
# From the project root (not inside backend/)
npm start
```

---

## API endpoints

| Method | URL | What it does |
|--------|-----|--------------|
| GET | /api/health | Check server is alive |
| POST | /api/analyze | Analyze a URL — body: `{ "url": "https://example.com" }` |
| GET | /api/history | Get all past scans |
| DELETE | /api/history | Clear all scan history |

---

## The 5 security checks

| Check | What it does | Weight |
|-------|--------------|--------|
| DNS Validation | Checks if the domain resolves | 25 |
| SSL Certificate | Verifies HTTPS and valid cert | 20 |
| WHOIS Lookup | Checks if registrant info is hidden | 15 |
| URL Pattern | Looks for phishing keywords, IP hostnames, brand spoofing | 25 |
| Redirect Tracking | Counts redirect hops (>2 is suspicious) | 15 |

Risk score = sum of weights of failed checks (max 100)
- 0–34 → Safe
- 35–69 → Suspicious  
- 70–100 → Danger
