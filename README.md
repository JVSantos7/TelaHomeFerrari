# Portfólio (React + Node)

Este repositório é a base do meu site de **portfólio**, com:

- **Frontend**: React + Vite (`apps/frontend`)
- **Backend**: Node + Express (`apps/backend`) — API simples para evoluir no futuro

## Requisitos

- Node.js 18+ (recomendado)

## Como rodar

### Frontend

```bash
cd apps/frontend
npm install
npm run dev
```

### Backend

```bash
cd apps/backend
npm install
npm run dev
```

Com os dois rodando, o Vite encaminha `/api/*` para o backend (`http://localhost:3333`).

## Estrutura

- `apps/frontend`: aplicação web (React/Vite)
  - `src/components`: `Navbar`, `Splash` (abertura animada) e `VideoCarrossel`
  - `src/data`: dados estáticos (itens de navegação)
  - `scripts/generate-favicons.mjs`: gera os favicons a partir da logo (`npm run generate:favicons`)
- `apps/backend`: API (Express) — `GET /api/health`

## Notas

- Pastas como `node_modules/`, builds e arquivos do Windows (ex.: `desktop.ini`) são ignorados pelo Git via `.gitignore` na raiz.
