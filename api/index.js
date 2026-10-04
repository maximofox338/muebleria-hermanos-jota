// Función de Vercel: publica la misma app de Express del backend.
// En producción, vercel.json manda acá todas las rutas /api/*; en desarrollo se usa backend/server.js.
import app from '../backend/app.js';

export default app;
