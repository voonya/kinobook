FROM node:16.3.0-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY src ./src
COPY prisma ./prisma
RUN ls -a
RUN npm install
RUN npm run build

FROM node:16.3.0-alpine
WORKDIR /usr
COPY package.json ./
COPY prisma ./prisma
RUN npm install --only=production
RUN npm run db:generate
COPY --from=0 /usr/dist .
RUN npm install pm2 -g

CMD ["pm2-runtime","src/main.js"]
