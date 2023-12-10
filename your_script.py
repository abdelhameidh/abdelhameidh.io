import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import StackingClassifier
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

# Build the individual classifiers
svm = SVC()
logreg = LogisticRegression()
dt = DecisionTreeClassifier()

# Build the stacking ensemble model
estimators = [('svm', svm), ('logreg', logreg), ('dt', dt)]
stacking_model = StackingClassifier(estimators=estimators, final_estimator=LogisticRegression())

# Fit the stacking model on the training data
stacking_model.fit(X_train, y_train)

# Make predictions on the test set using the stacking model
y_pred_stacking = stacking_model.predict(X_test)

# Evaluate the stacking model
accuracy_stacking = accuracy_score(y_test, y_pred_stacking)
report_stacking = classification_report(y_test, y_pred_stacking)

print("Stacking Accuracy:", accuracy_stacking)
print("Stacking Classification Report:")
print(report_stacking)
