FROM node:20.13.1-alpine
WORKDIR /app/frontend
COPY ./package.json .
RUN npm install
COPY ./public .
COPY ./src .

CMD ["npm", "run", "dev"]