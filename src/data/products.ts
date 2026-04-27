import type { Product } from '@/@types';

/**
 * Catálogo de productos mock
 * Precios con IVA incluido (13%)
 * Imágenes de Unsplash
 */
export const PRODUCTS: Product[] = [
  {
    id: 'P001',
    codigo: 'LAP-001',
    name: 'Laptop HP Pavilion 15',
    description:
      'Laptop HP Pavilion 15.6", Intel Core i5, 8GB RAM, 256GB SSD, Windows 11',
    price: 678.5, // $600 base + 13% IVA
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    stock: 15,
  },
  {
    id: 'P002',
    codigo: 'MOU-001',
    name: 'Mouse Logitech MX Master 3',
    description:
      'Mouse inalámbrico ergonómico Logitech MX Master 3, conexión Bluetooth y USB',
    price: 113.0, // $100 base + 13% IVA
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800',
    stock: 30,
  },
  {
    id: 'P003',
    codigo: 'TEC-001',
    name: 'Teclado Mecánico RGB',
    description:
      'Teclado mecánico gaming con iluminación RGB, switches Cherry MX Red',
    price: 90.4, // $80 base + 13% IVA
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800',
    stock: 20,
  },
  {
    id: 'P004',
    codigo: 'AUD-001',
    name: 'Audífonos Sony WH-1000XM4',
    description:
      'Audífonos inalámbricos con cancelación de ruido activa, batería 30 hrs',
    price: 395.5, // $350 base + 13% IVA
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
    stock: 12,
  },
  {
    id: 'P005',
    codigo: 'MON-001',
    name: 'Monitor LG UltraWide 34"',
    description:
      'Monitor LG UltraWide 34", resolución 3440x1440, 144Hz, IPS, HDR10',
    price: 508.5, // $450 base + 13% IVA
    image: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=800',
    stock: 8,
  },
  {
    id: 'P006',
    codigo: 'CAM-001',
    name: 'Webcam Logitech C920',
    description:
      'Webcam Full HD 1080p con micrófono estéreo, ideal para videoconferencias',
    price: 79.1, // $70 base + 13% IVA
    image: 'https://images.unsplash.com/photo-1609921205586-7e8a57516512?w=800',
    stock: 25,
  },
];

/**
 * Obtiene un producto por su ID
 */
export const getProductById = (id: string): Product | undefined => {
  return PRODUCTS.find(p => p.id === id);
};

/**
 * Busca productos por nombre o descripción
 */
export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return PRODUCTS.filter(
    p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.codigo?.toLowerCase().includes(lowerQuery)
  );
};
