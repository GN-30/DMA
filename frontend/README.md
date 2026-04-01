# 🎓 Student Engagement Prediction using CART

A full-stack Data Mining project that predicts student engagement levels in blended learning environments using the CART (Classification and Regression Tree) algorithm.

---

## 📌 Overview

This project uses machine learning to analyze student data such as attendance, LMS activity, assignment scores, and quiz scores to predict engagement levels:

* 🟢 High Engagement
* 🟡 Medium Engagement
* 🔴 Low Engagement

The system helps educators identify at-risk students and take timely action.

---

## 🧠 Technology Stack

### 💻 Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion (animations)

### ⚙️ Backend

* Flask (Python)
* Flask-CORS

### 🤖 Machine Learning

* scikit-learn (DecisionTreeClassifier - CART)
* pandas, numpy

### 📊 Visualization

* matplotlib (Decision Tree)

---

## 📂 Project Structure

```
project/
│
├── backend/
│   ├── app.py
│   ├── train_model.py
│   ├── data/
│   │   └── student_engagement.csv
│   ├── models/
│   │   ├── engagement_model.pkl
│   │   ├── feature_importance.pkl
│   │
│   └── visuals/
│       └── decision_tree.png
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── PredictSection.jsx
│   │   └── ...
│
└── README.md
```

---

## 📊 Dataset Features

| Feature          | Description                         |
| ---------------- | ----------------------------------- |
| Attendance       | Percentage of classes attended      |
| LMS_Activity     | Number of LMS logins                |
| Quiz_Score       | Average quiz score                  |
| Assignment_Score | Average assignment score            |
| Engagement_Level | Target variable (High, Medium, Low) |

---

## ⚙️ Installation & Setup

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/student-engagement-prediction.git
cd student-engagement-prediction
```

---

### 🔹 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Run model training:

```bash
python train_model.py
```

Start Flask server:

```bash
python app.py
```

Server runs at:

```
http://127.0.0.1:5000
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🔌 API Endpoint

### POST `/predict`

#### Request:

```json
{
  "Attendance": 85,
  "LMS_Activity": 40,
  "Quiz_Score": 70,
  "Assignment_Score": 80
}
```

#### Response:

```json
{
  "prediction": "High",
  "probabilities": {
    "High": 0.85,
    "Medium": 0.10,
    "Low": 0.05
  }
}
```

---

## 🧠 Machine Learning Model

* Algorithm: CART (Decision Tree)
* Criterion: Gini Index
* Max Depth: 5

### Why CART?

* Easy to interpret
* Handles non-linear relationships
* Provides feature importance

---

## 📈 Features

* 🎯 Real-time prediction
* 📊 Probability visualization
* 🌌 Modern UI with animations
* 🔍 Feature importance insights
* 🧠 Decision tree visualization

---

## 🧪 Evaluation Metrics

* Accuracy
* Confusion Matrix
* Precision & Recall

---

## 📸 Screenshots

> Add your UI screenshots here

---

## 🧠 How It Works

1. User inputs student data
2. Frontend sends request to Flask API
3. Model predicts engagement level
4. Result + probabilities displayed

---

## 🚀 Future Enhancements

* 📂 CSV upload for batch prediction
* 📊 Dashboard with analytics
* 🌍 Deployment (AWS / Vercel / Render)
* 🤖 AI-based recommendations for students

---

## 👨‍💻 Author

* GN Srihari Narayanan
* B.Tech CSE

---

## 📜 License

This project is for educational purposes.

---


