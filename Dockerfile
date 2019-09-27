FROM node:10-alpine

WORKDIR .

COPY package.json .

RUN npm install --production --silent

COPY . .

EXPOSE 80

CMD [ "npm", "run", "k8"]
