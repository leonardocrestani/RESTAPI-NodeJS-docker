# REST API Example

## Descrição do projeto
<p> O projeto consiste na criação de uma API REST que possibilita a criação de cidades, clientes e associação entre eles. O projeto é feito com NodeJS utilizando do framework express juntamente do banco de dados MySQL e outras dependências </p>

## Features
### Cidades
- Cadastro de uma nova cidade
- Listagem de uma cidade pelo seu nome
- Listagem de todas cidades que pertencem ao mesmo estado
### Clientes
- Cadastro de um novo cliente
    - O cliente sempre esta associado a sua cidade de origem
- Listagem de um cliente pelo seu nome
- Listagem de um cliente pelo seu ID
- Atualização parcial dos dados de um cliente alterando seu nome completo
- Remoção de um cliente

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
Se estiver utilizando a API localmente utilizar o comando
```bash
npm run start
```
```bash
npm test
```
> Quando os testes forem rodados vai ser gerado automaticamente um banco sqlite e as migrations efetuadas, assim os testes vão ocorrer neste banco de testes local

## Endpoints

### Cidades
- (POST) Cadastra '/city'
- (GET) Consulta pelo nome '/city?name='
- (GET) Consulta cidades de um estado '/city?state='

### Clientes
- (POST) Cadastra '/client'
- (GET) Consulta pelo nome '/client?full_name='
- (GET) Consulta pelo id '/client?id='
- (PATCH) Atualiza '/client/{id}'
- (DELETE) Remove '/client/{id}'