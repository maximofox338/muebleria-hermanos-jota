# Mueblería Hermanos Jota — E-commerce

Proyecto del curso Full Stack (ITBA), Sprints 3 y 4. El sitio de la Mueblería Hermanos Jota (HTML, CSS y JS de los Sprints 1 y 2) pasa a una arquitectura **cliente-servidor**:

- **`/backend`** → API REST con **Node.js + Express** que sirve el catálogo.
- **`/client`** → SPA en **React** que consume la API con `fetch`.

## Demo en vivo

**https://hermanos-jota-maximofox.vercel.app** — el sitio completo (React) y la API (Express) publicados juntos en Vercel. Por ejemplo, la API: [`/api/productos`](https://hermanos-jota-maximofox.vercel.app/api/productos) y [`/api/productos/3`](https://hermanos-jota-maximofox.vercel.app/api/productos/3).

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
├── .github/
│   ├── workflows/ci.yml            # CI: lint, build y tests en cada PR
│   └── pull_request_template.md
├── .husky/                         # hooks de git: pre-commit y commit-msg
├── api/index.js                    # función de Vercel: publica la app de Express
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
│   ├── index.html
│   ├── public/img/                 # imágenes y logo
│   ├── vite.config.js              # proxy /api → localhost:4000
│   └── src/
│       ├── main.jsx                # punto de entrada (createRoot)
│       ├── App.jsx                 # estado: vista, producto, carrito
│       ├── index.css               # estilos del sitio original
│       ├── components/             # Navbar, Footer, Home, ProductCard, ProductList,
│       │                           # ProductDetail, Cart, ContactForm
│       ├── hooks/useProductos.js   # fetch del catálogo con carga y error
│       └── utils/formatearPrecio.js
├── docs/
│   ├── api-contract.md             # contrato de la API
│   └── postman_collection.json
├── AGENTS.md                       # guía para agentes de IA (CLAUDE.md la importa)
├── eslint.config.js · .prettierrc · commitlint.config.cjs
├── vercel.json                     # deploy: build del client + /api/* → Express
└── package.json                    # workspaces + scripts de la raíz
```

## Instalación

Requisitos: **Node.js 20.19+ o 22.12+** (lo piden Vite 8 y ESLint 10) y npm.

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
- Client: http://localhost:5173 — **es la dirección para usar la página** (el backend solo responde la API)

**Cada uno por separado**, en dos terminales:

```bash
npm run dev -w backend   # API en :4000 (con nodemon)
npm run dev -w client    # React en :5173
```

Otros scripts de la raíz:

| Script           | Qué hace                           |
| ---------------- | ---------------------------------- |
| `npm start`      | backend con `node` (sin nodemon)   |
| `npm test`       | tests del backend                  |
| `npm run build`  | compila el client en `client/dist` |
| `npm run lint`   | ESLint en todo el repo             |
| `npm run format` | Prettier en todo el repo           |

## API

| Método | Ruta                 | Respuesta                                                               |
| ------ | -------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/productos`     | `200` → array con los 11 productos                                      |
| GET    | `/api/productos/:id` | `200` → el producto · `404` → `{ "message": "Producto no encontrado" }` |
| \*     | cualquier otra ruta  | `404` → `{ "message": "Ruta no encontrada: GET /x" }`                   |

Los errores siempre responden solo `{ message }`: nunca se exponen detalles internos (el `stack` de un error 500 queda únicamente en la consola del servidor). Un body que no es JSON válido responde `400`.

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

**En producción (Vercel)** es el mismo esquema en un solo dominio: el client compilado (`client/dist`) se sirve como archivos estáticos y `vercel.json` manda todas las rutas `/api/*` a `api/index.js`, una función que publica **la misma app de Express** (`backend/app.js`). Por eso tampoco hace falta CORS en producción.

**Backend.** `app.js` registra los middlewares en orden: el **logger global** (método, URL y fecha), `express.json()`, las rutas montadas con **`express.Router`** en `/api/productos`, y al final el **404 atrapa-todo** y el **manejador de errores centralizado** (4 argumentos). Los controllers no responden los errores a mano: crean un `Error` con `status` y llaman a `next(error)`.

**Frontend.** No hay router: `App` guarda la `vista` actual en el estado y muestra cada pantalla con **renderizado condicional**. Cada vista tiene su URL (`/`, `?vista=catalogo`, `?vista=carrito`, `?vista=contacto`, `?id=3` para el detalle), así que se puede recargar, compartir y usar atrás/adelante en cualquier pantalla.

- `App` tiene el estado del **carrito** (una fila por pieza con su `cantidad`) y baja por props las funciones para agregar, quitar y vaciar; `Navbar` recibe la cantidad total por props.
- `ProductList` y `Home` piden el catálogo con el hook propio **`useProductos`** (`fetch` dentro de un `useEffect`) y muestran los estados **cargando / error / éxito**; `ProductDetail` hace lo mismo con `/api/productos/:id` y además maneja el `404`.
- Todas las listas se arman con `.map()` y una `key` estable: el id del producto (catálogo, destacados y carrito) o el nombre de la especificación (ficha técnica).
- `ProductCard` es presentacional: solo muestra lo que recibe por props.
- `ContactForm` es un formulario **controlado** con `useState` (validación, errores por campo, foco en el primer error y mensaje de éxito).

