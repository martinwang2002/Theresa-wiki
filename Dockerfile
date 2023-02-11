FROM node:lts-alpine AS base

RUN apk add --no-cache libc6-compat git

WORKDIR /app

# add yarn
COPY .yarnrc.yml ./
COPY .yarn/ ./.yarn/

# Install dependencies only when needed
FROM base AS deps

COPY package.json yarn.lock ./
RUN yarn install --immutable

# generate LICENSES.txt
RUN mkdir public
RUN yarn gen-license

# Rebuild the source code only when needed
FROM base AS builder

# SSR routes or not
ARG THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES=True
ENV THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES $THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES

# Build next application
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

# Copy node modules
COPY --from=deps /app/node_modules ./node_modules
# Copy source code
COPY . .
# Copy LICENSES.txt
COPY --from=deps /app/public/LICENSES.txt ./public


RUN yarn build


# Production image, copy all the files and run next
FROM base AS runner

ENV NODE_ENV production


RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

CMD ["node", "server.js"]
