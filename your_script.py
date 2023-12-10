import pandas as pd
import matplotlib.pyplot as plt

# Read the CSV file
data = pd.read_csv('OnlineNewsPopularity.csv')

# Perform data preprocessing
# Drop irrelevant columns
data = data.drop(['url', 'timedelta'], axis=1)

# Handle missing values
data = data.dropna()

# Normalize numerical features
numerical_features = ['n_tokens_title', 'n_tokens_content', 'num_imgs', 'num_videos']
data[numerical_features] = data[numerical_features].apply(lambda x: (x - x.min()) / (x.max() - x.min()))

# Encode categorical features
categorical_features = ['weekday', 'is_weekend', 'data_channel']
data = pd.get_dummies(data, columns=categorical_features)

# Plot a graph for outliers
# ... your code to identify and plot outliers goes here ...

# Show the plot
plt.show()
