## Projeto RESTAPI
O projeto consiste na criação de uma API REST que possibilita a criação de cidades e clientes e associação entre eles. Para a crição foi utilizado Node.JS com o framework express juntamente do banco de dados MySQL e outras dependências

## Instalação com docker
Criação do container
Para crição do banco no docker é preciso trocar o DATABASE_HOST no arquivo .env.local para 'db'
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
Para execução dos testes é preciso que a API já esteja funcionando para que os endpoints a serem testados estejam acessíveis
```bash
npm test
```
> Quando os testes forem rodados vai ser gerado automaticamente um banco sqlite e as migrations efetuadas, assim os testes vão ocorrer neste banco de testes local

## Features/endpoints

### Cidades
- Cadastra cidade '/city'
- Consulta cidade pelo nome '/city?name='
- Consulta todas cidades de um estado '/city?state='

### Clientes
- Cadastra cliente '/client'
- Consulta cliente pelo nome '/client?full_name='
- Consulta cliente pelo id '/client?id='
- Atualiza nome de cliente '/client/{id}'
- Remove cliente '/client/{id}'