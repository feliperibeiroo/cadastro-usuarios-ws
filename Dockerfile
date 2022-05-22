FROM node:14-alpine3.14

ENV PORT 8080

COPY . /app
WORKDIR /app
RUN yarn install --silent

EXPOSE 8080

CMD [ "yarn", "start" ]
