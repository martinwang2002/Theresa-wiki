# yarn cache directory
ARG YARN_CACHE_DIR=/usr/local/share/.cache/yarn


# Install dependencies only when needed
FROM node:16-alpine AS deps
# Set yarn cache directory
ARG YARN_CACHE_DIR
RUN yarn config set cache-folder $YARN_CACHE_DIR

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat git

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


# Rebuild the source code only when needed
FROM node:16-alpine AS builder
# SSR routes or not
ARG THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES=False
ENV THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES $THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES

RUN apk update && apk add --no-cache git

# Set yarn cache directory, copy previous cache to make yarn licenses work without fetching packages again
ARG YARN_CACHE_DIR
COPY --from=deps $YARN_CACHE_DIR $YARN_CACHE_DIR
RUN yarn config set cache-folder $YARN_CACHE_DIR

WORKDIR /app

# Copy node modules
COPY --from=deps /app/node_modules ./node_modules
# Copy source code
COPY . .
# Build next application
RUN yarn build


# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app
RUN apk update && apk add --no-cache git

ENV NODE_ENV production


RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY . .
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["yarn", "start"]
