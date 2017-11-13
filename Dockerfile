FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/jaguer
RUN mkdir -p /usr/src/jaguer/src
WORKDIR /usr/src/jaguer

# COPY PROJECT SETTINGS
ADD package.json /usr/src/jaguer
ADD tsconfig.json /usr/src/jaguer

# Install Nodemon
RUN npm install
RUN npm install -g tsc
RUN npm install -g concurrently
RUN npm install typescript -g
RUN npm install yarn -g
RUN npm install nodemon mocha supervisor -g
