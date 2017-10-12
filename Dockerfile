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
RUN npm install yarn -g
RUN npm install typescript -g
RUN npm install nodemon mocha supervisor -g

CMD ["yarn", "start"]



#CMD [ "npm", "start" ]