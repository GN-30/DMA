from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# ------------------ PATH SETUP ------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
data_path = os.path.join(BASE_DIR, 'data', 'student_engagement.csv')
MODEL_PATH = os.path.join(BASE_DIR, 'models', 'engagement_model.pkl')
FEATURES_PATH = os.path.join(BASE_DIR, 'models', 'feature_importance.pkl')

# ------------------ LOAD MODEL ------------------
model = None
feature_importances = None

if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
    print(f"[OK] Model loaded from {MODEL_PATH}")
else:
    print(f"[ERROR] Model not found at {MODEL_PATH}")

if os.path.exists(FEATURES_PATH):
    feature_importances = joblib.load(FEATURES_PATH)
    print("[OK] Feature importances loaded")
else:
    print(f"[ERROR] Feature importances not found at {FEATURES_PATH}")


# ------------------ PREDICT API ------------------
@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded. Run train_model.py first.'}), 500

    try:
        data = request.get_json()
        print("Received data:", data)  # 🔍 Debug

        if not data:
            return jsonify({'error': 'No JSON body received'}), 400

        # ------------------ EXTRACT INPUT ------------------
        try:
            attendance = float(data.get("Attendance") or data.get("attendance"))
            lms = float(data.get("LMS_Activity") or data.get("lms_logins"))
            quiz = float(data.get("Quiz_Score") or data.get("quiz_score"))   # ✅ correct order
            assignment = float(data.get("Assignment_Score") or data.get("assignment_score"))
        except:
            return jsonify({'error': 'Invalid input: all fields must be numbers'}), 400

        # Validate missing values
        if any(v is None for v in [attendance, lms, quiz, assignment]):
            return jsonify({'error': 'Missing required fields'}), 400

        # ------------------ MATCH TRAINING ORDER ------------------
        # IMPORTANT: Must match CSV order exactly
        features = ["Attendance", "LMS_Activity", "Quiz_Score", "Assignment_Score"]

        input_data = pd.DataFrame([[
            attendance,
            lms,
            quiz,
            assignment
        ]], columns=features)

        print("Final input to model:\n", input_data)  # 🔍 Debug

        # ------------------ MODEL PREDICTION ------------------
        prediction = model.predict(input_data)[0]
        probabilities = model.predict_proba(input_data)[0]
        classes = model.classes_

        prob_dict = {
            str(classes[i]): round(float(probabilities[i]), 4)
            for i in range(len(classes))
        }

        # Feature importance (optional)
        fi = {
            k: round(float(v), 4)
            for k, v in feature_importances.items()
        } if feature_importances else {}

        # ------------------ RESPONSE ------------------
        return jsonify({
            'prediction': str(prediction),
            'probabilities': prob_dict,
            'feature_importance': fi
        })

    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 400


# ------------------ HEALTH CHECK ------------------
@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None,
        'features_loaded': feature_importances is not None
    })


# ------------------ RUN SERVER ------------------
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"[INFO] Starting Flask on port {port}")
    app.run(host='0.0.0.0', port=port, debug=True)