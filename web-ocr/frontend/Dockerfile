# project/frontend/Dockerfile

#pull official base-image
FROM node:16-alpine
WORKDIR /usr/src/app/

#add usr/src/app/node_modules/.bin to $PATH
ENV PATH /usr/src/app/node_modules.bin:$PATH

##install and cache app dependencies
COPY app/package.json .
COPY app/package-lock.json .
#npm install
RUN npm ci
RUN npm install react-scripts@4.0.3 -g --silent
#
#start app
CMD ["npm", "start"]

