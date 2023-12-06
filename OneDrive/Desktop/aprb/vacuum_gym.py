import numpy as np
import gym

# Define the environment
environment = np.array([[0, 1, 0], [1, 0, 1], [0, 1, 0]])

# Define the Q-table
q_table = np.zeros((3, 3))

# Define the hyperparameters
learning_rate = 0.1
discount_factor = 0.9
epsilon = 0.1
num_episodes = 1000

# Function to display the environment and vacuum cleaner position
def display_environment(state):
    symbols = {0: ' ', 1: 'D'}
    for i in range(3):
        row = ''
        for j in range(3):
            if i == state and environment[i][j] == 1:
                row += 'V'
            else:
                row += symbols[environment[i][j]]
        print(row)
    print()

# Create the gym environment
env = gym.make('FrozenLake-v0')

# Q-learning algorithm
for episode in range(num_episodes):
    state = env.reset()
    done = False
    
    while not done:
        if np.random.uniform(0, 1) < epsilon:
            action = env.action_space.sample()
        else:
            action = np.argmax(q_table[state])
        
        next_state, reward, done, _ = env.step(action)
        
        q_table[state][action] = (1 - learning_rate) * q_table[state][action] + learning_rate * (reward + discount_factor * np.max(q_table[next_state]))
        
        state = next_state
        
        # Print the current state of the environment
        print("Episode:", episode+1)
        display_environment(state)
        print("Action:", action)
        print("Next State:", next_state)
        print("Reward:", reward)
        print("Q-table:")
        print(q_table)
        print("--------------------")

# Print the learned Q-table
print("Learned Q-table:")
print(q_table)
