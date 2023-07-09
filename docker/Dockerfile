FROM node:20.3

RUN npm install -g vite@4.3.9
RUN npm install -g concurrently@8.2.0
RUN npm cache clean --force

EXPOSE 5173 51055

WORKDIR /app
COPY dist/ /app
COPY entrypoint.sh entrypoint.sh

RUN chmod +x entrypoint.sh

ENTRYPOINT "./entrypoint.sh"
