FROM node:14-alpine3.14

ARG POSTGRES_URL
ARG POSTGRES_USER
ARG POSTGRES_PASSWORD

COPY . /app
WORKDIR /app
RUN yarn install --silent

CMD [ "yarn", "start" ]
