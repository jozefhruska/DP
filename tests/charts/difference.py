import csv

# Load data from CSV files
def load_data(filename):
    data = []
    with open(filename, 'r') as file:
        reader = csv.reader(file)
        next(reader)  # Skip the header row
        for row in reader:
            data.append(float(row[0]))
    return data

# Calculate the average difference between two datasets
def average_difference(data1, data2):
    differences = [abs(a - b) for a, b in zip(data1, data2)]
    avg_difference = sum(differences) / len(differences)
    return avg_difference

# Load data from CSV files
without_extension_data = load_data('../times/output-off.csv')
with_extension_data = load_data('../times/output-on.csv')

# Calculate the average difference between datasets
avg_diff = average_difference(without_extension_data, with_extension_data)

print(f"Average difference between datasets: {avg_diff:.2f} ms")
