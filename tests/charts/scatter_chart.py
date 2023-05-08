import csv
import matplotlib.pyplot as plt

# Load data from CSV files
def load_data(filename):
    data = []
    with open(filename, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header row
        for row in reader:
            data.append(float(row[0]))
    return data

# Load data from CSV files
without_extension_data = load_data('../times/output-off.csv')
with_extension_data = load_data('../times/output-on.csv')

# Generate scatter plot
website_indices = range(1, len(without_extension_data) + 1)
plt.scatter(website_indices, without_extension_data, marker='.', s=20*2**2, color='#2563eb', label='Extension disabled')
plt.scatter(website_indices, with_extension_data, marker='+', s=20*2**2, color='#dc2626', label='Extension enabled')

# Label the axes
plt.xlabel('Iteration')
plt.ylabel('Response time (ms)')

# Add a legend
plt.legend()

# Optional: Set the range of y-axis
plt.ylim(min(min(without_extension_data), min(with_extension_data)) - 5,
         max(max(without_extension_data), max(with_extension_data)) + 5)

# Save the plot as an image file
plt.savefig('./out/response_times_comparison.pdf')

# Display the plot
plt.show()