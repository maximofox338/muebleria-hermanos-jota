// Convierte 1420000 en "$ 1.420.000" (separador de miles argentino).
export function formatearPrecio(numero) {
  return '$ ' + numero.toLocaleString('es-AR');
}
