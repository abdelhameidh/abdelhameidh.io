import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report

# Read the CSV file
data = pd.read_csv('OnlineNewsPopularity.csv')

# Split into features and target
features = data.drop(['url', 'timedelta', 'shares'], axis=1)
target = data['shares']

# Perform feature scaling using standardization
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(scaled_features, target, test_size=0.2, random_state=42)

# Build the SVM classifier
svm = SVC()
svm.fit(X_train, y_train)

# Make predictions on the test set using SVM
y_pred_svm = svm.predict(X_test)

# Build the logistic regression classifier
logreg = LogisticRegression()
logreg.fit(X_train, y_train)

# Make predictions on the test set using logistic regression
y_pred_logreg = logreg.predict(X_test)

# Evaluate the SVM model
accuracy_svm = accuracy_score(y_test, y_pred_svm)
report_svm = classification_report(y_test, y_pred_svm)

# Evaluate the logistic regression model
accuracy_logreg = accuracy_score(y_test, y_pred_logreg)
report_logreg = classification_report(y_test, y_pred_logreg)

print("SVM Accuracy:", accuracy_svm)
print("SVM Classification Report:")
print(report_svm)

print("Logistic Regression Accuracy:", accuracy_logreg)
print("Logistic Regression Classification Report:")
print(report_logreg)
