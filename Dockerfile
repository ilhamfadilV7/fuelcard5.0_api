FROM node:lts-alpine
WORKDIR /app
COPY . /app
RUN npm update
EXPOSE 2024
CMD node app.js