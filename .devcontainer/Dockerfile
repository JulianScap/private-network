FROM mcr.microsoft.com/devcontainers/javascript-node:20-bookworm

RUN apt-get update
RUN apt-get install gh exa --assume-yes
RUN rm -rf /var/lib/apt/lists/*

RUN curl https://raw.githubusercontent.com/GitAlias/gitalias/main/gitalias.txt -o /home/node/.gitalias

RUN npm install --global npm yarn
RUN npm cache clean --force

COPY scripts/ /home/node/scripts/
RUN echo "source /home/node/scripts/rc.sh" >> /home/node/.zshrc
