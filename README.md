# Site Luthieria

Aplicacao Express/EJS para o site da Decaroli Lutheria

## Requisitos

- Node.js 20 ou superior
- npm

## Instalacao

1. Instale as dependencias:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto:

```env
COOKIE_SECRET="troque-por-um-segredo-forte"
PORT=3000
SQLITE_STORAGE="./data/database.sqlite"
```

3. Crie as tabelas no arquivo SQLite:

```bash
npm run db:migrate
```

## Executando

Para iniciar em modo de desenvolvimento:

```bash
npm run dev
```

O app ficara disponivel em:

```text
http://localhost:3000
```

ou na porta definida em `PORT`.

## Acesso Admin

1. Acesse `/auth/signup` e crie um usuario.
2. Promova o usuario para administrador no banco, alterando `isAdmin` para `true`.

Altere o campo diretamente no SQLite, por exemplo:

```sql
UPDATE "User" SET "isAdmin" = true WHERE email = 'email-do-admin@example.com';
```

Com o usuario administrador logado, acesse:

```text
/admin
```

## Formulario de Contato

Os envios do formulario de contato sao salvos na tabela `ContactRequest`.
O administrador pode visualizar esses pedidos pela area admin.

## Comandos Uteis

```bash
npm run build        # builda o projeto
npm run db:migrate   # cria as tabelas
npm run dev          # inicia o servidor
```
