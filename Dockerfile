FROM node:14-alpine

WORKDIR /app

RUN npm install -g nodemon

ADD . /app

RUN rm Dockerfile env

RUN npm install

RUN npm run build

ENTRYPOINT ["/bin/sh"]
CMD ["/app/start.sh"]
