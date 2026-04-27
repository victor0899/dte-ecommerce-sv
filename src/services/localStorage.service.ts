import { STORAGE_KEYS } from '@/lib/constants';
import type { CartItem, Invoice } from '@/@types';

/**
 * Servicio para gestionar localStorage
 */

// ============= CARRITO =============

/**
 * Guarda el carrito en localStorage
 */
export const saveCart = (items: CartItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  } catch (error) {
    console.error('Error al guardar carrito:', error);
  }
};

/**
 * Carga el carrito desde localStorage
 */
export const loadCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CART);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error al cargar carrito:', error);
    return [];
  }
};

/**
 * Limpia el carrito del localStorage
 */
export const clearCart = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.CART);
  } catch (error) {
    console.error('Error al limpiar carrito:', error);
  }
};

// ============= FACTURAS =============

/**
 * Guarda una factura en el historial
 */
export const saveInvoice = (invoice: Invoice): void => {
  try {
    const invoices = loadInvoices();
    invoices.unshift(invoice); // Agregar al inicio
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  } catch (error) {
    console.error('Error al guardar factura:', error);
  }
};

/**
 * Carga todas las facturas del historial
 */
export const loadInvoices = (): Invoice[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.INVOICES);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error al cargar facturas:', error);
    return [];
  }
};

/**
 * Obtiene una factura por su ID
 */
export const getInvoiceById = (id: string): Invoice | undefined => {
  try {
    const invoices = loadInvoices();
    return invoices.find(inv => inv.id === id);
  } catch (error) {
    console.error('Error al buscar factura:', error);
    return undefined;
  }
};

/**
 * Elimina una factura del historial
 */
export const deleteInvoice = (id: string): void => {
  try {
    const invoices = loadInvoices();
    const filtered = invoices.filter(inv => inv.id !== id);
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error al eliminar factura:', error);
  }
};

/**
 * Limpia todo el historial de facturas
 */
export const clearInvoices = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.INVOICES);
  } catch (error) {
    console.error('Error al limpiar facturas:', error);
  }
};

// ============= CONTADORES DTE =============

/**
 * Obtiene el contador actual de un tipo de DTE
 */
export const getDTECounter = (type: 'FCF' | 'CCF'): number => {
  try {
    const key =
      type === 'FCF' ? STORAGE_KEYS.FCF_COUNTER : STORAGE_KEYS.CCF_COUNTER;
    const stored = localStorage.getItem(key);
    return stored ? parseInt(stored, 10) : 0;
  } catch (error) {
    console.error('Error al obtener contador DTE:', error);
    return 0;
  }
};

/**
 * Incrementa y devuelve el siguiente número de contador
 */
export const incrementDTECounter = (type: 'FCF' | 'CCF'): number => {
  try {
    const key =
      type === 'FCF' ? STORAGE_KEYS.FCF_COUNTER : STORAGE_KEYS.CCF_COUNTER;
    const current = getDTECounter(type);
    const next = current + 1;
    localStorage.setItem(key, next.toString());
    return next;
  } catch (error) {
    console.error('Error al incrementar contador DTE:', error);
    return 1;
  }
};

/**
 * Resetea los contadores de DTE (útil para desarrollo)
 */
export const resetDTECounters = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.FCF_COUNTER);
    localStorage.removeItem(STORAGE_KEYS.CCF_COUNTER);
  } catch (error) {
    console.error('Error al resetear contadores:', error);
  }
};
