FROM node:22

WORKDIR /app

# 1. Install pnpm globally using npm instead of corepack
RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml ./

# 2. Run a standard install without the strict lockfile constraint
RUN pnpm install

COPY . .

EXPOSE 8080

CMD ["pnpm", "start"]
