import numpy as np

# Define the environment
environment = np.array([[0, 1, 0], [1, 0, 1], [0, 1, 0]])

# Define the Q-table
q_table = np.zeros((3, 3))

# Define the hyperparameters
learning_rate = 0.1
discount_factor = 0.9
epsilon = 0.1
num_episodes = 1000

# Q-learning algorithm
for episode in range(num_episodes):
    state = np.random.randint(0, 3)
    done = False
    
    while not done:
        if np.random.uniform(0, 1) < epsilon:
            action = np.random.randint(0, 3)
        else:
            action = np.argmax(q_table[state])
        
        next_state = np.random.choice(np.where(environment[state] == 1)[0])
        reward = 1 if environment[state][next_state] == 1 else -1
        
        q_table[state][action] = (1 - learning_rate) * q_table[state][action] + learning_rate * (reward + discount_factor * np.max(q_table[next_state]))
        
        state = next_state
        
        if np.sum(environment) == 0:
            done = True
        
        # Print the current state of the environment
        print("Episode:", episode+1)
        print("State:", state)
        print("Action:", action)
        print("Next State:", next_state)
        print("Reward:", reward)
        print("Q-table:")
        print(q_table)
        print("--------------------")

# Print the learned Q-table
print("Learned Q-table:")
print(q_table)
