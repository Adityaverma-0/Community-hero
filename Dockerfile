FROM node:22

WORKDIR /app

# 1. Install pnpm bypassing corepack bugs and security blocks
RUN npm install -g pnpm@9

# 2. Copy the workspace files
COPY . .

# 3. Install dependencies across the workspace
RUN pnpm install --no-frozen-lockfile

# THE FIX: Tell pnpm to strictly build the api-server (and its dependencies)
# The "..." at the end tells it to include needed database packages but skip the sandbox!
RUN pnpm --filter "@workspace/api-server..." run build

EXPOSE 8080

# 5. Boot up the server
CMD ["pnpm", "--filter", "@workspace/api-server", "start"]
