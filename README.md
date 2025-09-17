# 🚗 API de Veículos

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)  
[![NestJS](https://img.shields.io/badge/NestJS-9.x-E0234E)](https://nestjs.com/)  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue)](https://www.postgresql.org/)  
[![Docker](https://img.shields.io/badge/Docker-24.x-blue)](https://www.docker.com/)  
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

API para gerenciar veículos, construída com **NestJS**, **PostgreSQL**, **RabbitMQ** e documentada com **Swagger**.

---

## 🛠 Tecnologias Utilizadas

- **Node.js / NestJS**: Framework backend moderno e escalável
- **PostgreSQL**: Banco de dados relacional
- **RabbitMQ**: Fila de mensagens para comunicação assíncrona
- **Sequelize / TypeORM**: ORM para gerenciar migrations e models
- **Swagger**: Documentação interativa da API
- **Docker & Docker Compose**: Containerização da aplicação

---

## ⚡ Pré-requisitos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Node.js (opcional se usar apenas Docker)

---

## 🏃‍♂️ Passo a Passo para Rodar

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd nome-do-projeto
```

### 2. Subir os container com docker compose

```bash
docker-compose up -d
```

### 3. Instalar as dependencias

```bash
npm install
```

### 4. Executar as migrations

```bash
migrate:ts up
```

### 5. Instanciar a aplicação

```bash
npm run start:dev
```

### 6. Documentação dos endpoints da api

```bash
http://localhost:3000/api
```

### 7. Executar testes unitários

```bash
npm run test
```

### 8. Executar testes E2E

```bash
npm run test:e2e
```

### Estrutura de pasta

```bash
src/
├─ app.module.ts
├─ main.ts
├─ migration.ts # executor das migrations
├─ @shared #arquivos compartilhados
├─ env # modulo de variáveis de ambiente para o nestjs
├─ database # modulo do database para configurar no nestjs
├─ vehicles/
│ ├─ domain # entidades, interfaces do domino da aplicação.
│ ├─ infra # infraestrutura da aplicação, rotas http, conexão com banco.
│ └─ use-cases # casos de uso da aplicação.
└─ test # configurações para os test, test E2E
```
