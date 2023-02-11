# passo 1 - definir o ambiente pra o app
# já tem o node v16, npm v7, alphine (linux)
FROM node:15

# passo 2 - criando um diretório no container
WORKDIR /app

# passo 3 - copiar o package para dentro container
COPY package*.json ./

# passo 4 - executar o npm install
RUN npm i

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz


# passo 5 - vamos copiar todos os arquivos para o container
# todos incluindo o node_modules - com o .dockerignore não copia o node_modules
COPY . .

# passo 6 - definir os envs
ENV PORT=5000

# passo 7 - export a port da aplicação
EXPOSE 5000

# passo 8 - executar a aplicação
CMD ["npm", "run", "dev"]
