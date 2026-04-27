import { v4 as uuidv4 } from 'uuid';
import {
  STORAGE_KEYS,
  DTE_CONTROL_PREFIX,
  TIPO_AMBIENTE,
  TIPO_MODELO,
  TIPO_OPERACION,
  DTE_CODES,
} from '@/lib/constants';
import type { DocumentType, DTEIdentificacion } from '@/@types';

/**
 * Genera un código de generación (UUID de 36 caracteres en mayúsculas)
 * @returns UUID en formato XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
export const generarCodigoGeneracion = (): string => {
  return uuidv4().toUpperCase();
};

/**
 * Obtiene el siguiente número de control secuencial
 * @param tipoDocumento - Tipo de documento (FCF o CCF)
 * @returns Número de control en formato DTE-XX-YYYYYYYYYYYYYYY
 */
export const generarNumeroControl = (tipoDocumento: DocumentType): string => {
  const storageKey =
    tipoDocumento === 'FCF'
      ? STORAGE_KEYS.FCF_COUNTER
      : STORAGE_KEYS.CCF_COUNTER;

  // Obtener contador actual del localStorage
  const currentCounter = parseInt(localStorage.getItem(storageKey) || '0', 10);
  const nextNumber = currentCounter + 1;

  // Guardar el nuevo contador
  localStorage.setItem(storageKey, nextNumber.toString());

  // Formatear con 15 dígitos (padding de ceros)
  const numeroFormateado = nextNumber.toString().padStart(15, '0');
  const prefix = DTE_CONTROL_PREFIX[tipoDocumento];

  return `${prefix}-${numeroFormateado}`;
};

/**
 * Genera un sello de recepción simulado (40 caracteres aleatorios)
 * En producción, este valor lo devuelve el Ministerio de Hacienda
 * @returns String de 40 caracteres alfanuméricos
 */
export const generarSelloRecepcion = (): string => {
  const caracteres =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
  let sello = '';

  for (let i = 0; i < 40; i++) {
    sello += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  return sello;
};

/**
 * Genera la fecha y hora actual en formato DTE
 * @returns Objeto con fecha (YYYY-MM-DD) y hora (HH:MM:SS)
 */
export const generarFechaHoraEmision = (): {
  fecEmi: string;
  horEmi: string;
} => {
  const ahora = new Date();

  const fecEmi = ahora.toISOString().split('T')[0]; // YYYY-MM-DD

  const horEmi = ahora.toTimeString().split(' ')[0]; // HH:MM:SS

  return { fecEmi, horEmi };
};

/**
 * Genera la sección de identificación del DTE
 * @param tipoDocumento - Tipo de documento (FCF o CCF)
 * @returns Objeto DTEIdentificacion completo
 */
export const generarIdentificacion = (
  tipoDocumento: DocumentType
): DTEIdentificacion => {
  const { fecEmi, horEmi } = generarFechaHoraEmision();
  const tipoDte = DTE_CODES[tipoDocumento];

  return {
    version: 1,
    tipoDte,
    codigoGeneracion: generarCodigoGeneracion(),
    numeroControl: generarNumeroControl(tipoDocumento),
    fecEmi,
    horEmi,
    tipoAmbiente: TIPO_AMBIENTE,
    tipoModelo: TIPO_MODELO,
    tipoOperacion: TIPO_OPERACION,
  };
};

/**
 * Formatea un número para display (con símbolo de dólar y 2 decimales)
 * @param monto - Número a formatear
 * @returns String formateado
 */
export const formatCurrency = (monto: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(monto);
};
