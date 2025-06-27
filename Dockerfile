# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Stage 2: Preview server
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app /app
RUN npm install -g serve
EXPOSE 4173
CMD ["npx", "vite", "preview", "--host"]
