import pandas as pd

# Read the CSV file
data = pd.read_csv('OnlineNewsPopularity.csv')

# Split into features and target
features = data.drop(['url', 'timedelta', 'shares'], axis=1)
target = data['shares']

# Perform data preprocessing
# ... your preprocessing code goes here ...

# Split the data into X and y
X = features
y = target
