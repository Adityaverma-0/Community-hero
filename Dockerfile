FROM node:22

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

# THE FIX IS HERE: We removed --frozen-lockfile
RUN pnpm install --no-frozen-lockfile

COPY . .

EXPOSE 8080

CMD ["pnpm","start"]
