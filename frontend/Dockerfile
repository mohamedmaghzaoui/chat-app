# Use an official Node.js image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose the port (default for React)
EXPOSE 3000

# Start the app with hot-reloading enabled
CMD ["npm", "start"]
