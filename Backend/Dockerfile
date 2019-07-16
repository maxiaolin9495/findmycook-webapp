FROM node:alpine

RUN mkdir -p /usr/src/Backend
WORKDIR /usr/src/Backend

COPY . /usr/src/Backend

RUN npm install

CMD ["npm", "start"]