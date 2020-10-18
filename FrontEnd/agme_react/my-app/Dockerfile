# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install
RUN npm install react-scripts@3.4.1 -g
RUN npm i axios
RUN npm i redux react-redux redux-thunk
RUN npm i redux-devtools-extension
RUN npm install --save prop-types

# add app
COPY . ./

# start app
CMD ["npm", "start"]