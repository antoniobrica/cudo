FROM node:14.15-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY workspace*.json ./
COPY cypress*.json ./
RUN npm install
COPY . .
RUN npm run build ms-tender

FROM node:14.15-alpine as production

ARG PORT=5008
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --from=development /usr/src/app/dist/apps/ms-tender ./dist

COPY --from=development /usr/src/app/apps/ms-tender/.env ./dist

CMD ["node", "dist/main"]