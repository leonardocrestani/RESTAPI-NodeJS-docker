# Projeto RESTAPI

## Instalação inicial
npm install <br>
npx sequelize db:create <br>
npx sequelize db:migrate

## Rodar API
npm run start

## Rodar testes
npm test

## Features/endpoints

### Cidades
- Cadastro de cidade '/cidades'
- Consulta de cidade pelo nome '/cidades/{nome}'
- Consulta de cidades por estado '/cidades/estado/{estado}'

### Clientes
- Cadastro de cliente '/clientes'
- Consulta de cliente pelo nome '/clientes/nome/{nome}'
- Consulta de cliente pelo id '/clientes/{id}'
- Atualiza nome de cliente '/clientes/{id}'
- Remover cliente '/clientes/{id}'