## Decisiones tomadas

- **Vite en lugar de create-react-app.** La consigna menciona CRA, pero fue deprecado oficialmente en febrero de 2025 y ya no se mantiene. Vite es la herramienta que recomienda hoy la documentación de React y la que usa el material del curso. No cambia nada de React: mismos componentes, JSX, props y hooks.
- **Monorepo con npm workspaces**: una sola instalación y scripts en la raíz (`npm run dev` levanta los dos servidores con `concurrently`).
- **Proxy de Vite en lugar de CORS**: el client llama a `/api/...` como si fuera el mismo origen, así que no hace falta el paquete `cors` en desarrollo.
- **Rutas → controllers**: las rutas solo mapean URL a funciones y la lógica está en el controller. El contrato de la API se escribió antes que el código (`docs/api-contract.md`).
- **`app.js` separado de `server.js`**: los tests levantan la app en un puerto libre sin tocar el servidor real.
- **La API devuelve el array/objeto directo** y los errores siempre como `{ message }`.
- **Detalle por renderizado condicional + URL** (corrección del Sprint 2): el detalle vive en `?id=3` y el resto de las vistas en `?vista=...`, sincronizados con `URLSearchParams` + `history.pushState` + el evento `popstate`, sin sumar React Router. Se puede recargar, compartir y usar atrás/adelante. Ya no se usa `localStorage` para pasar el producto entre páginas.
- **Footer fijo abajo** (corrección del Sprint 2): `#root` ocupa todo el alto en flex y `main` se estira, así el footer no flota con el carrito vacío.
- **CSS propio**: se reutilizó el `style.css` del sitio original (identidad de marca y responsive) en lugar de reescribirlo con Tailwind.
- **Carrito con cantidades**: una fila por pieza con su `cantidad` (así la `key` es el id del producto). Se actualiza con la forma funcional de `setCarrito`, para no perder clics seguidos, y se guarda en `localStorage` (como el sitio original). Al leerlo se validan los datos: si están dañados, el carrito arranca vacío en lugar de romper la página.
- **`useEffect`** se usa para pedir los datos al montar el componente, aunque no esté en la teoría del sprint: es la forma estándar de hacer un `fetch` desde un componente. Si el usuario cambia de pantalla antes de que llegue la respuesta, se ignora (función de limpieza del efecto).
- **Hook propio `useProductos`**: el catálogo y los destacados del inicio necesitan el mismo pedido; en lugar de repetir el `fetch` en dos componentes, vive en un solo lugar.
- **Buscador sin tildes ni mayúsculas**: "cordoba" encuentra "Sillas Córdoba".
- **Errores de la API sin detalles internos**: el cliente solo recibe `{ message }`; los ids se comparan exactos (`0x3` o `3.0` dan `404`).
- **Deploy en Vercel, front y back juntos**: un solo proyecto y un solo dominio. El backend no se reescribe para producción: `api/index.js` reutiliza `backend/app.js` (por eso `app.js` está separado de `server.js`, que solo se usa en desarrollo). Cada merge a `main` vuelve a publicar el sitio.

## Flujo de trabajo

- **Ramas**: `main` (releases) ← `develop` (integración) ← ramas cortas por tarea (`feature/*`, `chore/*`, `docs/*`). Las dos ramas principales están protegidas: todo entra por **Pull Request** con el CI en verde.
- **Issues**: una por bloque de requisitos; cada PR la cierra con `Closes #N`.
- **Commits convencionales** (`feat`, `fix`, `docs`, `chore`, `test`, `ci`…), validados por **commitlint**.
- **Husky + lint-staged**: antes de cada commit corren ESLint y Prettier sobre los archivos modificados.
- **CI (GitHub Actions)**: en cada PR y push a `develop`/`main` corre `npm ci`, lint, build del client y tests.
- **Releases**: `v0.3.0` (Sprint 3, backend), `v1.0.0` (Sprint 4, React), `v1.0.1` (correcciones de la revisión final) y `v1.1.0` (deploy en Vercel).
- **Deploy continuo**: Vercel está conectado al repo; cada merge a `main` publica una versión nueva en la demo.
- **Desarrollo asistido por IA**: `AGENTS.md` define el rol, el stack, las reglas y las convenciones para los agentes; el código generado se revisó y probó en cada PR antes de mergear.

## Tests

```bash
npm test
```

Cubren: listado de productos (11 ítems y forma de los datos), producto por id, `404` de producto inexistente o con id mal escrito (`abc`, `03`, `3.0`, `0x3`), `404` de ruta inexistente, `400` por JSON mal formado y `500` sin detalles internos. Ninguna respuesta de error incluye el `stack`.

El client se probó a mano en el navegador (computadora y celular): navegación y URLs, recarga en cada vista, atrás/adelante, buscador, carrito (agregar, quitar, vaciar, persistencia y datos guardados dañados), formulario de contacto y estados de carga/error con el backend apagado.
