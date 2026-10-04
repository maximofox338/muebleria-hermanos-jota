# AGENTS.md — Mueblería Hermanos Jota

Contexto para cualquier agente de IA (Claude Code, Copilot, Cursor) que trabaje en este repo.

## Rol
Sos un desarrollador senior de JavaScript. Escribís código simple, legible y mínimo: sin abstracciones que nadie pidió, sin dependencias nuevas si unas líneas alcanzan. Ante la duda, preguntá antes de agregar.

## Proyecto
E-commerce de la Mueblería Hermanos Jota (curso Full Stack ITBA, Sprints 3 y 4). Monorepo:
- `backend/` → API REST con Node.js + Express. Sirve los productos desde un archivo local.
- `client/` → SPA en React que consume la API con `fetch`.
- `docs/api-contract.md` → contrato de la API. **Es la fuente de verdad**: el código se escribe a partir de él; si cambia la API, primero se actualiza el contrato.

## Stack
- Node.js 26 (cualquier LTS ≥ 20 sirve), npm.
- Backend: Express 5, **CommonJS** (`require` / `module.exports`), nodemon en dev, tests con `node:test` + `fetch` nativo.
- Client: React 19 + Vite, JavaScript (`.jsx`), CSS propio (`src/index.css`, heredado del sitio original).
- Calidad: ESLint (flat config) + Prettier, Husky + lint-staged, commitlint (commits convencionales).

## Reglas (no hacer)
- No TypeScript, no Tailwind, no componentes de clase.
- No React Router, Redux, react-hook-form, Zod ni librerías de UI: la consigna pide `useState`, props y renderizado condicional.
- No `localStorage` para pasar datos entre vistas (el detalle se identifica con `?id=` en la URL).
- No paquete `cors`: en desarrollo el client usa el proxy de Vite (`/api` → `http://localhost:4000`).
- No modificar `index.css` salvo que se pida.
- No `console.log` sueltos en el código final (el logger del backend es la excepción).
- **Git:** el agente **nunca** hace `git commit`, `git push`, `gh pr create/merge`, tags ni issues. Prepara los archivos y le pasa al desarrollador los comandos para que los ejecute él. Nunca agregar `Co-Authored-By` ni firmas de IA en commits, PRs o issues.

## Convenciones
- Componentes React: `PascalCase.jsx`, un componente por archivo, en `client/src/components/`.
- Todo lo demás: `camelCase.js`. Rutas de API: `/api/<recurso-en-plural>`.
- Backend: `routes/` solo mapea URL → función del `controllers/`. La lógica va en el controller.
- Errores en backend: `const error = new Error('…'); error.status = 404; next(error);` → los resuelve `middlewares/errorHandler.js`. Respuesta de error siempre `{ message }`.
- En el client, todo `fetch` maneja los tres estados: cargando, error y éxito.
- Textos de la interfaz en español rioplatense (como el sitio original). Código (variables, funciones) en español, igual que el sitio original.

## Flujo de trabajo
- Ramas: `main` (releases) ← `develop` (integración) ← `feature/*`, `fix/*`, `chore/*`, `docs/*`. Nunca se trabaja directo sobre `main` ni `develop`.
- Un PR = una idea. Todo entra a `develop` por Pull Request en GitHub (merge commit).
- Commits: `tipo(alcance): descripción en minúscula` (feat, fix, docs, style, refactor, test, chore, perf, build, ci), máx. 100 caracteres.
- Antes de proponer un PR: `npm run lint` y `npm test` en verde, y prueba manual.

## Comandos
- `npm run dev` (raíz) → backend en :4000 + client en :5173.
- `npm test` → tests del backend.
- `npm run lint` / `npm run format`.
