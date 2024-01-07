# Stage 1: Build the Svelte application
FROM node:latest as build-stage
WORKDIR /app
COPY . /app
RUN yarn install
RUN echo "DB_PATH=/app/data/chinook.db" > /app/.env
RUN yarn build 

# Final Stage
FROM node:latest
WORKDIR /app
COPY --from=build-stage /app/build /app/build
COPY --from=build-stage /app/package.json /app/yarn.lock /app/
COPY --from=build-stage /app/.env /app/.env
RUN yarn install --production
RUN yarn cache clean

CMD ["node", "build/index.js"]
