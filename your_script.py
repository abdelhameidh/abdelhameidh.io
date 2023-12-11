import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Read the CSV file
data = pd.read_csv('cirrhosis.csv')

# Preprocessing
# Drop any rows with missing values
data = data.dropna()

# Split into features and target
features = data.drop('status', axis=1)
target = data['status']

# Perform feature scaling using standardization
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(scaled_features, target, test_size=0.2, random_state=42)

# Rest of your code...
