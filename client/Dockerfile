
FROM node:14.17.0

LABEL version="1.0"
LABEL description="pbbg react client"
LABEL maintainer = ["najib1.kardjoudj@epitech.eu"]

WORKDIR /client

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]