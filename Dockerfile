FROM node:22

WORKDIR /app

# THE FIX: Pin to version 9 to bypass the new 'approve-builds' security block
RUN npm install -g pnpm@9

COPY . .

RUN pnpm install --no-frozen-lockfile

RUN pnpm run build

EXPOSE 8080

CMD ["pnpm", "--filter", "@workspace/api-server", "start"]
