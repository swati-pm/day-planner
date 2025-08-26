# GitHub Actions Workflows

This directory contains GitHub Actions workflows for automated building and deployment of the Day Planner application.

## 🚀 Available Workflows

### 1. Frontend Docker Build (`docker-frontend.yml`)
**Purpose**: Builds and pushes the React frontend Docker image to GitHub Container Registry.

**Triggers**:
- Push to `master` or `main` branch
- Changes to frontend files (`src/**`, `public/**`, `package*.json`, etc.)
- Manual workflow dispatch

**Image**: `ghcr.io/{username}/day-planner-frontend`

### 2. Backend Docker Build (`docker-backend.yml`)
**Purpose**: Builds and pushes the Node.js backend API Docker image to GitHub Container Registry.

**Triggers**:
- Push to `master` or `main` branch  
- Changes to backend files (`src/**`, `package*.json`, `tsconfig.json`, etc.)
- Manual workflow dispatch

**Image**: `ghcr.io/{username}/day-planner-backend`

### 3. Full Stack Build (`docker-fullstack.yml`)
**Purpose**: Coordinates building both frontend and backend images with advanced features.

**Triggers**:
- Push to `master` or `main` branch
- Git tags (e.g., `v1.0.0`)
- Manual workflow dispatch with environment selection

**Features**:
- Parallel builds for faster execution
- Coordinated deployment
- Build attestations for security
- Deployment summaries
- Support for staging/production environments

### 4. Legacy Deploy (`deploy.yml`)
**Purpose**: Original deployment workflow for static hosting (GitHub Pages, Netlify, etc.)

**Status**: Maintained for backward compatibility

## 🔧 Setup Instructions

### 1. Repository Configuration

#### Enable Package Permissions
1. Go to repository **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select **"Read and write permissions"**
3. Check **"Allow GitHub Actions to create and approve pull requests"**

#### Package Visibility (Optional)
By default, packages are private. To make them public:
1. Navigate to `https://github.com/users/{username}/packages`
2. Find your package → **Package settings**
3. **Danger Zone** → **Change package visibility** → **Public**

### 2. Secrets Configuration

#### Required Secrets (None for basic setup)
The workflows use `GITHUB_TOKEN` which is automatically provided. No additional secrets needed for basic Docker image building.

#### Optional Secrets (For advanced deployments)
If using the workflows with external services:

```bash
# Google OAuth (if building with auth features)
GOOGLE_CLIENT_ID          # Your Google OAuth client ID
GOOGLE_CLIENT_SECRET      # Your Google OAuth client secret

# Deployment tokens (if deploying to external services)
DEPLOY_TOKEN              # Custom deployment token
KUBE_CONFIG              # Kubernetes configuration (base64 encoded)
```

### 3. Environment Variables

#### Automatic Variables
- `GITHUB_REPOSITORY_OWNER`: Your GitHub username/organization
- `GITHUB_TOKEN`: Automatically provided authentication token
- `GITHUB_SHA`: Commit SHA for image tagging

#### Customizable Variables
Edit the workflows to customize:

```yaml
env:
  REGISTRY: ghcr.io                    # Container registry
  IMAGE_NAME: day-planner-frontend     # Image name
```

## 📋 Usage Guide

### Automatic Triggers

#### Push to Master
```bash
git add .
git commit -m "feat: add new feature"
git push origin master
# ✅ Triggers individual workflows automatically
```

#### Create Release Tag
```bash
git tag v1.0.0
git push origin v1.0.0
# ✅ Triggers full stack workflow with semantic versioning
```

### Manual Triggers

#### Individual Workflows
1. Go to **Actions** tab in GitHub
2. Select **"Build and Push Frontend Docker Image"** or **"Build and Push Backend Docker Image"**
3. Click **"Run workflow"**
4. Select branch and click **"Run workflow"**

#### Full Stack Workflow
1. Go to **Actions** tab in GitHub
2. Select **"Build and Push Full Stack Docker Images"**
3. Click **"Run workflow"**
4. Choose deployment environment (staging/production)
5. Click **"Run workflow"**

### Using Built Images

#### Pull Images
```bash
# Pull latest images
docker pull ghcr.io/{username}/day-planner-frontend:latest
docker pull ghcr.io/{username}/day-planner-backend:latest

# Pull specific version
docker pull ghcr.io/{username}/day-planner-frontend:v1.0.0
```

#### Run with Docker Compose
```bash
# Using production compose file
GITHUB_USERNAME={username} docker-compose -f docker-compose.prod.yml up -d
```

## 🏷️ Image Tagging Strategy

### Automatic Tags
- **`latest`**: Latest build from default branch
- **`master-{sha}`**: Build from master with commit SHA
- **`v1.0.0`**: Semantic version tags from Git tags
- **`v1.0`**: Major.minor version tags

