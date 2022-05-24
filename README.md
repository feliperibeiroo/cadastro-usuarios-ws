# cadastro-usuarios-ws

Projeto backend do Cadastro de Usuários.

## Tecnologias utilizadas
- Node.js
- Typescript
- JsonWebToken
- Knex (Query Builder)
- Express
- Dotenv
- Nodemon
- Bcrypt
- Body-parser

## Variáveis de ambiente
- PORT: Variável que configura a porta a ser usada para servir a aplicação.
- NODE_ENV: Variável que define o ambiente de execução da aplicação. Assume os valores <b>development</b> e <b>production</b>.

## Executar o projeto
Para executar o projeto faça o clone da aplicação com o seguinte comando:
```
git clone https://github.com/feliperibeiroo/cadastro-usuarios-ws.git
```

Em seguida, executar os seguintes comandos para subir o servidor local de desenvolvimento:
```
cd cadastro-usuarios-ws
yarn install
yarn start
```

## Executar o projeto no Docker

Para executar o projeto no docker, executar os seguintes comandos:
```
cd cadastro-usuarios-ws
docker build -t cadastro-usuarios-ws .
docker run -p 8080:8080 cadastro-usuarios-ws
```
