import pandas as pd

# Read the CSV file
data = pd.read_csv('voice.csv')

# Split into features and target
features = data.drop('label', axis=1)
target = data['label']

# Perform data preprocessing
# ... your preprocessing code goes here ...

# Split the data into X and y
X = features
y = target
