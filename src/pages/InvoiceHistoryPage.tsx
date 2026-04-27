import { useEffect } from 'react';
import { useInvoice } from '@/hooks/useInvoice';
import InvoiceList from '@/components/invoice/InvoiceList';

const InvoiceHistoryPage = () => {
  const { invoices, loadAll, loading } = useInvoice();

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Historial de Facturas
        </h1>
        <p className="text-gray-600">
          Todas las facturas electrónicas generadas
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando facturas...</p>
        </div>
      ) : (
        <InvoiceList invoices={invoices} />
      )}
    </div>
  );
};

export default InvoiceHistoryPage;
