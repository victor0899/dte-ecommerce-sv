import type {
  CartItem,
  CustomerFCF,
  CustomerCCF,
  DTEFCF,
  DTECCF,
  DTECuerpoDocumento,
  DTEReceptorCCF,
} from '@/@types';
import { EMISOR } from '@/lib/constants';
import {
  generarIdentificacion,
  generarSelloRecepcion,
} from '@/utils/dteHelpers';
import { numeroALetras } from '@/utils/numeroALetras';
import {
  calcularPrecioBase,
  calcularTotalesFCF,
  calcularTotalesCCF,
  roundToTwo,
} from '@/utils/taxCalculations';

/**
 * Genera el cuerpo del documento (items) para FCF
 * En FCF, el precio ya incluye IVA
 */
const generarCuerpoFCF = (items: CartItem[]): DTECuerpoDocumento[] => {
  return items.map((item, index) => ({
    numItem: index + 1,
    cantidad: item.quantity,
    codigo: item.product.codigo,
    descripcion: item.product.name,
    precioUni: roundToTwo(item.product.price),
    montoDescu: 0,
    ventaGravada: roundToTwo(item.product.price * item.quantity),
  }));
};

/**
 * Genera el cuerpo del documento (items) para CCF
 * En CCF, se trabaja con precio sin IVA
 */
const generarCuerpoCCF = (items: CartItem[]): DTECuerpoDocumento[] => {
  return items.map((item, index) => {
    const precioBase = calcularPrecioBase(item.product.price);
    return {
      numItem: index + 1,
      cantidad: item.quantity,
      codigo: item.product.codigo,
      descripcion: item.product.name,
      precioUni: precioBase,
      montoDescu: 0,
      ventaGravada: roundToTwo(precioBase * item.quantity),
    };
  });
};

/**
 * Genera DTE de Factura de Consumidor Final (FCF)
 */
export const generarDTEFCF = (
  items: CartItem[],
  customer: CustomerFCF
): DTEFCF => {
  const identificacion = generarIdentificacion('FCF');
  const cuerpoDocumento = generarCuerpoFCF(items);

  // Calcular totales
  const itemsParaCalculo = items.map(item => ({
    precioConIVA: item.product.price,
    cantidad: item.quantity,
  }));
  const totales = calcularTotalesFCF(itemsParaCalculo);

  const dte: DTEFCF = {
    identificacion,
    emisor: EMISOR,
    receptor: {
      nombre: customer.nombre,
      documento: customer.documento,
      correo: customer.correo,
    },
    cuerpoDocumento,
    resumen: {
      totalNoGravado: totales.totalNoGravado,
      totalGravada: totales.totalGravada,
      totalIva: totales.totalIva,
      subTotal: totales.subTotal,
      montoTotalOperacion: totales.montoTotalOperacion,
      totalPagar: totales.totalPagar,
      totalLetras: numeroALetras(totales.totalPagar),
      selloRecepcion: generarSelloRecepcion(),
    },
  };

  return dte;
};

/**
 * Genera DTE de Comprobante de Crédito Fiscal (CCF)
 */
export const generarDTECCF = (
  items: CartItem[],
  customer: CustomerCCF
): DTECCF => {
  const identificacion = generarIdentificacion('CCF');
  const cuerpoDocumento = generarCuerpoCCF(items);

  // Calcular totales
  const itemsParaCalculo = items.map(item => ({
    precioConIVA: item.product.price,
    cantidad: item.quantity,
  }));
  const totales = calcularTotalesCCF(itemsParaCalculo);

  // Receptor para CCF
  const receptor: DTEReceptorCCF = {
    tipoPersona: customer.tipoPersona === 'juridica' ? 1 : 2,
    nombre: customer.razonSocial,
    nrc: customer.nrc,
    nit: customer.nit,
    codActividad: customer.codActividad,
    direccion: customer.direccion,
    correo: customer.correo,
  };

  const dte: DTECCF = {
    identificacion,
    emisor: EMISOR,
    receptor,
    cuerpoDocumento,
    resumen: {
      totalNoGravado: totales.totalNoGravado,
      totalGravada: totales.totalGravada,
      subTotal: totales.subTotal,
      iva13: totales.iva13,
      montoTotalOperacion: totales.montoTotalOperacion,
      totalPagar: totales.totalPagar,
      totalLetras: numeroALetras(totales.totalPagar),
      selloRecepcion: generarSelloRecepcion(),
    },
  };

  return dte;
};

/**
 * Exporta el DTE como JSON string
 */
export const exportarDTEJSON = (dte: DTEFCF | DTECCF): string => {
  return JSON.stringify(dte, null, 2);
};

/**
 * Descarga el DTE como archivo JSON
 */
export const descargarDTEJSON = (dte: DTEFCF | DTECCF): void => {
  const json = exportarDTEJSON(dte);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `DTE-${dte.identificacion.numeroControl}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
