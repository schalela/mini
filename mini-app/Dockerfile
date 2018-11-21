# Create the builder image using 10.12.0-alpine
FROM node:10.12.0-alpine AS builder

RUN mkdir app/
WORKDIR app/

COPY . .

RUN yarn
RUN yarn build

# Create the release image using 10.12.0-alpine
FROM node:10.12.0-alpine

RUN mkdir app/
WORKDIR app/

# Copy both the package.json and yarn.lock file to the release image
COPY package.json yarn.lock* ./
# Install dependencies (exclude devDependencies)
RUN yarn install --production=true

COPY --from=builder /app/frontend/.next ./frontend/.next
COPY --from=builder /app/server ./server

EXPOSE 3000

ENV NODE_ENV=production

CMD yarn start
