// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Precio CON IVA incluido (para UI)
  image: string;
  stock: number;
  codigo?: string; // Código del producto
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  total: number;
}

// Geographic Types
export interface Direccion {
  departamento: string; // Código de 2 dígitos
  municipio: string; // Código de 2 dígitos
  complemento: string; // Dirección detallada
}

// Customer Types (para formularios)
export interface CustomerFCF {
  nombre: string;
  documento?: string; // DUI o NIT opcional
  correo: string;
}

export interface CustomerCCF {
  tipoPersona: 'juridica' | 'natural';
  razonSocial: string;
  nrc: string; // Formato: XXXXXX-X
  nit: string; // Formato: XXXX-XXXXXX-XXX-X
  codActividad: string; // 5 dígitos
  direccion: Direccion;
  correo: string;
}

// DTE JSON Structure (según normativa MH)
export interface DTEIdentificacion {
  version: number; // 1
  tipoDte: '01' | '03'; // 01=FCF, 03=CCF
  codigoGeneracion: string; // UUID de 36 caracteres
  numeroControl: string; // DTE-XX-YYYYYYYYYYYYYYY
  fecEmi: string; // YYYY-MM-DD
  horEmi: string; // HH:MM:SS
  tipoAmbiente: '00' | '01'; // 00=Pruebas, 01=Producción
  tipoModelo: 1; // Siempre 1
  tipoOperacion: 1; // Siempre 1
}

export interface DTEEmisor {
  nit: string;
  nrc: string;
  nombre: string;
  nombreComercial?: string;
  codActividad: string;
  direccion: Direccion;
  telefono?: string;
  correo?: string;
}

export interface DTEReceptorFCF {
  nombre: string;
  documento?: string; // DUI o NIT opcional
  correo?: string;
}

export interface DTEReceptorCCF {
  tipoPersona: 1 | 2; // 1=Jurídica, 2=Natural
  nombre: string;
  nrc: string;
  nit: string;
  codActividad: string;
  direccion: Direccion;
  telefono?: string;
  correo: string;
}

export interface DTECuerpoDocumento {
  numItem: number;
  cantidad: number;
  codigo?: string;
  descripcion: string;
  precioUni: number;
  montoDescu: number;
  ventaGravada: number; // Con IVA para FCF, sin IVA para CCF
}

export interface DTEResumenFCF {
  totalNoGravado: number;
  totalGravada: number; // Total con IVA
  totalIva: number; // Siempre 0.00 (implícito)
  subTotal: number;
  montoTotalOperacion: number;
  totalPagar: number;
  totalLetras: string;
  selloRecepcion: string; // 40 caracteres aleatorios
}

export interface DTEResumenCCF {
  totalNoGravado: number;
  totalGravada: number; // Total SIN IVA
  subTotal: number;
  iva13: number; // IVA calculado explícitamente
  montoTotalOperacion: number;
  totalPagar: number;
  totalLetras: string;
  selloRecepcion: string;
}

// DTE Complete Structures
export interface DTEFCF {
  identificacion: DTEIdentificacion;
  emisor: DTEEmisor;
  receptor: DTEReceptorFCF;
  cuerpoDocumento: DTECuerpoDocumento[];
  resumen: DTEResumenFCF;
}

export interface DTECCF {
  identificacion: DTEIdentificacion;
  emisor: DTEEmisor;
  receptor: DTEReceptorCCF;
  cuerpoDocumento: DTECuerpoDocumento[];
  resumen: DTEResumenCCF;
}

export type DTE = DTEFCF | DTECCF;

// Invoice History Types
export interface Invoice {
  id: string;
  dte: DTE;
  createdAt: string;
  pdfUrl?: string; // URL del PDF generado (blob o data URL)
}

// Document Type
export type DocumentType = 'FCF' | 'CCF';

// Form Data Types (para React Hook Form)
export interface CheckoutFormData {
  documentType: DocumentType;
  customer: CustomerFCF | CustomerCCF;
}
