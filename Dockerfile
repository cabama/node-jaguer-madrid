FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/jaguer
RUN mkdir -p /usr/src/jaguer/src
WORKDIR /usr/src/jaguer

# Install app dependencies
COPY package.json /usr/src/jaguer
RUN ls
RUN npm install

# Bundle app source
#COPY . /usr/src/jaguer
EXPOSE 8080

# Install Nodemon
RUN npm install -g yarn
RUN npm install -g typescript
RUN npm install -g nodemon mocha supervisor

CMD ["yarn", "start"]



#CMD [ "npm", "start" ]