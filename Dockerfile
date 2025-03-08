FROM node:slim
WORKDIR /app
COPY . ./
RUN npm install
EXPOSE 8000
ENV NODE_ENV=production
CMD [ "npm", "start" ]