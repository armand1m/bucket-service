FROM node:7.7-alpine

ADD package.json /tmp/package.json
RUN cd /tmp && npm i
RUN mkdir -p /service && cd /service && ln -s /tmp/node_modules

COPY . /service
WORKDIR /service

EXPOSE 80

ENTRYPOINT ["node"]
CMD ["--harmony-async-await", "index.js"]
