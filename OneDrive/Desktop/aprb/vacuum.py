import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from IPython.display import HTML

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

# Function to update the environment visualization
def update_environment(frame):
    ax.clear()
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_xlim(0, 3)
    ax.set_ylim(0, 3)
    
    for i in range(3):
        for j in range(3):
            if environment[i][j] == 1:
                ax.text(j + 0.5, i + 0.5, 'D', ha='center', va='center', fontsize=20)
    
    ax.text(agent_position[1] + 0.5, agent_position[0] + 0.5, 'V', ha='center', va='center', fontsize=20, color='red')

# Create a figure and axis for the animation
fig, ax = plt.subplots()

# Initialize the agent position
agent_position = [0, 0]

# Create a list to store the agent positions for each episode
agent_positions = []

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
        
        # Store the agent position for the current episode
        agent_positions.append(agent_position.copy())
        
        # Update the agent position based on the action
        if action == 0:  # Move up
            agent_position[0] = max(agent_position[0] - 1, 0)
        elif action == 1:  # Move down
            agent_position[0] = min(agent_position[0] + 1, 2)
        elif action == 2:  # Move left
            agent_position[1] = max(agent_position[1] - 1, 0)
        elif action == 3:  # Move right
            agent_position[1] = min(agent_position[1] + 1, 2)
        
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

# Create the animation
ani = animation.FuncAnimation(fig, update_environment, frames=len(agent_positions), interval=500)

# Convert the animation to HTML
html = ani.to_html5_video()

# Display the animation
HTML(html)
