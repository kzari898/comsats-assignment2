#!/bin/bash
set -e

echo "--- Installing Node.js production dependencies ---"
cd /var/app/staging
npm ci --omit=dev

echo "--- Dependencies installed, skipping build (pre-built) ---"
