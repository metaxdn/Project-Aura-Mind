# 🌿 AuraMind — AI-Powered Student Mental Health Tracker

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.13-blue?style=for-the-badge&logo=python" />
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=for-the-badge&logo=fastapi" />
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Vite-Build-646CFF?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/Scikit--Learn-ML-F7931E?style=for-the-badge&logo=scikitlearn" />
  <img src="https://img.shields.io/badge/Docker-Deployed-2496ED?style=for-the-badge&logo=docker" />
</p>

<p align="center">
An AI-powered Mental Health Assessment platform designed specifically for students to estimate their mental wellness using machine learning and lifestyle factors.
</p>

---

## 🌐 Live Demo

### 🚀 Frontend
https://project-aura-mind.vercel.app/

### ⚙️ Backend API
https://project-aura-mind.onrender.com/

### 📄 API Documentation
https://project-aura-mind.onrender.com/docs

---

# 📖 Overview

AuraMind is a full-stack Machine Learning application that predicts a student's Mental Health Score using various lifestyle, academic and social media usage parameters.

The project combines a trained Scikit-Learn regression model with a FastAPI backend and a modern React frontend to deliver real-time predictions through an intuitive multi-step assessment wizard.

The application is designed with a calming and minimal user experience to reduce cognitive load while collecting meaningful wellness information.

---

# ✨ Features

- 🌿 Beautiful minimalistic UI
- 🤖 Machine Learning based prediction
- ⚡ FastAPI REST API
- 🎯 Multi-step onboarding experience
- 📱 Responsive design
- 📊 Real-time Mental Health Score prediction
- 🧠 Client-side intelligent fallback model
- 🔄 Animated user interactions
- 📖 Swagger API documentation
- ☁️ Cloud deployed

---

# 🖥️ Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Backend

- Python
- FastAPI
- Pydantic
- Pandas
- Joblib

## Machine Learning

- Scikit-Learn
- Regression Model
- Feature Engineering
- Data Preprocessing

## Deployment

- Vercel (Frontend)
- Render (Backend)
- Docker
- GitHub

---

# 🧠 Machine Learning Inputs

The model predicts Mental Health Score using:

- Age
- Gender
- Country
- Academic Level
- Most Used Social Platform
- Purpose of Social Media Usage
- Daily Screen Time
- Daily Phone Unlocks
- Study Hours
- Physical Activity
- Sleep Duration
- Stress Level

---

# 📊 Prediction Output

The model predicts

```

Mental Health Score (0 - 10)

```

Higher score indicates healthier mental well-being.

---

# 📂 Project Structure

```

Project-Aura-Mind
│
├── backend
│ ├── main.py
│ ├── requirements.txt
│ ├── Dockerfile
│ ├── render.yaml
│ └── Mental_Health_Model.pkl
│
├── frontend
│ ├── src
│ │ ├── components
│ │ ├── context
│ │ ├── services
│ │ ├── types
│ │ ├── App.tsx
│ │ └── main.tsx
│ │
│ ├── package.json
│ └── vite.config.ts
│
└── README.md

```

---

# ⚙️ Local Installation

## Clone Repository

```bash
git clone https://github.com/metaxdn/Project-Aura-Mind.git

cd Project-Aura-Mind
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv

source .venv/bin/activate

pip install -r requirements.txt

python -m uvicorn main:app --reload
```

Backend runs on

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🔗 API Endpoint

## POST

```
/predict
```

### Example Request

```json
{
  "age": 20,
  "gender": "Male",
  "country": "India",
  "academic_level": "Undergraduate",
  "most_used_platform": "Instagram",
  "purpose_of_use": "Education",
  "avg_daily_usage_hours": 4,
  "daily_unlocks": 60,
  "study_hours": 8,
  "physical_activity_hours": 1,
  "sleep_hours_per_night": 7,
  "stress_level": "Medium"
}
```

### Example Response

```json
{
  "predicted_mental_health_score": 6.57
}
```

---

# 🚀 Deployment

### Frontend

Hosted on **Vercel**

### Backend

Hosted on **Render**

### Backend Container

Dockerized using Docker

---

# 🎯 Future Improvements

- User Authentication
- Mood Journal
- Daily Check-ins
- AI Chat Assistant
- Personalized Recommendations
- Progress Analytics
- Mental Health Dashboard
- Data Visualization
- Firebase Integration
- Email Reports

---

# 📸 Screenshots

> Add screenshots of:

- Landing Page
- Assessment Wizard
- Dashboard
- Prediction Result
- API Documentation

---

# 👨‍💻 Developer

**Aditya Karmakar**

Electronics & Communication Engineering Student

Techno India University

GitHub

https://github.com/metaxdn

LinkedIn

https://linkedin.com/in/aditya-karmakar


---

# ⭐ Support

If you found this project helpful,

please consider giving it a ⭐ on GitHub.

It motivates me to build more open-source projects.

---

<p align="center">
Built with ❤️ using React, FastAPI & Machine Learning
</p>
