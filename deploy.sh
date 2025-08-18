#!/bin/bash

# Day Planner React App Deployment Script
# This script helps deploy the React Day Planner to various platforms

set -e

echo "🚀 Day Planner React App Deployment Helper"
echo "==========================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    if [ -f "package.json" ]; then
        if command_exists npm; then
            npm install
        else
            echo "❌ npm not found. Please install Node.js first."
            exit 1
        fi
    fi
}

# Function to run build
run_build() {
    echo "🔨 Building React app..."
    npm run build
}

# Function to deploy to GitHub Pages
deploy_github() {
    echo "🐙 Deploying to GitHub Pages..."
    
    if [ ! -d ".git" ]; then
        echo "❌ Not a git repository. Please initialize git first."
        exit 1
    fi
    
    # Build first
    run_build
    
    # Check if gh-pages branch exists
    if git rev-parse --verify gh-pages >/dev/null 2>&1; then
        git branch -D gh-pages
    fi
    
    # Create and switch to gh-pages branch
    git checkout --orphan gh-pages
    
    # Copy dist contents to root
    cp -r dist/* .
    
    # Add and commit
    git add .
    git commit -m "Deploy React app to GitHub Pages"
    git push -f origin gh-pages
    git checkout main || git checkout master
    
    echo "✅ Deployed to GitHub Pages!"
    echo "🌐 Your app will be available at: https://username.github.io/day-planner"
}

# Function to deploy to Vercel
deploy_vercel() {
    echo "▲ Deploying to Vercel..."
    
    if ! command_exists vercel; then
        echo "📦 Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    run_build
    vercel --prod
    echo "✅ Deployed to Vercel!"
}

# Function to deploy to Netlify
deploy_netlify() {
    echo "🌐 Deploying to Netlify..."
    
    if ! command_exists netlify; then
        echo "📦 Installing Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    run_build
    netlify deploy --prod --dir=dist
    echo "✅ Deployed to Netlify!"
}

# Function to deploy to Surge
deploy_surge() {
    echo "⚡ Deploying to Surge..."
    
    if ! command_exists surge; then
        echo "📦 Installing Surge CLI..."
        npm install -g surge
    fi
    
    run_build
    surge dist day-planner-react.surge.sh
    echo "✅ Deployed to Surge!"
    echo "🌐 Your app is available at: https://day-planner-react.surge.sh"
}

# Main deployment menu
show_menu() {
    echo ""
    echo "Choose a deployment option:"
    echo "1) GitHub Pages"
    echo "2) Vercel"
    echo "3) Netlify"
    echo "4) Surge"
    echo "5) Build only"
    echo "6) Run dev server"
    echo "7) Exit"
    echo ""
}

# Process user choice
process_choice() {
    case $1 in
        1)
            install_dependencies
            deploy_github
            ;;
        2)
            install_dependencies
            deploy_vercel
            ;;
        3)
            install_dependencies
            deploy_netlify
            ;;
        4)
            install_dependencies
            deploy_surge
            ;;
        5)
            install_dependencies
            run_build
            echo "✅ Build completed! Files are in the 'dist' directory."
            ;;
        6)
            install_dependencies
            echo "🚀 Starting development server..."
            npm run dev
            ;;
        7)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option. Please try again."
            ;;
    esac
}

# Main script execution
main() {
    # Check if we're in the right directory
    if [ ! -f "package.json" ] || [ ! -f "vite.config.js" ]; then
        echo "❌ This doesn't appear to be a React/Vite project directory."
        echo "Please run this script from the day-planner root directory."
        exit 1
    fi
    
    # If argument provided, use it directly
    if [ $# -eq 1 ]; then
        process_choice $1
    else
        # Interactive mode
        while true; do
            show_menu
            read -p "Enter your choice (1-7): " choice
            process_choice $choice
            echo ""
            read -p "Press Enter to continue or Ctrl+C to exit..."
        done
    fi
}

# Make the script executable and run
main "$@"