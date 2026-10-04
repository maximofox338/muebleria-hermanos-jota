# Contrato de la API

Base URL en desarrollo: `http://localhost:4000`. Todas las respuestas son JSON.

## Endpoints

| Método | Ruta | Respuesta OK | Errores |
|---|---|---|---|
| GET | `/api/productos` | `200` → array de productos | `500` |
| GET | `/api/productos/:id` | `200` → un producto | `404` si no existe, `500` |
| * | cualquier otra ruta | — | `404` |

## Producto

```json
{
  "id": 1,
  "nombre": "Aparador Uspallata",
  "precio": 1420000,
  "imagenURL": "/img/aparador-uspallata.png",
  "descripcion": "…",
  "especificaciones": [{ "nombre": "Medidas", "valor": "180 × 45 × 75 cm" }]
}
```

- `id`: número entero, único.
- `precio`: número en pesos argentinos, sin decimales. El client lo formatea.
- `imagenURL`: ruta absoluta servida por el client (`client/public/img/`).

## Errores

Siempre con la misma forma:

```json
{ "message": "Producto no encontrado" }
```

| Caso | Status | `message` |
|---|---|---|
| `/api/productos/:id` con id inexistente | `404` | `Producto no encontrado` |
| Ruta que no existe | `404` | `Ruta no encontrada: <método> <url>` |
| Error inesperado | `500` | `Error interno del servidor` |

Fuera de producción, la respuesta de error incluye además `stack` para depurar.

## Decisiones
- Se devuelve el array/objeto directo (sin envoltorio `{ success, data }`): es lo más simple de consumir y la consigna pide "el listado completo en JSON".
- Sin CORS: en desarrollo el client usa el proxy de Vite (`/api` → `:4000`).
