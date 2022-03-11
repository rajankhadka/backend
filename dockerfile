FROM "node"

RUN mkdir backend

WORKDIR /backend

ADD . .

RUN npm install --legacy-peer-deps

EXPOSE 8080

CMD [ "npm","run","dev" ]

# VOLUME [ "/data" ]

# ENTRYPOINT [ "" ]
