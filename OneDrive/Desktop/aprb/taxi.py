import gym
import numpy as np
import random
from IPython.display import clear_output

env = gym.make("Taxi-v3", render_mode="human")
env.reset()
env.render()
state = env.encode(3, 1, 2, 0)  # (taxi row, taxi column, passenger index, destination index)

env.s = state

q_table = np.zeros([env.observation_space.n, env.action_space.n])
# Hyperparameters
alpha = 0.1
gamma = 0.6
epsilon = 0.1 #hyperparameter that controls the exploration-exploitation trade-off in the Q-learning algorithm

# For plotting metrics
all_epochs = []
all_penalties = []

# Set the goal for the average reward
goal_average_reward = 50
reward_history = []

for i in range(1, 100001):
    state, _ = env.reset()
    epochs, penalties, total_reward = 0, 0, 0
    done = False

    while not done:
        if random.uniform(0, 1) < epsilon: #checks whether the randomly generated number is less than the exploration rate epsilon. If this condition is true, it means that the agent will choose to explore.
            action = env.action_space.sample()  # Explore action space
        else:
            action = np.argmax(q_table[state])  # Exploit learned values

        next_state, reward, done, info, _ = env.step(action)

        # Modify rewards to encourage the agent to take the passenger to the building
        if reward == -10:  # Incorrect drop-off
            reward = -30
            penalties += 1
        elif reward == 20:  # Correct drop-off
            reward = 50

        old_value = q_table[state, action]
        next_max = np.max(q_table[next_state])

        new_value = (1 - alpha) * old_value + alpha * (reward + gamma * next_max)
        q_table[state, action] = new_value

        state = next_state
        epochs += 1
        total_reward += reward

    reward_history.append(total_reward)

    # Print Q-table and visualize environment after each iteration
    if i % 100 == 0:
        clear_output(wait=True)
        print(f"Episode: {i}")
        print("Q-Table:")
        print(q_table)
        print("\nVisualization:")
        env.render()

    # Check if the average reward has reached the goal
    if i >= 100 and np.mean(reward_history[-100:]) >= goal_average_reward:
        print(f"Achieved the goal average reward after {i} episodes!")
        break

env.close()

# Print the average reward after each episode
for episode, reward in enumerate(reward_history, 1):
    print(f"Episode {episode}: Average Reward = {reward}")

print("Training finished.")
