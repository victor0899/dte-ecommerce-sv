import type { DTEEmisor } from '@/@types';

// Tasa de IVA
export const TAX_RATE = 0.13; // 13% IVA El Salvador

// Tipos de Documento
export const DOCUMENT_TYPES = {
  FCF: 'FCF', // Factura de Consumidor Final
  CCF: 'CCF', // Comprobante de Crédito Fiscal
} as const;

// Códigos de tipo DTE según MH
export const DTE_CODES = {
  FCF: '01',
  CCF: '03',
} as const;

// Prefijos para número de control
export const DTE_CONTROL_PREFIX = {
  FCF: 'DTE-01',
  CCF: 'DTE-03',
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  INVOICES: 'dte_invoices',
  CART: 'dte_cart',
  FCF_COUNTER: 'fcf_counter',
  CCF_COUNTER: 'ccf_counter',
} as const;

// Ambiente y modelo
export const TIPO_AMBIENTE = '00' as const; // 00=Pruebas, 01=Producción
export const TIPO_MODELO = 1 as const; // Siempre 1
export const TIPO_OPERACION = 1 as const; // Siempre 1

// Datos del Emisor (hardcoded para la prueba técnica)
export const EMISOR: DTEEmisor = {
  nit: '0614-123456-101-1',
  nrc: '123456-7',
  nombre: 'Comercio Electrónico El Salvador S.A. de C.V.',
  nombreComercial: 'E-Commerce SV',
  codActividad: '47911', // Comercio al por menor por internet
  direccion: {
    departamento: '06', // San Salvador
    municipio: '14', // San Salvador
    complemento: 'Colonia Escalón, Avenida Principal #123',
  },
  telefono: '2222-1234',
  correo: 'ventas@ecommercesv.com',
};

// Códigos de actividad económica (ejemplos comunes)
export const ACTIVIDADES_ECONOMICAS = [
  { codigo: '47911', nombre: 'Comercio al por menor por internet' },
  { codigo: '62010', nombre: 'Actividades de programación informática' },
  { codigo: '47190', nombre: 'Comercio al por menor en establecimientos' },
  { codigo: '56101', nombre: 'Actividades de restaurantes' },
  { codigo: '47730', nombre: 'Farmacias' },
] as const;

// Validación de formatos
export const REGEX_PATTERNS = {
  NIT: /^\d{4}-\d{6}-\d{3}-\d$/,
  NRC: /^\d{6}-\d$/,
  DUI: /^\d{8}-\d$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  CODIGO_ACTIVIDAD: /^\d{5}$/,
} as const;
