#!/bin/bash
# Stop on errors
set -e

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the Next.js app
echo "Building the Next.js app..."
npm run build

# Start the app
echo "Starting the app..."
npm run start