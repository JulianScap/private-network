FROM mcr.microsoft.com/devcontainers/javascript-node:20

RUN sudo apt update
RUN sudo apt install gh
RUN curl https://raw.githubusercontent.com/GitAlias/gitalias/main/gitalias.txt -o /home/node/.gitalias
RUN npm install -g npm
RUN echo "alias yolo='git aa && git commit -m \"\\\$(https://whatthecommit.com/index.txt)\"'" >> /home/node/.zshrc
