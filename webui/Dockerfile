FROM node:4.2.4
RUN npm update -g npm

RUN mkdir -p /app/user
WORKDIR /app/user

EXPOSE 80

ADD . /app/user/
RUN npm install
