#!/bin/bash

# my_array=("binance" "okx")
my_array=()
items=$(echo "$EXCHANGES_JSON" | sed 's/^\[//;s/\]$//;s/"//g;s/ //g')
IFS=',' read -ra my_array <<< "$items"

# Define the marker string
marker="### See our other exchanges"

# Define the README file path
readme_file="$GITHUB_WORKSPACE/README.md"

# Function to generate the list items
generate_list_items() {
  local repo_prefix="https://github.com/my/"
  local list_string=""

  for item in "${my_array[@]}"; do
    list_string+="- [**$item** python](${repo_prefix}${item})\n"
  done

  printf "%s" "$list_string"
}

# Check if the README file exists
if [ ! -f "$readme_file" ]; then
  echo "Error: README.md not found."
  exit 1
fi

# Read the README file and remove everything after the marker
content=$(sed "/$marker/q" "$readme_file")

# Generate the list items
list_items=$(generate_list_items)

# Append the marker and the new list items
new_content="$content\n$marker\n$list_items"

# Write the new content to the README file
echo -e "$new_content" > "$readme_file" # -e to process escape sequences

echo "README.md updated successfully."