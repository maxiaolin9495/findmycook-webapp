FROM node:alpine

RUN mkdir -p /usr/src/Frontend
WORKDIR /usr/src/Frontend

COPY . /usr/src/Frontend

RUN npm install

CMD ["npm", "start"]