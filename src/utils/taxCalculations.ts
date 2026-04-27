import { TAX_RATE } from '@/lib/constants';

/**
 * Calcula el precio base (sin IVA) a partir de un precio con IVA
 * @param precioConIVA - Precio que incluye IVA
 * @returns Precio sin IVA (redondeado a 2 decimales)
 */
export const calcularPrecioBase = (precioConIVA: number): number => {
  return Number((precioConIVA / (1 + TAX_RATE)).toFixed(2));
};

/**
 * Calcula el IVA a partir de un precio base
 * @param precioBase - Precio sin IVA
 * @returns Monto del IVA (redondeado a 2 decimales)
 */
export const calcularIVA = (precioBase: number): number => {
  return Number((precioBase * TAX_RATE).toFixed(2));
};

/**
 * Calcula el precio con IVA a partir de un precio base
 * @param precioBase - Precio sin IVA
 * @returns Precio con IVA (redondeado a 2 decimales)
 */
export const calcularPrecioConIVA = (precioBase: number): number => {
  return Number((precioBase * (1 + TAX_RATE)).toFixed(2));
};

/**
 * Redondea un número a 2 decimales
 * @param num - Número a redondear
 * @returns Número redondeado a 2 decimales
 */
export const roundToTwo = (num: number): number => {
  return Number(num.toFixed(2));
};

/**
 * Calcula totales para FCF (precios con IVA)
 * @param items - Array de items con precio y cantidad
 * @returns Objeto con totales calculados
 */
export const calcularTotalesFCF = (
  items: Array<{ precioConIVA: number; cantidad: number }>
) => {
  const totalGravada = items.reduce(
    (sum, item) => sum + item.precioConIVA * item.cantidad,
    0
  );

  return {
    totalNoGravado: 0,
    totalGravada: roundToTwo(totalGravada),
    totalIva: 0, // Siempre 0 en FCF (IVA implícito)
    subTotal: roundToTwo(totalGravada),
    montoTotalOperacion: roundToTwo(totalGravada),
    totalPagar: roundToTwo(totalGravada),
  };
};

/**
 * Calcula totales para CCF (precios sin IVA + IVA separado)
 * @param items - Array de items con precio y cantidad
 * @returns Objeto con totales calculados
 */
export const calcularTotalesCCF = (
  items: Array<{ precioConIVA: number; cantidad: number }>
) => {
  // Calcular precio base de cada item
  const itemsConBase = items.map(item => ({
    precioBase: calcularPrecioBase(item.precioConIVA),
    cantidad: item.cantidad,
  }));

  const totalGravada = itemsConBase.reduce(
    (sum, item) => sum + item.precioBase * item.cantidad,
    0
  );

  const iva13 = calcularIVA(totalGravada);
  const totalPagar = totalGravada + iva13;

  return {
    totalNoGravado: 0,
    totalGravada: roundToTwo(totalGravada),
    subTotal: roundToTwo(totalGravada),
    iva13: roundToTwo(iva13),
    montoTotalOperacion: roundToTwo(totalPagar),
    totalPagar: roundToTwo(totalPagar),
  };
};
