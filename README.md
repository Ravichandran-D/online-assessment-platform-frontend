# Online Assessment Platform

The Online Assessment Platform is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed to facilitate comprehensive online exams. It includes features for question banks, automated grading, result analysis, exam scheduling, proctoring, and detailed analytics. The platform provides two roles: Admin and Student. Admins manage exams, questions, grading, and students, while students can participate in exams, view results, and track progress.

## Features

### Admin Features:
- **Question Bank Management**: Create, edit, and manage questions.
- **Automated Grading**: Auto-grade exams based on predefined answers.
- **Result Analysis**: View detailed analytics on student performance.
- **Exam Scheduling**: Schedule exams and manage timing and availability.
- **Proctoring**: Monitor students during exams.
- **User Management**: Manage student profiles, roles, and permissions.

### Student Features:
- **Exam Participation**: Take exams as scheduled by the admin.
- **Result Viewing**: View exam results and grading breakdowns.
- **Progress Tracking**: Analyze individual performance and track progress.

## Tech Stack

### Frontend:
- **React.js**: For building the user interface.
- **Redux-Thunk**: Middleware for managing state with asynchronous actions.
- **React-Router**: For navigation between admin and student dashboards.
- **Tailwind CSS**: For styling and responsiveness.

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB**: (with Mongoose ORM)

### Authentication:
- **JWT**: For securing routes, role-based access control for admin and student functionalities.

### State Management:
- **Redux-Thunk**: For handling asynchronous operations.

### API Testing:
- **Postman**: For testing API routes.

## Prerequisites

- **Node.js** 
- **MongoDB** installed locally or use **MongoDB Atlas** for a cloud-based solution.

## Common Setup

### Frontend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ravichandran-D/online-assessment-platform-frontend.git
   cd frontend


2. **Install Dependencies:**

```bash
npm install

```

3. **Environment Variables:** Create a .env file in the root of your frontend directory and configure:
```bash
REACT_APP_API_URL=https://online-assessment-platform-backend-cmgj.onrender.com
```

4. **Start the Application:**
``` bash
npm start 
```

**Frontend Tech Overview**
**React.js:** For building the user interface.
**Redux-Thunk:** Middleware for managing state with asynchronous actions.
**React-Router:** For navigation between admin and student dashboards.
**Tailwind CSS:** For styling and responsiveness.

**Admin and Student Views**
**Admin:** Has access to dashboard sections for managing exams, students, and analytics.
**Student:** Can access exams, view results, and track performance.