### Manual Tags
- **`staging`**: Manual deployment to staging environment
- **`production`**: Manual deployment to production environment

### Tag Examples
```bash
ghcr.io/username/day-planner-frontend:latest
ghcr.io/username/day-planner-frontend:master-a1b2c3d
ghcr.io/username/day-planner-frontend:v1.2.0
ghcr.io/username/day-planner-frontend:staging
```

## 🔍 Monitoring Workflows

### View Workflow Status
1. **Actions** tab → Select workflow run
2. View real-time logs and status
3. Download logs for offline analysis

### Build Artifacts
- **Container images**: Automatically pushed to GHCR
- **Build attestations**: Security provenance information
- **Deployment summaries**: Available in workflow summary

### Common Status Indicators
- ✅ **Success**: Image built and pushed successfully
- ❌ **Failure**: Check logs for build errors
- 🟡 **In Progress**: Workflow currently running
- ⭕ **Cancelled**: Workflow was manually cancelled

## 🐛 Troubleshooting

### Common Issues

#### 1. Permission Denied Errors
```
Error: failed to push: access denied
```
**Solutions**:
- Check repository permissions (Settings → Actions → General)
- Verify package visibility settings
- Ensure GITHUB_TOKEN has package write permissions

#### 2. Docker Build Failures
```
Error: failed to solve: failed to read dockerfile
```
**Solutions**:
- Verify Dockerfile exists and is valid
- Check file paths in workflow context
- Review build logs for specific error details

#### 3. Context Path Issues
```
Error: failed to solve: failed to copy files
```
**Solutions**:
- Ensure all required files are committed to repository
- Check .gitignore doesn't exclude necessary files
- Verify build context in workflow configuration

#### 4. Rate Limiting
```
Error: rate limit exceeded
```
**Solutions**:
- Wait for rate limit reset
- Use GitHub Pro for higher limits
- Optimize workflows to reduce API calls

### Debug Commands

#### Workflow Debugging
```bash
# Enable debug logging (add to workflow env)
ACTIONS_STEP_DEBUG: true
ACTIONS_RUNNER_DEBUG: true
```

#### Local Testing
```bash
# Test Docker build locally
docker build -t test-image .

# Test with same platform as workflow
docker buildx build --platform linux/amd64,linux/arm64 -t test-image .
```

#### Verify Images
```bash
# Check if image was pushed
docker pull ghcr.io/{username}/day-planner-frontend:latest

# Inspect image metadata
docker inspect ghcr.io/{username}/day-planner-frontend:latest
```

## ⚡ Performance Optimization

### Build Caching
- **GitHub Actions Cache**: Automatically enabled for faster builds
- **Docker BuildKit**: Uses advanced caching strategies
- **Multi-platform**: Parallel builds for different architectures

### Resource Optimization
```yaml
# Optimize for faster builds
strategy:
  matrix:
    platform: [linux/amd64, linux/arm64]
```

### Parallel Execution
- Frontend and backend build simultaneously
- Multiple platforms build in parallel
- Attestations generated concurrently

## 🔒 Security Best Practices

### Image Security
- **Multi-stage builds**: Minimal production images
- **Non-root users**: Containers run as unprivileged users
- **Vulnerability scanning**: Enabled via GitHub Advanced Security
- **Build attestations**: Cryptographic proof of build integrity

### Access Control
- **Least privilege**: Workflows only have necessary permissions
- **Branch protection**: Protect main branches from direct pushes
- **Required reviews**: Require PR reviews for workflow changes

### Secret Management
```yaml
# Use GitHub Secrets for sensitive data
environment:
  GOOGLE_CLIENT_ID: ${{ secrets.GOOGLE_CLIENT_ID }}
```

## 📈 Advanced Configuration

### Custom Runners
```yaml
# Use self-hosted runners for private repositories
runs-on: [self-hosted, linux, x64]
```

### Environment-Specific Builds
```yaml
# Different configurations per environment
environment: 
  name: production
  url: https://day-planner.com
```

### Matrix Builds
```yaml
# Build multiple variants
strategy:
  matrix:
    node-version: [18, 20]
    platform: [linux/amd64, linux/arm64]
```

## 📝 Contributing

### Workflow Changes
1. Test changes in a fork first
2. Update documentation for configuration changes
3. Ensure backward compatibility
4. Add comments for complex logic

### Adding New Workflows
1. Follow existing naming conventions
2. Include appropriate triggers and permissions
3. Add documentation to this README
4. Test thoroughly before merging

---

For deployment instructions, see [DOCKER-DEPLOYMENT.md](../DOCKER-DEPLOYMENT.md)

