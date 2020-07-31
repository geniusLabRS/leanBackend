FROM node:10

# copy code
WORKDIR /app
COPY . /app

# Install project dependencies
RUN pwd
RUN ls -la
RUN npm install
RUN npm run build
# RUN npm run gulp



