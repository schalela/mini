# Create the release image using 10.12.0-alpine
FROM node:10.12.0-alpine

COPY . .
RUN yarn install --production=true

EXPOSE 8000

ENV NODE_ENV=production

CMD yarn start