# Projeto RESTAPI

## Instalação inicial
npm install
npx sequelize db:create
npx sequelize db:migrate

## Rodar API
npm run start

## Rodar testes
npm test

## Features/endpoints

### Cidades
- [x] Cadastro de cidade '/cidades'
- [x] Consulta de cidade pelo nome '/cidades/{nome}'
- [x] Consulta de cidades por estado '/cidades/estado/{estado}'

### Clientes
- [x] Cadastro de cliente '/clientes'
- [x] Consulta de cliente pelo nome '/clientes/nome/{nome}'
- [x] Consulta de cliente pelo id '/clientes/{id}'
- [x] Atualiza nome de cliente '/clientes/{id}'
- [x] Remover cliente '/clientes/{id}'