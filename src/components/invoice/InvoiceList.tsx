import { Link } from 'react-router-dom';
import { FileText, Eye } from 'lucide-react';
import type { Invoice } from '@/@types';
import { formatCurrency } from '@/utils/dteHelpers';
import Button from '@/components/common/Button';

interface InvoiceListProps {
  invoices: Invoice[];
}

const InvoiceList = ({ invoices }: InvoiceListProps) => {
  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <FileText size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          No hay facturas generadas
        </h3>
        <p className="text-gray-500 mb-6">
          Las facturas que generes aparecerán aquí
        </p>
        <Link to="/">
          <Button>Ir a Productos</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invoices.map(invoice => {
        const dte = invoice.dte;
        const isFCF = dte.identificacion.tipoDte === '01';
        const date = new Date(invoice.createdAt);

        return (
          <div
            key={invoice.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      isFCF
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {isFCF ? 'FCF' : 'CCF'}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">
                    {dte.identificacion.numeroControl}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Cliente</p>
                    <p className="font-medium text-gray-900">
                      {dte.receptor.nombre}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Fecha</p>
                    <p className="font-medium text-gray-900">
                      {date.toLocaleDateString()} {date.toLocaleTimeString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Total</p>
                    <p className="font-bold text-lg text-blue-600">
                      {formatCurrency(dte.resumen.totalPagar)}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Items</p>
                    <p className="font-medium text-gray-900">
                      {dte.cuerpoDocumento.length}{' '}
                      {dte.cuerpoDocumento.length === 1
                        ? 'producto'
                        : 'productos'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 ml-4">
                <Link to={`/invoice/${invoice.id}`}>
                  <Button size="sm" variant="primary">
                    <Eye size={16} className="mr-2" />
                    Ver Detalle
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InvoiceList;
