#!/bin/bash

set -euo pipefail

CONTAINER_NAME="localstack"

# Function to check if container exists
container_exists() {
    podman ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"
}

# Function to check if container is running
container_running() {
    podman ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"
}

# Function to stop and remove container
cleanup() {
    echo "Cleaning up container..."
    if container_running; then
        podman stop ${CONTAINER_NAME}
    fi
    if container_exists; then
        podman rm ${CONTAINER_NAME}
    fi
}

# Set up trap to catch exit signals
trap cleanup EXIT

# Main logic
if container_running; then
    echo "Container is already running"
    exit 0
fi

if container_exists; then
    echo "Removing existing stopped container"
    podman rm ${CONTAINER_NAME}
fi

# Run the container
podman run \
  -p 4566:4566 \
  -p 4510-4559:4510-4559 \
  -e DEBUG="${DEBUG:-0}" \
  --name ${CONTAINER_NAME} \
  docker.io/localstack/localstack:4.0.3@sha256:17c2f79ca4e1f804eb912291a19713d4134806325ef0d21d4c1053161dfa72d0
