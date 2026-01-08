# 💧 AquaMonitor

![License](https://img.shields.io/badge/license-MIT-green.svg) ![Status](https://img.shields.io/badge/status-active-success.svg) ![Stack](https://img.shields.io/badge/stack-MERN-blue)

**A streamlined, full-stack solution for tracking daily water bottle purchases in shared living environments.**

AquaMonitor eliminates the confusion of manual logs and scattered messages by providing a **single source of truth** for tracking expenses. Designed with a focus on data integrity and ease of access, it features a glassmorphic UI, visualized analytics, and a seamless calendar interface.

---

## 📸 Screenshots

*(Add screenshots of your Dashboard and Calendar here)*

---

## 🔍 The Problem & The Solution

### The Challenge
In shared environments like hostels, messes, or office pantries, tracking water bottle purchases is often chaotic. Records are kept on loose paper or buried in WhatsApp group chats, leading to miscounts, auditing difficulties, and payment disputes.

### The Solution
AquaMonitor replaces manual friction with a digital ledger:
* ✅ **Single Source of Truth:** One centralized database for all entries.
* ✅ **Auditable Records:** Clear per-day and per-person breakdown.
* ✅ **Visual Clarity:** Monthly calendars and expense aggregation.

---

## 🧠 Architecture & Design Philosophy

This project was built with specific constraints to prioritize **usability** and **maintainability** over complexity.

* **Zero-Friction Access:** Intentionally designed **without a login system** for a single-household/mess use case. Access is immediate.
* **Client-Side Gating:** "Edit" operations are protected by a UI-level password to prevent accidental misclicks, maintaining a balance between security and convenience.
* **Data Integrity:** The backend is the authority. It stores dates in strict ISO format (`YYYY-MM-DD`) and derives monetary values dynamically (Bottles × Rate) to prevent data inconsistency.
* **Decoupled Architecture:** A clean separation of concerns between the Vanilla JS frontend and the Node.js backend.

---

## 🧩 Tech Stack

### Frontend
* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **HTML5** - Semantic structure.
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS** - Utility-first styling with Glassmorphism theme.
* ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) **Vanilla JS** - Framework-free, performant DOM manipulation.

### Backend
* ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) **Node.js** - Runtime environment.
* ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat) **Express.js** - REST API framework.
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) **MongoDB & Mongoose** - NoSQL database and object modeling.

---

## ✨ Key Features

### 📊 Dashboard
* **Yearly Aggregation:** Instant view of total bottles purchased in the current year.
* **Responsive Tables:** Desktop-optimized data tables that convert to card views on mobile.
* **Smart Filtering:** Sort and filter entries by date, person, or month.

### 📅 Calendar View
* **Visual Tracking:** Full monthly calendar with highlighted entry dates.
* **Interactive Details:** Click any date to see specific breakdown (Who paid, how many bottles).
* **Monthly Summary:** Automatic calculation of totals per person for the selected month.

### ⚙️ Entry Management
* **CRUD Operations:** Seamless Add and Edit flows.
* **Auto-Calculation:** System automatically calculates costs (Default: 1 Bottle = ₹25).
* **Safety Gating:** Simple password protection for modification actions.

---

## 📂 Project Structure

```bash
AquaMonitor/
├── frontend/
│   ├── index.html        # Main Dashboard
│   ├── calendar.html     # Calendar Visualization
│   ├── css/
│   │   └── text.css      # Custom typography & animations
│   └── videos/           # Assets
│
├── backend/
│   ├── src/
│   │   ├── config/       # Database connection logic
│   │   ├── models/       # Mongoose Schemas (Entry.js)
│   │   ├── routes/       # API Route definitions
│   │   └── app.js        # Express app setup
│   ├── .env              # Environment variables
│   └── server.js         # Entry point
│
└── README.md
```
## 🚀 Getting Started

### 1. Prerequisites
* **Node.js** (v14 or higher)
* **MongoDB** (Local instance or Atlas connection URL)

### 2. Backend Setup
Navigate to the backend directory and install the necessary dependencies:

```bash
cd backend
npm install
```

Create a .env file in the root of the backend folder:

```Code snippet

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/aquamonitor
```
Start the development server:

```Bash

npm run dev
```

Expected Output:

🚀 Server running on port 5000

✅ MongoDB connected

3. Frontend Setup
Since the frontend relies on Vanilla JS and CDN links, no build step is required.

Option A: Open frontend/index.html directly in your browser.

Option B (Recommended): Use the VS Code "Live Server" extension to serve the frontend folder for live reloading.

## 🚧 Constraints & Limitations
* **Authentication:** No user login system (by design to ensure low-friction access).
* **Deletion:** Deletion is currently disabled to prevent data loss in a shared environment.
* **Validation:** Input validation is primarily handled on the client-side.

---

## 🛣️ Roadmap
- [ ] Add CSV/PDF Export for monthly auditing.
- [ ] Implement server-side validation using Joi or Zod.
- [ ] Add an "Audit Log" to track who edited an entry.
- [ ] Optional: JWT Authentication for Admin roles.

---

## 👤 Author

**Rajdeep Pal**

* **Focus:** Full-Stack Development, UI/UX Design.
* **Philosophy:** Building practical, user-centric solutions with clean architecture.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.