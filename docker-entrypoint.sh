#!/bin/bash

# Docker entrypoint script for Day Planner React App
# This script handles different startup modes and configurations

set -e

# Default command
DEFAULT_CMD="nginx -g daemon off;"

# Function to show usage
show_usage() {
    echo "Day Planner Docker Container"
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start       Start the production server (default)"
    echo "  dev         Start development server"
    echo "  build       Build the application"
    echo "  test        Run tests"
    echo "  shell       Start a shell session"
    echo "  help        Show this help message"
}

# Handle different commands
case "${1:-start}" in
    start)
        echo "🚀 Starting Day Planner in production mode..."
        cd /app
        exec npm run preview -- --host 0.0.0.0 --port 4173
        ;;
    dev)
        echo "🔧 Starting Day Planner in development mode..."
        cd /app
        exec npm run dev -- --host 0.0.0.0 --port 5173
        ;;
    build)
        echo "🔨 Building Day Planner..."
        cd /app
        exec npm run build
        ;;
    test)
        echo "🧪 Running tests..."
        cd /app
        exec npm test
        ;;
    shell)
        echo "🐚 Starting shell session..."
        exec /bin/sh
        ;;
    help|--help|-h)
        show_usage
        exit 0
        ;;
    *)
        echo "❌ Unknown command: $1"
        show_usage
        exit 1
        ;;
esac
