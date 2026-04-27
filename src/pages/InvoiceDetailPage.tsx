import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, FileJson, Printer } from 'lucide-react';
import { useState, useRef } from 'react';
import { useInvoice } from '@/hooks/useInvoice';
import Button from '@/components/common/Button';
import InvoiceTemplate from '@/components/invoice/InvoiceTemplate';
import { generateInvoicePDF } from '@/services/pdfGenerator.service';
import { descargarDTEJSON } from '@/services/dteGenerator.service';

const InvoiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getById } = useInvoice();
  const [generating, setGenerating] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  const invoice = id ? getById(id) : undefined;

  if (!invoice) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Factura no encontrada
        </h2>
        <p className="text-gray-600 mb-6">
          No se pudo encontrar la factura solicitada
        </p>
        <Link to="/history">
          <Button>
            <ArrowLeft size={18} className="mr-2" />
            Volver al Historial
          </Button>
        </Link>
      </div>
    );
  }

  const dte = invoice.dte;
  const isFCF = dte.identificacion.tipoDte === '01';

  const handleDownloadPDF = async () => {
    setGenerating(true);
    try {
      await generateInvoicePDF(dte, 'invoice-detail-template');
    } catch (error) {
      alert('Error al generar PDF');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadJSON = () => {
    descargarDTEJSON(dte);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      {/* Header con acciones */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            to="/history"
            className="text-blue-600 hover:text-blue-700 flex items-center mb-2"
          >
            <ArrowLeft size={18} className="mr-1" />
            Volver al historial
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            Detalle de Factura
          </h1>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleDownloadJSON} variant="outline" size="sm">
            <FileJson size={18} className="mr-2" />
            Descargar JSON
          </Button>

          <Button onClick={handlePrint} variant="secondary" size="sm">
            <Printer size={18} className="mr-2" />
            Imprimir
          </Button>

          <Button onClick={handleDownloadPDF} disabled={generating} size="sm">
            <Download size={18} className="mr-2" />
            {generating ? 'Generando...' : 'Descargar PDF'}
          </Button>
        </div>
      </div>

      {/* Vista previa de la factura */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div id="invoice-detail-template">
          <InvoiceTemplate ref={invoiceRef} dte={dte} />
        </div>
      </div>

      {/* Información adicional */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="font-bold text-gray-900 mb-4">
          Información del Documento
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Tipo</p>
            <p className="font-medium">
              {isFCF ? 'Factura de Consumidor Final' : 'Crédito Fiscal'}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Código de Generación</p>
            <p className="font-mono text-xs">
              {dte.identificacion.codigoGeneracion}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Sello de Recepción</p>
            <p className="font-mono text-xs break-all">
              {dte.resumen.selloRecepcion}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Guardado</p>
            <p className="font-medium">
              {new Date(invoice.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailPage;
