# Cache Aside Pattern - Redis Setup

Este projeto utiliza o padrão Cache Aside com Redis para implementar cache em aplicações.

## Configuração do Redis com Docker

### Pré-requisitos

- Docker
- Docker Compose

### Como executar

1. **Iniciar os serviços:**

   ```bash
   docker-compose up -d
   ```

2. **Verificar o status dos serviços:**

   ```bash
   docker-compose ps
   ```

3. **Parar os serviços:**

   ```bash
   docker-compose down
   ```

4. **Parar e remover volumes (dados):**
   ```bash
   docker-compose down -v
   ```

### Serviços disponíveis

#### Redis

- **Porta:** 6379
- **Container:** cache-aside-redis
- **Acesso:** `localhost:6379`

#### Redis Commander (Interface Web)

- **Porta:** 8081
- **URL:** http://localhost:8081
- **Container:** cache-aside-redis-commander

#### PostgreSQL

- **Porta:** 5432
- **Container:** cache-aside-postgres
- **Usuário:** postgres
- **Senha:** password
- **Database:** cache-aside-app
- **Acesso:** `localhost:5432`

### Configuração

O Redis está configurado com as seguintes características:

- **Memória máxima:** 256MB
- **Política de evição:** LRU (Least Recently Used)
- **Persistência:** AOF (Append Only File) habilitado
- **Snapshot:** RDB habilitado
- **Healthcheck:** Verificação automática de saúde

### Variáveis de ambiente

Copie o arquivo `env.example` para `.env` e configure as variáveis conforme necessário:

```bash
cp env.example .env
```

### Conectando ao Redis

#### Via Redis CLI

```bash
docker exec -it cache-aside-redis redis-cli
```

#### Via Node.js

```javascript
import Redis from "redis"

const client = Redis.createClient({
  host: "localhost",
  port: 6379,
})
```

#### Conectando ao PostgreSQL

##### Via psql

```bash
docker exec -it cache-aside-postgres psql -U postgres -d cache-aside-app
```

##### Via Node.js com Prisma

```javascript
import { PrismaClient } from "./src/generated/prisma"

const prisma = new PrismaClient()

// Exemplo de uso
const categories = await prisma.category.findMany()
```

### Prisma e Seed

#### Configuração inicial

1. **Gerar cliente Prisma:**

   ```bash
   pnpm db:generate
   ```

2. **Sincronizar schema com o banco:**

   ```bash
   pnpm db:push
   ```

3. **Executar seed (popular banco com dados):**

   ```bash
   pnpm db:seed
   ```

4. **Abrir Prisma Studio (interface visual):**
   ```bash
   pnpm db:studio
   ```

#### Model Category

O banco inclui um model `Category` com os seguintes campos:

- `id`: Identificador único (CUID)
- `name`: Nome da categoria (único)
- `description`: Descrição opcional
- `imageUrl`: URL da imagem (exemplo: https://example.com/images)
- `isFeatured`: Booleano para destacar categorias
- `createdAt`: Data de criação
- `updatedAt`: Data da última atualização

### Logs

Para visualizar os logs dos serviços:

```bash
# Logs do Redis
docker-compose logs redis

# Logs do Redis Commander
docker-compose logs redis-commander

# Todos os logs
docker-compose logs -f
```

### Troubleshooting

1. **Porta já em uso:**
   - Verifique se não há outro Redis rodando na porta 6379
   - Altere a porta no `docker-compose.yml` se necessário

2. **Problemas de conectividade:**
   - Verifique se os containers estão rodando: `docker-compose ps`
   - Verifique os logs: `docker-compose logs`

3. **Reset completo:**
   ```bash
   docker-compose down -v
   docker-compose up -d
   ```
