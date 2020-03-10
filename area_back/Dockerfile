# Dockerfile

# Using image
FROM node:10

# Set the application directory
RUN mkdir -p /app
WORKDIR /app

# Install our requirement
COPY package.json /app
RUN npm install
RUN npm audit fix

# Copy our code from the current folder to /app inside the container
COPY . /app

EXPOSE 8080

# Define our command to be run when launching the container
CMD ["npm", "start"]
