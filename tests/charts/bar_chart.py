import pandas as pd
import matplotlib.pyplot as plt

# Read data from CSV file
def load_data(filename):
    df = pd.read_csv(filename, sep='|')
    return df

# Generate a bar chart for a selected header
def generate_bar_chart(df, header):
    # Count the frequency of each unique value in the selected header
    value_counts = df[header].value_counts().sort_index()

    # Generate the bar chart
    fig, ax = plt.subplots()
    value_counts.plot.bar(ax=ax, color='#1e293b', width=0.7)

    # Calculate N/M
    N = len(df)
    M = len(value_counts)
    average_frequency = N / M

    # Add the horizontal line at N/M
    ax.axhline(y=average_frequency, color='#dc2626', linestyle='-', linewidth=2)

    # Set the title and labels
    ax.set_title(header)
    ax.set_xlabel('Values')
    ax.set_ylabel('Frequency')

    # Rotate the x-axis labels and adjust their alignment
    plt.xticks(rotation=30, ha='right')

    # Adjust layout to prevent label overflow
    fig.tight_layout()

    # Save the plot as an image file
    plt.savefig(f'./out/bar_chart_{header}.pdf')

    # Display the plot
    plt.show()


# Load data from the CSV file
data = load_data('../headers/output.csv')

# Choose the header for which you want to generate a bar chart
selected_header = 'Accept-Language'

# Generate the bar chart for the selected header
generate_bar_chart(data, selected_header)
