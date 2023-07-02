FROM mcr.microsoft.com/devcontainers/javascript-node:20-bookworm

RUN sudo apt update
RUN sudo apt install gh
RUN sudo apt install exa --assume-yes
RUN curl https://raw.githubusercontent.com/GitAlias/gitalias/main/gitalias.txt -o /home/node/.gitalias
RUN npm install -g npm

COPY scripts/ /home/node/scripts/
RUN echo "source /home/node/scripts/rc.sh" >> /home/node/.zshrc
