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

## Executando

Para iniciar em modo de desenvolvimento:

```bash
npm run dev
```

Ou para iniciar em modo de produção:

```bash
npm run build
npm run start
```

O app ficara disponivel em:

```text
http://localhost:3000
```

ou na porta definida em `PORT`.

## Acesso Admin

Por padrão, o usuário `Filipe123` com a senha `Filipe123`, já tem papel de administrador. Mas caso deseje promover um usuário:

1. No banco, altere `isAdmin` para `true`.

Por exemplo:

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

