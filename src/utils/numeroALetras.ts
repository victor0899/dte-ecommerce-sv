/**
 * Convierte un número a su representación en letras (español)
 * Basado en la normativa de El Salvador para DTEs
 */

const UNIDADES = [
  '',
  'UNO',
  'DOS',
  'TRES',
  'CUATRO',
  'CINCO',
  'SEIS',
  'SIETE',
  'OCHO',
  'NUEVE',
];

const DECENAS = [
  '',
  'DIEZ',
  'VEINTE',
  'TREINTA',
  'CUARENTA',
  'CINCUENTA',
  'SESENTA',
  'SETENTA',
  'OCHENTA',
  'NOVENTA',
];

const ESPECIALES = [
  'DIEZ',
  'ONCE',
  'DOCE',
  'TRECE',
  'CATORCE',
  'QUINCE',
  'DIECISÉIS',
  'DIECISIETE',
  'DIECIOCHO',
  'DIECINUEVE',
];

const CENTENAS = [
  '',
  'CIENTO',
  'DOSCIENTOS',
  'TRESCIENTOS',
  'CUATROCIENTOS',
  'QUINIENTOS',
  'SEISCIENTOS',
  'SETECIENTOS',
  'OCHOCIENTOS',
  'NOVECIENTOS',
];

const convertirGrupo = (num: number): string => {
  if (num === 0) return '';
  if (num === 100) return 'CIEN';

  const centena = Math.floor(num / 100);
  const resto = num % 100;
  const decena = Math.floor(resto / 10);
  const unidad = resto % 10;

  let resultado = CENTENAS[centena];

  if (resto >= 10 && resto <= 19) {
    resultado += (resultado ? ' ' : '') + ESPECIALES[resto - 10];
  } else {
    if (decena > 0) {
      resultado += (resultado ? ' ' : '') + DECENAS[decena];
    }
    if (unidad > 0) {
      if (decena === 2) {
        resultado = resultado.replace('VEINTE', 'VEINTI') + UNIDADES[unidad];
      } else {
        resultado += (decena > 0 ? ' Y ' : '') + UNIDADES[unidad];
      }
    }
  }

  return resultado;
};

const convertirMiles = (num: number): string => {
  if (num === 0) return '';
  if (num === 1) return 'MIL';

  const miles = Math.floor(num / 1000);
  const resto = num % 1000;

  let resultado = '';

  if (miles > 0) {
    if (miles === 1) {
      resultado = 'MIL';
    } else {
      resultado = convertirGrupo(miles) + ' MIL';
    }
  }

  if (resto > 0) {
    resultado += (resultado ? ' ' : '') + convertirGrupo(resto);
  }

  return resultado;
};

const convertirMillones = (num: number): string => {
  if (num === 0) return 'CERO';

  const millones = Math.floor(num / 1000000);
  const resto = num % 1000000;

  let resultado = '';

  if (millones > 0) {
    if (millones === 1) {
      resultado = 'UN MILLÓN';
    } else {
      resultado = convertirGrupo(millones) + ' MILLONES';
    }
  }

  if (resto > 0) {
    const restoTexto = convertirMiles(resto);
    if (restoTexto) {
      resultado += (resultado ? ' ' : '') + restoTexto;
    }
  }

  return resultado;
};

/**
 * Convierte un número decimal a letras con formato de DTE
 * @param monto - Número decimal a convertir
 * @returns String en formato "CANTIDAD CENTAVOS/100 DÓLARES"
 */
export const numeroALetras = (monto: number): string => {
  const parteEntera = Math.floor(monto);
  const centavos = Math.round((monto - parteEntera) * 100);

  if (parteEntera === 0) {
    return `${centavos.toString().padStart(2, '0')}/100 DÓLARES`;
  }

  const letrasEntero = convertirMillones(parteEntera);
  const centavosStr = centavos.toString().padStart(2, '0');

  return `${letrasEntero} ${centavosStr}/100 DÓLARES`;
};
