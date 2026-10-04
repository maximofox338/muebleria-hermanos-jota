// Convierte 1420000 en "$ 1.420.000" (pesos argentinos, sin decimales).
// El formato de moneda pone un espacio "duro" después del $, así el precio nunca se corta en dos líneas.
export function formatearPrecio(numero) {
  return numero.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
