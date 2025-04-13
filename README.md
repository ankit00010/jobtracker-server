# 💼 Axcel Jobs (Job Tracker)

<img src="https://github.com/user-attachments/assets/6f5d884c-bf8a-41b1-953b-de3ffdd4070b" alt="prod3" width="500" height="350"/>


**Axcel Jobs** is a full-stack web application built to **streamline and simplify** the job application process. It enables users to efficiently **track**, **manage**, and **stay organized** throughout their job search journey.

With Axcel Jobs, users can:
- Log and maintain records of job applications
- Categorize applications by status and job type
- Update, edit, and review application progress in real-time

The objective is to offer a **centralized hub** for managing the entire job search pipeline with clarity and ease.

---

🔗 **Live Preview:** [Axcel Jobs](https://jobvity.vercel.app/login)  
🖥️ **Client Repo:** [jobtracker-client on GitHub](https://github.com/ankit00010/jobtracker-client.git)  
🛠️ **Server Repo:** [jobtracker-server on GitHub](https://github.com/ankit00010/jobtracker-server.git)

---

## ✨ Features

- ✅ Add new job entries
- 📝 Edit and update job details
- ❌ Delete job applications
- 🔍 Search and filter job listings
- 📁 Organized and intuitive UI for job views
- 🔃 Pagination for enhanced performance
- 🧫 Filter by **Job Type** and **Application Status**

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

### 1. Clone the Repositories
```bash
git clone https://github.com/ankit00010/jobtracker-client.git
git clone https://github.com/ankit00010/jobtracker-server.git
```

### 2. Install Dependencies
```bash
# Client
cd jobtracker-client
npm install

# Server
cd ../jobtracker-server
npm install
```

### 3. Configure Environment Variables

#### 📦 Server (.env)
Create a `.env` file in the `jobtracker-server` folder:
```env
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/jobtracker
JWT_SECRET=your_jwt_secret
PORT=5000
```

#### 💻 Client (.env.local)
Create a `.env.local` file in the `jobtracker-client` folder:
```env
SERVER_URL=http://localhost:5000
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

## 👤 Author

**Ankit Mishra**  
📧 **Email:** ankitmishra.dev11@gmail.com  
🔗 Connect with me on [LinkedIn](https://www.linkedin.com/in/ankit-ravindra-mishra-19050121a/) | Check out my work on [GitHub](https://github.com/ankit00010)

