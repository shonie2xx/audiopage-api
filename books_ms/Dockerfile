FROM node:16.14.0

# WORKDIR /src

RUN npm install i npm@latest -g 

COPY package.json package-lock*.json ./

RUN npm install

RUN wget -O /bin/wait-for-it.sh https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN chmod +x /bin/wait-for-it.sh

COPY . .

CMD [ "node", "app/index.js"]

EXPOSE 8000