FROM node:22

WORKDIR /app

# 1. Install pnpm bypassing corepack bugs and security blocks
RUN npm install -g pnpm@9

# 2. Copy the workspace files
COPY . .

# (Other stuff above...)
RUN pnpm install --no-frozen-lockfile

ENV PORT=8080
RUN pnpm run build
# THE FIX: Tell pnpm to strictly build the api-server (and its dependencies)
# The "..." at the end tells it to include needed database packages but skip the sandbox!
ENV PORT=8080
ENV BASE_PATH=/
RUN pnpm run build

EXPOSE 8080

# 5. Boot up the server
CMD ["pnpm", "--filter", "@workspace/api-server", "start"]
