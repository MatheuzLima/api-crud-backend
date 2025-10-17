# Cadastro (API de estudos)

Projeto pessoal para estudos em backend: API REST simples em Node.js que se conecta a um banco Postgres (pode rodar em container Docker). Usa Fastify como servidor HTTP e Sequelize para modelagem/integração com o banco.

## Tecnologias
- Node.js (ES Modules)
- Fastify ([src/server.js](src/server.js))
- Sequelize ([src/models/User.js](src/models/User.js), [src/models/index.js](src/models/index.js))
- PostgreSQL (imagem Docker)
- Migrations com Sequelize ([src/database/migrations/20250731025647-create-users.js](src/database/migrations/20250731025647-create-users.js))

## Estrutura
- [src/.sequelizerc](.sequelizerc) — configuração do caminho das migrations, models e config
- [package.json](package.json)
- [src/server.js](src/server.js) — inicialização do Fastify e conexão com DB
- [src/routes.js](src/routes.js) — registro das rotas com prefixo `/usuarios` (export `userRoutes`)
  - handler de rotas em [src/controllers/userControllers.js](src/controllers/userControllers.js) — [`getAllUsers`](src/controllers/userControllers.js), [`createUser`](src/controllers/userControllers.js), [`updateUser`](src/controllers/userControllers.js), [`deleteUser`](src/controllers/userControllers.js)
- [src/models/User.js](src/models/User.js) — modelo `User` e método [`User.init`](src/models/User.js)
- [src/models/index.js](src/models/index.js) — carregamento automático dos models e export do `db`
- [src/config/database.js](src/config/database.js) — configuração do Sequelize (dialect/postgres)
- [src/routes.http](src/routes.http) — exemplos de requisições para testar a API
- [src/database/migrations/20250731025647-create-users.js](src/database/migrations/20250731025647-create-users.js) — migration de criação da tabela `users`

## Endpoints
Prefixo: `/usuarios` (registrado em [src/server.js](src/server.js) via [`userRoutes`](src/routes.js))

- GET /usuarios/todos — lista todos os usuários (handler: [`getAllUsers`](src/controllers/userControllers.js))
- POST /usuarios/cadastro — cria usuário (handler: [`createUser`](src/controllers/userControllers.js))
- PUT /usuarios/:id — atualiza usuário (handler: [`updateUser`](src/controllers/userControllers.js))
- DELETE /usuarios/:id — remove usuário (handler: [`deleteUser`](src/controllers/userControllers.js))

Exemplos de requisição estão em [src/routes.http](src/routes.http).

## Como rodar (local / Docker)
1. Instale dependências, na pasta /src:
```sh
npm install
```

2. Rodar PostgreSQL em Docker (exemplo):
```sh
docker run --name pg-cadastro -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=0000 -e POSTGRES_DB=cadastro -p 5432:5432 -d postgres
```
A configuração de conexão usada no projeto está em src/config/database.js.

3. Rodar migrations (caso use sequelize-cli), na pasta /src:
```sh
npx sequelize-cli db:migrate
```
(O projeto inclui .sequelizerc apontando para as pastas de config/migrations/models)

4. Iniciar servidor:
```sh
npm run dev
```

Servidor inicia em: http://localhost:3000 (ver src/server.js)

## Observações
# Projeto para estudo — sinta-se à vontade para ajustar configuração de ambiente e scripts conforme sua necessidade. `````` 