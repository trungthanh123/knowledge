FROM node:12-alpine as builder

RUN apk add git

RUN mkdir /app
WORKDIR /app

COPY package*.json /app/
RUN npm ci --only=production

ARG REACT_APP_API_ENDPOINT

ENV REACT_APP_API_ENDPOINT ${REACT_APP_API_ENDPOINT}

COPY . .
RUN npm run build

FROM nginx:1.19
COPY --from=builder /app/build /usr/share/nginx/html

# Copy nginx config file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
