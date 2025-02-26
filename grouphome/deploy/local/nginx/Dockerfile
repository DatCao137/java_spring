FROM nginx:latest AS nginx

ENV NODE_VERSION=22.13.1
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.40.1/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

# npm installとrun buildをvolumeマウント後に実行
RUN echo "#!/bin/sh\n\
PATH=${PATH}\n\
cd /var/www\n\
npm install\n\
npm run build\n\
cd /var/wwwsp\n\
npm install\n\
npm run build" > /docker-entrypoint.d/99-initialbuild.sh
RUN chmod 755 /docker-entrypoint.d/99-initialbuild.sh
