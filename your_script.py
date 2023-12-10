import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler

# Read the CSV file
data = pd.read_csv('OnlineNewsPopularity.csv')

# Split into features and target
features = data.drop(['url', 'timedelta', 'shares'], axis=1)
target = data['shares']

# Perform feature scaling using standardization
scaler = StandardScaler()
scaled_features = scaler.fit_transform(features)

# Detect outliers in the scaled features
outliers = []  # List to store the indices of outliers
for i in range(scaled_features.shape[1]):
    # Calculate the z-score for each feature
    z_scores = (scaled_features[:, i] - scaled_features[:, i].mean()) / scaled_features[:, i].std()
    # Find the indices of outliers (threshold = 3)
    outlier_indices = np.where(np.abs(z_scores) > 3)[0]
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
