FROM node:22

WORKDIR /app

# 1. Install pnpm bypassing corepack bugs
RUN npm install -g pnpm@latest

# 2. Copy all files into the container so the Replit workspace is recognized
COPY . .

# 3. Install all dependencies across the entire workspace
RUN pnpm install --no-frozen-lockfile

# 4. Compile the code (this generates the /dist folder your start script needs)
RUN pnpm run build

EXPOSE 8080

# 5. Tell pnpm to run the start script specifically inside the api-server folder
CMD ["pnpm", "--filter", "@workspace/api-server", "start"]
