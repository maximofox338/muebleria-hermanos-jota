# Mueblería Hermanos Jota — E-commerce

Proyecto del curso Full Stack (ITBA), Sprints 3 y 4. El sitio de la Mueblería Hermanos Jota (HTML, CSS y JS de los Sprints 1 y 2) pasa a una arquitectura **cliente-servidor**:

- **`/backend`** → API REST con **Node.js + Express** que sirve el catálogo.
- **`/client`** → SPA en **React** que consume la API con `fetch`.

## Integrantes

- Máximo Fox — proyecto individual. Los commits aparecen con dos cuentas de GitHub (`maximofox338` y `MaximoFox487`): ambas son del mismo autor.

## Stack

| Capa     | Tecnología                                                         |
| -------- | ------------------------------------------------------------------ |
| Backend  | Node.js, Express 5 (CommonJS), nodemon                             |
| Frontend | React 19 + Vite, CSS propio (el del sitio original)                |
| Calidad  | ESLint + Prettier, Husky + lint-staged, commitlint, GitHub Actions |
| Tests    | `node:test` + `fetch` nativo (backend), colección de Postman       |

## Estructura del monorepo

```
.
├── backend/
│   ├── server.js                   # levanta el servidor (PORT o 4000)
│   ├── app.js                      # arma la app: middlewares, rutas y errores
│   ├── data/productos.js           # catálogo (11 productos)
│   ├── routes/productosRoutes.js   # express.Router → /api/productos
│   ├── controllers/productosController.js
│   ├── middlewares/logger.js       # log de método, URL y fecha
│   ├── middlewares/errorHandler.js # 404 + manejador de errores centralizado
│   └── tests/api.test.js
├── client/
│   ├── public/img/                 # imágenes y logo
│   ├── vite.config.js              # proxy /api → localhost:4000
│   └── src/
│       ├── App.jsx                 # estado: vista, producto, carrito
│       ├── index.css               # estilos del sitio original
│       └── components/             # Navbar, Footer, Home, ProductCard, ProductList,
│                                   # ProductDetail, Cart, ContactForm
├── docs/
│   ├── api-contract.md             # contrato de la API
│   └── postman_collection.json
├── AGENTS.md                       # guía para agentes de IA
└── package.json                    # workspaces + scripts de la raíz
```

## Instalación

Requisitos: Node.js 20 o superior y npm.

```bash
git clone https://github.com/maximofox338/muebleria-hermanos-jota.git
cd muebleria-hermanos-jota
npm install
```

El repo usa **npm workspaces**: un solo `npm install` en la raíz instala las dependencias del backend y del client.

## Ejecución

**Los dos servidores juntos** (recomendado):

```bash
npm run dev
```

- Backend: http://localhost:4000 (por ejemplo http://localhost:4000/api/productos)
- Client: http://localhost:5173

**Cada uno por separado**, en dos terminales:

```bash
npm run dev -w backend   # API en :4000 (con nodemon)
npm run dev -w client    # React en :5173
```

Otros scripts de la raíz:

| Script           | Qué hace                            |
| ---------------- | ----------------------------------- |
| `npm start`      | backend en modo producción (`node`) |
| `npm test`       | tests del backend                   |
| `npm run build`  | compila el client en `client/dist`  |
| `npm run lint`   | ESLint en todo el repo              |
| `npm run format` | Prettier en todo el repo            |

## API

| Método | Ruta                 | Respuesta                                                               |
| ------ | -------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/productos`     | `200` → array con los 11 productos                                      |
| GET    | `/api/productos/:id` | `200` → el producto · `404` → `{ "message": "Producto no encontrado" }` |
| \*     | cualquier otra ruta  | `404` → `{ "message": "Ruta no encontrada: GET /x" }`                   |

Detalle de la forma de los datos y los errores en [`docs/api-contract.md`](docs/api-contract.md). Para probar a mano, importar [`docs/postman_collection.json`](docs/postman_collection.json) en Postman.

## Arquitectura

```
Navegador (React, :5173)
   │  fetch('/api/productos')
   ▼
Proxy de Vite  ──►  Express (:4000)
                     logger → express.json() → /api/productos (Router → Controller → data/productos.js)
                     → 404 atrapa-todo → manejador de errores ({ message })
