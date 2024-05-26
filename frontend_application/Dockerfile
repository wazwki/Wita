FROM node:20.13.1-alpine
WORKDIR /app/frontend
COPY ./package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]