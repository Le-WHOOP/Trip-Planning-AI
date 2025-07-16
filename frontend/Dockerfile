FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

ARG ELYSIAN_TRAILS_BASE_HREF=/
COPY ./ ./
RUN npm run build -- --configuration production --base-href "$ELYSIAN_TRAILS_BASE_HREF"

FROM nginx:alpine

# Remove the default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the built Angular app to the Nginx HTML directory
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html/

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
