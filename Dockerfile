### STAGE 1: Build dependencies ###
FROM node:10.17-alpine AS build-deps

ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV NODE_ENV development

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "/usr/src/app/"]
RUN yarn install --silent --production false

COPY . /usr/src/app

### STAGE 2: Build the app ! ###
FROM build-deps AS build-app
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN yarn install --silent --production false
RUN yarn build

### STAGE 2: Production Environment ###
FROM nginx:mainline-alpine AS prod

# We remove default nginx config
# and we put our config.
# Our config handles React routes correctly
RUN rm -rf /etc/nginx/conf.d
COPY docker/nginx/conf /etc/nginx

COPY --from=build-app /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
