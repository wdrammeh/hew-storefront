FROM node:latest

WORKDIR /app/storefront

# COPY . .
COPY package.json .

# RUN rm -rf node_modules

# RUN apt-get update

RUN npm i -g npm@latest
RUN npm i -g yarn@latest --force

# RUN npm install -g gatsby-cli
# RUN npm install sharp

# RUN npm install --loglevel=error
# RUN npm install
RUN yarn

COPY . .

# RUN yarn build

EXPOSE 8000

# ENTRYPOINT ["gatsby", "develop", "-H", "0.0.0.0", "-p", "8000" ]
# CMD [ "npm", "run", "build", "&&", "npm", "run", "start" ]
# CMD [ "npm", "run", "prod" ]
CMD [ "yarn", "start" ]
