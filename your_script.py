import pandas as pd
import matplotlib.pyplot as plt

# Read the CSV file
data = pd.read_csv('OnlineNewsPopularity.csv')

# Split into features and target
features = data.drop(['url', 'timedelta', 'shares'], axis=1)
target = data['shares']

# Perform data preprocessing
# ... your preprocessing code goes here ...

# Detect outliers in the features
outliers = []  # List to store the indices of outliers
for column in features.columns:
    # Calculate the z-score for each feature
    z_scores = (features[column] - features[column].mean()) / features[column].std()
    # Find the indices of outliers (threshold = 3)
    outlier_indices = z_scores[abs(z_scores) > 3].index.tolist()
    # Add the outlier indices to the list
    outliers.extend(outlier_indices)

# Plot the outliers using a scatter plot
plt.scatter(features.iloc[outliers]['n_tokens_content'], features.iloc[outliers]['n_unique_tokens'], color='red', label='Outliers')
plt.scatter(features['n_tokens_content'], features['n_unique_tokens'], color='blue', label='Data Points')
plt.xlabel('n_tokens_content')
plt.ylabel('n_unique_tokens')
plt.title('Outliers in Features')
plt.legend()

# Show the plot
plt.show()
