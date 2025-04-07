# 📘 Job Tracker

Job Tracker is a full-stack web application designed to help users **track, manage, and stay organized** during their job search journey. With Job Tracker, users can log every job they've applied for, categorize them by status and type, and easily update or review their application progress. The goal is to simplify job tracking and provide a central hub to manage the entire application pipeline effectively.

🔗 **Live Preview:** [https://job-tracker-client-plum.vercel.app/login](https://job-tracker-client-plum.vercel.app/login)

🖥️ **Client Repo:** [GitHub - jobtracker-client](https://github.com/ankit00010/jobtracker-client.git)  
🛠️ **Server Repo:** [GitHub - jobtracker-server](https://github.com/ankit00010/jobtracker-server.git)

---

## ✨ Features

- ✅ Add a new job entry
- 📝 Edit and update existing job details
- ❌ Delete job applications
- 🔍 Search through job listings
- 📁 View all job entries in a clean UI
- 🔃 Pagination for better performance
- 🧫 Filter by **Job Type** and **Status**

---

## 🛠 Tech Stack Used

### 🌐 Frontend
- **Next.js**
- **TypeScript**

### 📁 Backend
- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT for Authentication**

---

## 📂 Folder Structure

### Client
```
src
├── app
│   ├── add-job
│   ├── edit-job
│   │   └── [id]
│   ├── job
│   │   └── [id]
│   ├── login
│   └── register
├── component
│   ├── Header
│   ├── input
│   │   ├── dateInput
│   │   ├── dropDown
│   │   └── inputText
│   ├── pagination
│   └── pop-up
├── container
│   ├── add-job
│   ├── edit-job
│   ├── home
│   ├── home-footer
│   ├── list-view
│   ├── login
│   ├── register
│   └── view-job
├── context
├── public
├── services
└── types
```

### Server
```
src
├── config
├── constants
├── middleware
└── modules
    ├── auth
    │   ├── controller
    │   ├── models
    │   ├── repository
    │   └── routes
    └── user
        ├── controller
        ├── models
        ├── repository
        └── routes
prisma
└── migrations
    └── 20250406161819_updated_job_fields
```

---

## 🥪 Local Setup Instructions

### 1. Clone the Repos
```bash
git clone https://github.com/ankit00010/jobtracker-client.git
git clone https://github.com/ankit00010/jobtracker-server.git
```

### 2. Install Dependencies
```bash
cd jobtracker-client
npm install

cd ../jobtracker-server
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `jobtracker-server` folder:
```env
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/jobtracker
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run Prisma Migrations
```bash
cd jobtracker-server
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start Both Servers
```bash
# Start backend
cd jobtracker-server
npm run dev

# Start frontend
cd ../jobtracker-client
npm run dev
```

---

## ✨ Author

**Ankit Mishra**  
📧 ankitmishra.dev11@gmail.com  
🔗[LinkedIn](https://www.linkedin.com/in/ankit00010/) | [GitHub](https://github.com/ankit00010)

---

