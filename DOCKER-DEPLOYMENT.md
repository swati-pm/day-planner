# Docker Deployment with GitHub Actions

This guide explains how to use the GitHub Actions workflows to automatically build and push Docker images to GitHub Container Registry (GHCR) for both the Day Planner frontend and backend applications.

## 🚀 Workflows Overview

### 1. Individual Application Workflows

#### Frontend Workflow (`docker-frontend.yml`)
- **Triggers**: Push to `master`/`main` branch, changes to frontend files
- **Image**: `ghcr.io/{username}/day-planner-frontend`
- **Platforms**: `linux/amd64`, `linux/arm64`

#### Backend Workflow (`docker-backend.yml`)  
- **Triggers**: Push to `master`/`main` branch, changes to backend files
- **Image**: `ghcr.io/{username}/day-planner-backend`
- **Platforms**: `linux/amd64`, `linux/arm64`

### 2. Full Stack Workflow (`docker-fullstack.yml`)
- **Triggers**: Push to `master`/`main`, tags, manual dispatch
- **Builds**: Both frontend and backend in parallel
- **Features**: Coordinated deployment, attestations, deployment summary

## 📋 Prerequisites

### 1. GitHub Container Registry Setup

The workflows use GitHub's built-in `GITHUB_TOKEN` which automatically has the necessary permissions. No additional setup is required for GHCR authentication.

### 2. Repository Permissions

Ensure your repository has the following permissions enabled:
- **Settings** → **Actions** → **General** → **Workflow permissions**
- Select **"Read and write permissions"**
- Check **"Allow GitHub Actions to create and approve pull requests"**

### 3. Package Visibility

By default, packages are private. To make them public:
1. Go to your package page: `https://github.com/users/{username}/packages/container/{package-name}`
2. Click **"Package settings"**
3. Scroll to **"Danger Zone"** → **"Change package visibility"**
4. Select **"Public"**

## 🔧 Configuration

### Environment Variables

The workflows automatically detect your GitHub username and repository name. No manual configuration needed.

### Custom Configuration

You can customize the workflows by modifying these files:

```yaml
# .github/workflows/docker-frontend.yml
env:
  REGISTRY: ghcr.io
  IMAGE_NAME: day-planner-frontend  # Change this for custom image name
```

### Dockerfile Optimization

Both applications use multi-stage builds for optimal image size:

- **Frontend**: Uses Vite preview server for production
- **Backend**: Separates build and runtime stages

## 🏃‍♂️ Usage

### Automatic Deployment

1. **Push to master/main**: Automatically triggers individual workflows
2. **Create a tag**: Triggers full stack workflow with semantic versioning
3. **Manual trigger**: Use "Actions" tab to run workflows manually

### Manual Deployment

```bash
# Trigger individual workflows
git push origin master

# Trigger full stack workflow with tag
git tag v1.0.0
git push origin v1.0.0

# Manual workflow dispatch (via GitHub UI)
# Go to Actions → Select workflow → Run workflow
```

### Pull and Run Images

```bash
# Pull latest images
docker pull ghcr.io/{username}/day-planner-frontend:latest
docker pull ghcr.io/{username}/day-planner-backend:latest

# Run with docker-compose
docker-compose -f docker-compose.prod.yml up -d

# Or run individually
docker run -d -p 4173:4173 ghcr.io/{username}/day-planner-frontend:latest
docker run -d -p 3001:3001 ghcr.io/{username}/day-planner-backend:latest
```

## 🐳 Docker Compose for Production

Create a `docker-compose.prod.yml` file:

```yaml
version: '3.8'

services:
  backend:
    image: ghcr.io/{username}/day-planner-backend:latest
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
      - GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
      - GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
      - JWT_SECRET=${JWT_SECRET}
      - SESSION_SECRET=${SESSION_SECRET}
    volumes:
      - backend_data:/app/data
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "const http = require('http'); const options = { hostname: 'localhost', port: 3001, path: '/api/health', timeout: 2000 }; const req = http.request(options, (res) => { process.exit(res.statusCode === 200 ? 0 : 1); }); req.on('error', () => { process.exit(1); }); req.end();"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    image: ghcr.io/{username}/day-planner-frontend:latest
    ports:
      - "4173:4173"
    environment:
      - NODE_ENV=production
      - VITE_API_BASE_URL=http://localhost:3001/api
      - VITE_GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
    depends_on:
      backend:
        condition: service_healthy
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4173/"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  backend_data:
    driver: local

networks:
  default:
    driver: bridge
```

## 🏷️ Image Tagging Strategy

The workflows use a comprehensive tagging strategy:

- **`latest`**: Latest build from default branch
- **`master-{sha}`**: Build from master branch with commit SHA
- **`v1.0.0`**: Semantic version tags
- **`v1.0`**: Major.minor version tags
- **`staging`**: Manual deployments to staging
- **`production`**: Manual deployments to production

## 🔍 Monitoring and Troubleshooting

### View Workflow Runs
1. Go to your repository → **Actions** tab
2. Select the workflow you want to monitor
3. Click on a specific run to see detailed logs

### Common Issues

#### 1. Permission Denied
```
Error: buildx failed with: ERROR: failed to solve: failed to push
```
**Solution**: Check repository permissions and package visibility settings.

#### 2. Context Path Issues
```
Error: failed to solve: failed to read dockerfile
```
**Solution**: Verify Dockerfile paths in workflow configuration.

#### 3. Build Failures
```
Error: Process completed with exit code 1
```
**Solution**: Check build logs, ensure dependencies are correctly installed.

### Debug Commands

```bash
# Check if images are pushed successfully
docker pull ghcr.io/{username}/day-planner-frontend:latest

# Inspect image metadata
docker inspect ghcr.io/{username}/day-planner-frontend:latest

# View image layers
docker history ghcr.io/{username}/day-planner-frontend:latest
```

## 🚀 Production Deployment

### Option 1: Cloud Platforms

Deploy to any cloud platform that supports Docker:

```bash
# AWS ECS/Fargate
aws ecs update-service --cluster my-cluster --service day-planner --force-new-deployment

# Google Cloud Run
gcloud run deploy day-planner --image ghcr.io/{username}/day-planner-frontend:latest

# Azure Container Instances
az container create --resource-group myResourceGroup --name day-planner --image ghcr.io/{username}/day-planner-frontend:latest
```

### Option 2: Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: day-planner-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: day-planner-frontend
  template:
    metadata:
      labels:
        app: day-planner-frontend
    spec:
      containers:
      - name: frontend
        image: ghcr.io/{username}/day-planner-frontend:latest
        ports:
        - containerPort: 4173
```

### Option 3: VPS/Dedicated Server

```bash
# Create production environment file
cp .env.example .env.production

# Deploy with docker-compose
docker-compose -f docker-compose.prod.yml --env-file .env.production up -d

# Set up reverse proxy (nginx example)
# Point nginx to http://localhost:4173 for frontend
# Point nginx to http://localhost:3001 for API
```

## 📝 Next Steps

1. **Set up monitoring**: Add health checks and monitoring (Prometheus, Grafana)
2. **Configure secrets**: Use GitHub Secrets for sensitive environment variables
3. **Set up staging**: Create staging environment for testing
4. **Add security scanning**: Integrate Snyk or similar tools for vulnerability scanning
5. **Implement rollback**: Set up automated rollback on deployment failures

## 🤝 Contributing

When contributing to the workflows:
1. Test changes in a fork first
2. Update documentation for any configuration changes
3. Ensure backwards compatibility
4. Add appropriate comments for complex workflow logic

---

For more information about GitHub Container Registry, visit: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry

