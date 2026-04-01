import pandas as pd
import numpy as np
import os

def generate_student_data(num_records=1000):
    np.random.seed(42)
    
    # Features
    attendance = np.random.randint(60, 101, size=num_records)  # 60% to 100%
    lms_activity = np.random.randint(5, 101, size=num_records) # Logins/interactions
    quiz_scores = np.random.randint(40, 101, size=num_records) # Avg quiz score
    assignment_scores = np.random.randint(40, 101, size=num_records) # Avg assignment score
    
    # engagement_score logic: Weighted combination to determine label
    # High: High attendance (>85) AND High scores (>80)
    # Low: Low attendance (<75) OR Low scores (<60)
    # Medium: Everything else
    
    engagement_score = (attendance * 0.3) + (lms_activity * 0.2) + (quiz_scores * 0.25) + (assignment_scores * 0.25)
    
    engagement_level = []
    for score in engagement_score:
        if score > 82:
            engagement_level.append('High')
        elif score < 70:
            engagement_level.append('Low')
        else:
            engagement_level.append('Medium')
            
    df = pd.DataFrame({
        'Attendance': attendance,
        'LMS_Activity': lms_activity,
        'Quiz_Score': quiz_scores,
        'Assignment_Score': assignment_scores,
        'Engagement_Level': engagement_level
    })
    
    # Save to CSV
    os.makedirs('backend/data', exist_ok=True)
    df.to_csv('backend/data/student_engagement.csv', index=False)
    print(f"Generated {num_records} records in backend/data/student_engagement.csv")
    print(df['Engagement_Level'].value_counts())

if __name__ == "__main__":
    generate_student_data()
