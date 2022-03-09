## Projeto RESTAPI
O projeto consiste na criação de uma API REST que possibilita a criação de cidades e clientes e associação entre eles. Para a crição foi utilizado Node.JS com o framework express juntamente do banco de dados MySQL e outras dependências

## Instalação com docker
Criação do container
```bash
docker-compose up --build
```
> As dependências serão baixadas e instaladas automaticamente e o banco de dados gerado com as migrations, a API estará disponível na URL http://localhost:3000

## Instalação local
Instalar dependências
```bash
npm install
```

Criar banco de dados <br>
Para crição local é preciso trocar o DATABASE_HOST no arquivo .env.local para '127.0.0.1'
```bash
npx sequelize db:create
```

Executar aplicação
```bash
npm run start
```
> A API estará disponível na URL http://localhost:3000

## Executar testes
```bash
npm test
```
> Quando os testes forem rodados vai ser gerado automaticamente um banco sqlite e as migrations efetuadas, assim os testes vão ocorrer neste banco de testes local

## Features/endpoints

### Cidades
- Cadastra cidade '/cidades'
- Consulta cidade pelo nome '/cidades/?{nome}'
- Consulta todas cidades de um estado '/cidades/?{estado}'

### Clientes
- Cadastra cliente '/clientes'
- Consulta cliente pelo nome '/clientes/?{nome}'
- Consulta cliente pelo id '/clientes/?{id}'
- Atualiza nome de cliente '/clientes/{id}'
- Remove cliente '/clientes/{id}'