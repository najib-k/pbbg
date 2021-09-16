
FROM node:14.17.0

LABEL version="1.0"
LABEL description="pbbg api server"
LABEL maintainer = ["najib1.kardjoudj@epitech.eu"]

WORKDIR /api

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3369

CMD ["npm", "start"]