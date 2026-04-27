import { useState, useCallback } from 'react';
import type { Invoice } from '@/@types';
import {
  loadInvoices,
  saveInvoice,
  getInvoiceById,
  deleteInvoice,
} from '@/services/localStorage.service';

/**
 * Hook para gestionar facturas (historial)
 */
export const useInvoice = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar facturas
  const loadAll = useCallback(() => {
    setLoading(true);
    try {
      const data = loadInvoices();
      setInvoices(data);
    } catch (error) {
      console.error('Error al cargar facturas:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Guardar nueva factura
  const save = useCallback((invoice: Invoice) => {
    try {
      saveInvoice(invoice);
      setInvoices(prev => [invoice, ...prev]);
    } catch (error) {
      console.error('Error al guardar factura:', error);
      throw error;
    }
  }, []);

  // Obtener factura por ID
  const getById = useCallback((id: string): Invoice | undefined => {
    return getInvoiceById(id);
  }, []);

  // Eliminar factura
  const remove = useCallback((id: string) => {
    try {
      deleteInvoice(id);
      setInvoices(prev => prev.filter(inv => inv.id !== id));
    } catch (error) {
      console.error('Error al eliminar factura:', error);
      throw error;
    }
  }, []);

  return {
    invoices,
    loading,
    loadAll,
    save,
    getById,
    remove,
  };
};
