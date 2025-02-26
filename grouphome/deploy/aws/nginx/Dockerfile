FROM nginx:latest AS nginx

ENV NODE_VERSION=20.16.0
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.40.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

COPY web/ /var/www/
COPY deploy/aws/nginx/templates/ /etc/nginx/templates/

WORKDIR /var/www
RUN npm install
RUN npm run build:stg
