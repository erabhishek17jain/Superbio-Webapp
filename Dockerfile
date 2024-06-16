FROM node:18-alpine AS builder

ARG BUILD_ENV=test

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN if [ "$BUILD_ENV" = "production" ]; then \
      echo "Building for production environment"; \
      export NODE_ENV=production; \
      yarn build:production; \
    else \
      echo "Building for test environment"; \
      export NODE_ENV=test; \
      yarn build:test; \
    fi

EXPOSE 3000

CMD ["node_modules/next/dist/bin/next", "start"]