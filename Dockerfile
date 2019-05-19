FROM node:8.16.0-jessie

#Create app directory
WORKDIR .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD node server.js