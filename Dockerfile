FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/jaguer
RUN mkdir -p /usr/src/jaguer/src
WORKDIR /usr/src/jaguer

# Install app dependencies
COPY package.json /usr/src/jaguer
COPY tsconfig.json /usr/src/jaguer

EXPOSE 8080

# Install Nodemon
RUN npm install
RUN npm install yarn -g
RUN npm install typescript -g
RUN npm install nodemon mocha supervisor -g

CMD ["yarn", "start"]