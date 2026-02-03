# 💧 AquaMonitor

![License](https://img.shields.io/badge/license-MIT-green.svg) ![Status](https://img.shields.io/badge/status-active-success.svg) ![Stack](https://img.shields.io/badge/stack-MERN-blue)

**A comprehensive, full-stack solution for tracking daily water bottle purchases in shared living environments.**

AquaMonitor eliminates the confusion of manual logs and scattered messages by providing a **single source of truth** for tracking expenses. It simplifies data management with a beautiful glassmorphic UI, robust admin tools, automated email reports, and visualized analytics.

---

## 📸 Overview

* **User Portal**: Glassmorphic dashboard to view daily entries, total costs, and apply filters.
* **Admin Dashboard**: Secured area for full data management (CRUD), detailed statistics (Charts), and email tools.
* **Automation**: Automatic monthly email reports sent to all members.

---

## 🔍 Key Features

### 👥 User Portal (`index.html`)
* **Live Dashboard:** Real-time view of total bottles and expense.
* **Smart Filtering:** Filter by person or sort by date.
* **Add Data:** Simple form to add daily bottle entries.
* **Authentication:** Client-side password protection for editing entries (`mess@12345`).

### 🛡️ Admin Dashboard (`admin.html`)
* **Secure Access:** Simple login system (`Pal@2302`) to access administrative features.
* **Unrestricted CRUD:** Add, Edit, or Delete *any* entry from any date.
* **Visual Statistics:** 
    * **Pie Chart:** Contribution share per person.
    * **Bar Chart:** Daily usage trends for the month.
* **Email Tools:**
    * **Live Preview:** See exactly what the email report looks like before sending.
    * **Manual Trigger:** Send monthly reports to specific users or custom emails on demand.

### 📧 Automated Reporting
* **Monthly Emails:** Cron job sends a detailed HTML report (`mail.html`) on the 1st of every month.
* **Dynamic Templates:** Reports include total stats and a per-person breakdown.

### 📅 Calendar View (`calendar.html`)
* **Visual Tracking:** Interactive calendar highlighting days with purchases.
* **Daily Breakdown:** Click any date to see who bought bottles.

---

## 🧩 Tech Stack

### Frontend
* ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) **HTML5** & **Vanilla JS**
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS** - Modern utility-first styling.
* ![Chart.js](https://img.shields.io/badge/Chart.js-F5788D?style=flat&logo=chart.js&logoColor=white) **Chart.js** - Data visualization.
* **Glassmorphism** - Custom UI design aesthetic.

### Backend
* ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) **Node.js** & **Express.js**
* ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) **MongoDB (Mongoose)**
* **Nodemailer** - Email delivery service.
* **Node-Cron** - Task scheduling.

---

## 📂 Project Structure

```bash
AquaMonitor/
├── admin.html          # Admin Dashboard (Charts, CRUD, Email)
├── index.html          # User Dashboard
├── calendar.html       # Calendar View
├── mail.html           # Email Template & Preview
├── api.js              # Frontend API Wrapper
├── css/                # Custom Styles
├── videos/             # Background Assets
│
└── backend/            # Server Code
    ├── src/
    │   ├── controllers/# Business Logic
    │   ├── models/     # Database Schemas
    │   ├── routes/     # API Endpoints
    │   ├── services/   # Email & Cron Services
    │   └── app.js      # Express Setup
    ├── server.js       # Entry Point
    └── .env            # Config (Not committed)
```

---

## 🚀 Getting Started

### 1. Prerequisites
* **Node.js** (v14+)
* **MongoDB** (Local or Atlas)

### 2. Backend Setup
Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/aquamonitor
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
RAJDEEP_MAIL=rajdeep@example.com
SUBHADIP_MAIL=subhadip@example.com
SANTU_MAIL=santu@example.com
```

Start the server:

```bash
npm run dev
```

### 3. Frontend Setup
Simply serve the root directory using **Live Server** (VS Code Extension) or any static file server.

* **User Portal**: Open `index.html`
* **Admin Portal**: Open `admin.html`

---

## 🛣️ API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/water/` | Get all entries |
| `GET` | `/api/water/:year/:month` | Get entries for specific month |
| `POST` | `/api/water/` | Add new entry |
| `PUT` | `/api/water/:id` | Update entry |
| `DELETE` | `/api/water/:id` | Delete entry |
| `POST` | `/api/water/email` | Trigger manual email report |

---

## 👤 Author

**Rajdeep Pal**

* **Focus:** Full-Stack Development, UI/UX Design.
* **Philosophy:** Building practical, accessible solutions.

---

## 📝 License

This project is licensed under the MIT License.