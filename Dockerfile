ARG NODE_VERSION=22.17.0

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production


WORKDIR /usr/src/app


# Copy package files and install dependencies as node user
COPY package*.json ./

RUN npm ci --omit=dev

# Copy the rest of the source files into the image
COPY . .

# Run the application as a non-root user
USER node

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application.
CMD npm run dev
