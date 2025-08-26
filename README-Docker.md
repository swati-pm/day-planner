# 🐳 Docker Setup for Day Planner

This guide explains how to run the Day Planner React application using Docker.

## 📋 Prerequisites

- Docker installed on your system
- Docker Compose (usually comes with Docker Desktop)

## 🚀 Quick Start

### Option 1: Using Docker Compose (Recommended)

```bash
# Run in production mode
npm run docker:prod

# Run in development mode
npm run docker:dev

# Stop the containers
npm run docker:down
```

### Option 2: Using Docker directly

```bash
# Build the image
npm run docker:build

# Run the container
npm run docker:run

# Stop and remove the container
npm run docker:stop
```

## 📦 Available Docker Commands

### NPM Scripts
```bash
npm run docker:build        # Build production image (linux/amd64)
npm run docker:build-multi  # Build multi-platform image (amd64 + arm64)
npm run docker:run          # Run production container
npm run docker:stop         # Stop and remove container
npm run docker:dev          # Start development environment
npm run docker:prod         # Start production environment
npm run docker:down         # Stop all services
npm run docker:logs         # View container logs
npm run docker:clean        # Clean up Docker system
npm run docker:inspect      # Check image architecture
```

### Direct Docker Commands
```bash
# Build production image (linux/amd64)
docker build --platform linux/amd64 -t day-planner:latest .

# Build development image (linux/amd64)
docker build --platform linux/amd64 -f Dockerfile.dev -t day-planner:dev .

# Build multi-platform image (requires buildx)
docker buildx build --platform linux/amd64,linux/arm64 -t day-planner:latest .

# Run production container
docker run --platform linux/amd64 -d -p 4173:4173 --name day-planner day-planner:latest

# Run development container
docker run -d -p 5173:5173 -v $(pwd):/app --name day-planner-dev day-planner:dev

# View logs
docker logs day-planner

# Stop container
docker stop day-planner
```

## 🌍 Accessing the Application

### Production Mode
- **URL**: http://localhost:4173
- **Port**: 4173
- **Server**: Vite preview server serving built React app

### Development Mode
- **URL**: http://localhost:5173
- **Port**: 5173
- **Server**: Vite dev server with HMR

## 🏗️ Docker Images

### Production Image (`Dockerfile`)
- **Base**: Node.js 18 Alpine (linux/amd64)
- **Platform**: linux/amd64 (x86_64 compatible)
- **Size**: ~400MB (includes Vite for serving)
- **Features**:
  - Vite preview server for production
  - Built-in compression and optimization
  - Fast startup and low memory usage
  - Health checks included
  - Service Worker support
  - PWA manifest served correctly
  - Cross-platform deployment ready

### Development Image (`Dockerfile.dev`)
- **Base**: Node.js 18 Alpine (linux/amd64)
- **Platform**: linux/amd64 (x86_64 compatible)
- **Size**: ~400MB (includes dev dependencies)
- **Features**:
  - Hot Module Replacement (HMR)
  - Volume mounting for live code changes
  - All development tools included
  - Debug-friendly configuration
  - Cross-platform development support

## 🔧 Configuration Files

### `Dockerfile`
Single-stage production build (linux/amd64):
1. Uses Node.js 18 Alpine with platform specification
2. Installs dependencies (including Vite for preview)
3. Builds the React app
4. Serves the app using Vite preview server

### `Dockerfile.dev`
Single-stage development build (linux/amd64) for hot reloading and development tools.

### `docker-compose.yml`
Orchestrates both production and development environments:
- **Default profile**: Production mode
- **Dev profile**: Development mode with volume mounting

### `.dockerignore`
Excludes unnecessary files from Docker build context for faster builds.

## 📊 Container Details

### Resource Usage
- **Production**: ~100MB RAM, minimal CPU
- **Development**: ~200MB RAM, moderate CPU

### Health Checks
Both containers include health checks to monitor application status:
- **Production**: HTTP check on port 4173
- **Development**: HTTP check on port 5173

### Security
- Non-root user execution
- Minimal attack surface (Alpine Linux)
- Security headers configured
- No unnecessary packages installed

## 🛠️ Development Workflow

### Live Development with Docker
```bash
# Start development environment
npm run docker:dev

# Your code changes will be reflected immediately
# No need to rebuild the container for code changes
```

### Building for Production
```bash
# Build and test production image
npm run docker:build
npm run docker:run

# Test the production build
open http://localhost:4173
```

## 🚢 Deployment

### Container Registry
```bash
# Tag for registry
docker tag day-planner:latest your-registry.com/day-planner:latest

# Push to registry
docker push your-registry.com/day-planner:latest
```

### Cloud Deployment
The Docker image can be deployed to:
- **AWS ECS/Fargate**
- **Google Cloud Run**
- **Azure Container Instances**
- **DigitalOcean App Platform**
- **Railway**
- **Fly.io**
- **Bunny.net Magic Containers**

**Note for Bunny.net Magic Containers:**
The app is pre-configured to work with Bunny.net's dynamic hostnames. The `NODE_ENV=production` setting automatically allows all hosts for maximum compatibility.

### Kubernetes
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: day-planner
spec:
  replicas: 3
  selector:
    matchLabels:
      app: day-planner
  template:
    metadata:
      labels:
        app: day-planner
    spec:
      containers:
      - name: day-planner
        image: day-planner:latest
        ports:
        - containerPort: 4173
        resources:
          requests:
            memory: "100Mi"
            cpu: "50m"
          limits:
            memory: "300Mi"
            cpu: "200m"
```

## 🐛 Troubleshooting

### Common Issues

**Container won't start:**
```bash
# Check logs
docker logs day-planner

# Check if port is already in use
lsof -i :4173
```

**Blocked host error on cloud platforms (Bunny.net, etc.):**
```
Blocked request. This host ("hostname") is not allowed.
```
**Solution:** The app is configured to automatically allow all hosts in production mode. If you still get this error:
1. Ensure `NODE_ENV=production` is set in your deployment environment
2. Use the `preview:cloud` script for cloud deployments
3. Rebuild and redeploy your container

**Development hot reload not working:**
```bash
# Ensure volume mounting is correct
docker run -v $(pwd):/app -p 5173:5173 day-planner:dev
```

**Image build fails:**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker build --no-cache -t day-planner:latest .
```

### Performance Optimization

**Optimize image size:**
- Alpine Linux base images (already implemented)
- .dockerignore file (already implemented)
- Minimal dependencies approach

**Improve build speed:**
- Layer caching optimization
- Dependency pre-installation
- Parallel builds

## 📝 Best Practices

1. **Use Vite preview server** for production (✅ implemented)
2. **Use .dockerignore** to exclude unnecessary files (✅ implemented)
3. **Run as non-root user** for security (✅ implemented)
4. **Include health checks** for monitoring (✅ implemented)
5. **Use Alpine images** for smaller size (✅ implemented)
6. **Configure proper caching** headers (✅ implemented)
7. **Enable compression** for better performance (✅ implemented)

---

**Happy Dockerizing! 🐳**
