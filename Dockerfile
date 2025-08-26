# Dockerfile for Day Planner React App using Vite
# Target platform: linux/amd64

FROM --platform=linux/amd64 node:18-alpine AS production

# Set working directory
WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for Vite preview)
RUN npm ci --silent

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Add labels for metadata
LABEL maintainer="Day Planner Team"
LABEL description="Day Planner - A beautiful, modern React web application for task management"
LABEL version="1.0.0"

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S vite -u 1001 -G nodejs

# Change ownership of the app directory
RUN chown -R vite:nodejs /app
USER vite

# Set production environment for cloud deployments
ENV NODE_ENV=production

# Expose Vite preview port
EXPOSE 4173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4173/ || exit 1

# Start Vite preview server with proper host configuration
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
