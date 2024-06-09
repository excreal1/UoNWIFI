#!/bin/bash

# Define paths
CHROMIUM_DIR="$HOME/uonwifi/chromium"
SCREENSHOT_DIR="$HOME/Pictures/Screenshots"
UONWIFI_BIN="/usr/bin/uonwifi"
INSTALL_DIR="$HOME/uonwifi"

# Create the Uonwifi directory if it doesn't exist
mkdir -p "$INSTALL_DIR"

# Extract Chromium headless to $HOME/uonwifi/
echo "Extracting Chromium headless to $INSTALL_DIR..."
unzip -o chromium.zip -d "$INSTALL_DIR" >/dev/null 2>&1

# Create the Screenshots directory if it doesn't exist
echo "Creating Screenshots directory..."
mkdir -p "$SCREENSHOT_DIR"

# Copy the Uonwifi script to /usr/bin
echo "Copying uonwifi script to /usr/bin..."
sudo cp uonwifi "$UONWIFI_BIN"

# Set permissions for the script
sudo chmod +x "$UONWIFI_BIN"

echo "Installation complete! To run, use uonwifi login username password"
