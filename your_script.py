import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import StackingClassifier
from sklearn.metrics import accuracy_score, classification_report

# Read the CSV file
data = pd.read_csv('OnlineNewsPopularity.csv')

# Calculate the correlation matrix
corr_matrix = data.corr()

# Display the heatmap
plt.figure(figsize=(12, 10))
sns.heatmap(corr_matrix, annot=True, cmap='coolwarm')
plt.title('Correlation Heatmap')
plt.show()

# Split into features and target
features = data.drop(['url', 'timedelta', 'shares'], axis=1)
target = data['shares']

# Perform feature scaling using standardization
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(scaled_features, target, test_size=0.2, random_state=42)

# Build the individual classifiers
svm = SVC(kernel='linear', gamma='auto', C=2)
logreg = LogisticRegression()
dt = DecisionTreeClassifier()

# Train SVM model
svm.fit(X_train, y_train)

# Train logistic regression model
logreg.fit(X_train, y_train)

# Train decision tree model
dt.fit(X_train, y_train)

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