```

**Backend.** `app.js` registra los middlewares en orden: el **logger global** (método, URL y fecha), `express.json()`, las rutas montadas con **`express.Router`** en `/api/productos`, y al final el **404 atrapa-todo** y el **manejador de errores centralizado** (4 argumentos). Los controllers no responden los errores a mano: crean un `Error` con `status` y llaman a `next(error)`.

**Frontend.** No hay router: `App` guarda la `vista` actual en el estado y muestra cada pantalla con **renderizado condicional**.

- `App` tiene el estado del **carrito** y baja por props las funciones para agregar, quitar y vaciar; `Navbar` recibe la cantidad por props.
- `ProductList`, `ProductDetail` y `Home` hacen `fetch` en un `useEffect` y manejan los estados **cargando / error / éxito**. Las listas se arman con `.map()` y `key={producto.id}`.
- `ProductCard` es presentacional: solo muestra lo que recibe por props.
- `ContactForm` es un formulario **controlado** con `useState` (validación, errores por campo y mensaje de éxito).

## Decisiones tomadas

- **Vite en lugar de create-react-app.** La consigna menciona CRA, pero fue deprecado oficialmente en febrero de 2025 y ya no se mantiene. Vite es la herramienta que recomienda hoy la documentación de React y la que usa el material del curso. No cambia nada de React: mismos componentes, JSX, props y hooks.
- **Monorepo con npm workspaces**: una sola instalación y scripts en la raíz (`npm run dev` levanta los dos servidores con `concurrently`).
- **Proxy de Vite en lugar de CORS**: el client llama a `/api/...` como si fuera el mismo origen, así que no hace falta el paquete `cors` en desarrollo.
- **Rutas → controllers**: las rutas solo mapean URL a funciones y la lógica está en el controller. El contrato de la API se escribió antes que el código (`docs/api-contract.md`).
- **`app.js` separado de `server.js`**: los tests levantan la app en un puerto libre sin tocar el servidor real.
- **La API devuelve el array/objeto directo** y los errores siempre como `{ message }`.
- **Detalle por renderizado condicional + `?id=` en la URL** (corrección del Sprint 2): el detalle se puede recargar y compartir, y funcionan atrás/adelante (`URLSearchParams` + `history.pushState`), sin sumar React Router. Ya no se usa `localStorage` para pasar el producto entre páginas.
- **Footer fijo abajo** (corrección del Sprint 2): `#root` ocupa todo el alto en flex y `main` se estira, así el footer no flota con el carrito vacío.
- **CSS propio**: se reutilizó el `style.css` del sitio original (identidad de marca y responsive) en lugar de reescribirlo con Tailwind.
- **Carrito persistido en `localStorage`** (como el sitio original) y actualizado con la forma funcional de `setCarrito`, para no perder clics seguidos.
- **`useEffect`** se usa en su forma mínima (con `[]`, para pedir los datos al montar el componente) aunque no esté en la teoría del sprint: es la forma estándar de hacer un `fetch` desde un componente.

## Flujo de trabajo

- **Ramas**: `main` (releases) ← `develop` (integración) ← ramas cortas por tarea (`feature/*`, `chore/*`, `docs/*`). Las dos ramas principales están protegidas: todo entra por **Pull Request** con el CI en verde.
- **Issues**: una por bloque de requisitos; cada PR la cierra con `Closes #N`.
- **Commits convencionales** (`feat`, `fix`, `docs`, `chore`, `test`, `ci`…), validados por **commitlint**.
- **Husky + lint-staged**: antes de cada commit corren ESLint y Prettier sobre los archivos modificados.
- **CI (GitHub Actions)**: en cada PR y push a `develop`/`main` corre `npm ci`, lint, build del client y tests.
- **Releases**: `v0.3.0` (Sprint 3, backend) y `v1.0.0` (Sprint 4, React).
- **Desarrollo asistido por IA**: `AGENTS.md` define el rol, el stack, las reglas y las convenciones para los agentes; el código generado se revisó y probó en cada PR antes de mergear.

## Tests

```bash
npm test
```

Cubren: listado de productos (11 ítems y forma de los datos), producto por id, 404 de producto inexistente, 404 de ruta inexistente y 400 por JSON mal formado.
