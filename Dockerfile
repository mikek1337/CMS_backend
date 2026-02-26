# Use the official Node.js LTS image as the base
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the TypeScript code (if needed)
RUN pnpm run build || true

# Expose the port (change if your app uses a different port)
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
