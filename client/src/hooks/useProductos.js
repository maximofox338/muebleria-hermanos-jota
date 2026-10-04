import { useEffect, useState } from 'react';

// Hook propio: pide el catálogo a la API (GET /api/productos) y devuelve
// los tres estados del pedido. Lo usan ProductList (catálogo) y Home (destacados).
export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  // [] = se ejecuta una sola vez, cuando el componente aparece
  useEffect(() => {
    // Si el componente desaparece antes de que llegue la respuesta, la ignoramos
    let ignorar = false;

    async function cargarProductos() {
      try {
        const respuesta = await fetch('/api/productos');
        if (!respuesta.ok) {
          throw new Error('Error ' + respuesta.status);
        }
        const datos = await respuesta.json();
        if (!ignorar) setProductos(datos);
      } catch {
        if (!ignorar) setError(true);
      } finally {
        if (!ignorar) setCargando(false);
      }
    }

    cargarProductos();
    return () => {
      ignorar = true;
    };
  }, []);

  return { productos, cargando, error };
}
