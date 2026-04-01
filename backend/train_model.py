import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import os

def train_and_evaluate():
    # Load data
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    data_path = os.path.join(BASE_DIR, 'data', 'student_engagement.csv')
    if not os.path.exists(data_path):
        print(f"Error: Data file {data_path} not found.")
        return
        
    df = pd.read_csv(data_path)

    print("Columns in dataset:", df.columns.tolist())  # 🔍 Debug

    # Preprocessing
    X = df.drop('Engagement_Level', axis=1)
    y = df['Engagement_Level']

    # ✅ SAVE FEATURE NAMES (CRITICAL FIX)
    feature_names = X.columns.tolist()

    # Split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Train CART
    clf = DecisionTreeClassifier(criterion='gini', max_depth=5, random_state=42)
    clf.fit(X_train, y_train)

    # Evaluate
    y_pred = clf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)

    print(f"\nAccuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

    print("\nConfusion Matrix:")
    print(confusion_matrix(y_test, y_pred))

    # Feature Importance
    importances = clf.feature_importances_
    print("\nFeature Importances:")
    for f, i in zip(feature_names, importances):
        print(f"{f}: {i:.4f}")

    # Save directories
    os.makedirs('backend/models', exist_ok=True)
    os.makedirs('backend/visuals', exist_ok=True)

    # ✅ SAVE MODEL
    joblib.dump(clf, 'backend/models/engagement_model.pkl')

    # ✅ SAVE FEATURE NAMES (VERY IMPORTANT)
    joblib.dump(feature_names, 'backend/models/feature_names.pkl')

    # Save feature importance
    feat_importance_dict = {f: float(i) for f, i in zip(feature_names, importances)}
    joblib.dump(feat_importance_dict, 'backend/models/feature_importance.pkl')

    print("\n✅ Model, feature names, and feature importance saved!")

    # Visualize Decision Tree
    plt.figure(figsize=(20, 10))
    plot_tree(
        clf,
        feature_names=feature_names,
        class_names=clf.classes_,
        filled=True,
        rounded=True
    )

    plt.title("CART Decision Tree - Student Engagement")
    plt.savefig('backend/visuals/decision_tree.png')

    print("✅ Decision tree saved!")

if __name__ == "__main__":
    train_and_evaluate()