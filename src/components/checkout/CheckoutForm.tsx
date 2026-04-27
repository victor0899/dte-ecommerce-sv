import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { DocumentType, Invoice, DTE } from '@/@types';
import { useCart } from '@/hooks/useCart';
import { useInvoice } from '@/hooks/useInvoice';
import {
  generarDTEFCF,
  generarDTECCF,
  descargarDTEJSON,
} from '@/services/dteGenerator.service';
import { generateInvoicePDF } from '@/services/pdfGenerator.service';
import InvoiceTemplate from '@/components/invoice/InvoiceTemplate';
import FCFForm from './FCFForm';
import CCFForm from './CCFForm';
import type { FCFFormData } from '@/lib/validations/fcf.schema';
import type { CCFFormData } from '@/lib/validations/ccf.schema';

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { state, clearCart } = useCart();
  const { save } = useInvoice();
  const [documentType, setDocumentType] = useState<DocumentType>('FCF');
  const [loading, setLoading] = useState(false);
  const [tempDTE, setTempDTE] = useState<DTE | null>(null);
  const invoiceRef = useRef<HTMLDivElement>(null);

  // Función auxiliar para esperar a que el elemento exista en el DOM
  const waitForElement = (elementId: string, timeout = 5000): Promise<HTMLElement> => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();

      const checkElement = () => {
        const element = document.getElementById(elementId);

        if (element) {
          resolve(element);
        } else if (Date.now() - startTime > timeout) {
          reject(new Error(`Timeout esperando el elemento: ${elementId}`));
        } else {
          setTimeout(checkElement, 50);
        }
      };

      checkElement();
    });
  };

  const handleFCFSubmit = async (data: FCFFormData) => {
    setLoading(true);
    try {
      // Generar DTE
      const dte = generarDTEFCF(state.items, data);

      // Setear DTE temporal para renderizar template
      setTempDTE(dte);

      // Esperar a que el elemento exista en el DOM
      await waitForElement('invoice-template');

      // Delay adicional para asegurar que los estilos se apliquen
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generar PDF
      await generateInvoicePDF(dte, 'invoice-template');

      // Crear invoice
      const invoice: Invoice = {
        id: dte.identificacion.codigoGeneracion,
        dte,
        createdAt: new Date().toISOString(),
      };

      // Guardar en historial
      save(invoice);

      // Descargar JSON
      descargarDTEJSON(dte);

      // Limpiar carrito
      clearCart();

      // Limpiar DTE temporal
      setTempDTE(null);

      // Mostrar mensaje de éxito y redirigir
      alert(
        `Factura ${dte.identificacion.numeroControl} generada exitosamente`
      );
      navigate(`/invoice/${invoice.id}`);
    } catch (error) {
      console.error('Error al generar factura FCF:', error);
      const errorMessage = error instanceof Error
        ? `Error: ${error.message}`
        : 'Error desconocido al generar la factura.';
      alert(`Error al generar la factura FCF.\n\n${errorMessage}\n\nPor favor intente nuevamente.`);
      setTempDTE(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCCFSubmit = async (data: CCFFormData) => {
    setLoading(true);
    try {
      // Generar DTE
      const dte = generarDTECCF(state.items, data);

      // Setear DTE temporal para renderizar template
      setTempDTE(dte);

      // Esperar a que el elemento exista en el DOM
      await waitForElement('invoice-template');

      // Delay adicional para asegurar que los estilos se apliquen
      await new Promise(resolve => setTimeout(resolve, 300));

      // Generar PDF
      await generateInvoicePDF(dte, 'invoice-template');

      // Crear invoice
      const invoice: Invoice = {
        id: dte.identificacion.codigoGeneracion,
        dte,
        createdAt: new Date().toISOString(),
      };

      // Guardar en historial
      save(invoice);

      // Descargar JSON
      descargarDTEJSON(dte);

      // Limpiar carrito
      clearCart();

      // Limpiar DTE temporal
      setTempDTE(null);

      // Mostrar mensaje de éxito y redirigir
      alert(
        `Factura ${dte.identificacion.numeroControl} generada exitosamente`
      );
      navigate(`/invoice/${invoice.id}`);
    } catch (error) {
      console.error('Error al generar factura CCF:', error);
      const errorMessage = error instanceof Error
        ? `Error: ${error.message}`
        : 'Error desconocido al generar la factura.';
      alert(`Error al generar la factura CCF.\n\n${errorMessage}\n\nPor favor intente nuevamente.`);
      setTempDTE(null);
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    return null;
  }

  return (
    <>
      {/* Template oculto para generar PDF */}
      {tempDTE && (
        <div
          style={{
            position: 'fixed',
            left: '-9999px',
            top: '0',
            width: '794px',
            backgroundColor: 'white',
            zIndex: -1,
          }}
          id="invoice-template"
        >
          <InvoiceTemplate ref={invoiceRef} dte={tempDTE} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Datos de Facturación
        </h2>

        {/* Document Type Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Tipo de Documento
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setDocumentType('FCF')}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                documentType === 'FCF'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg">FCF</span>
                {documentType === 'FCF' && (
                  <span className="text-blue-600">✓</span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Factura de Consumidor Final
              </p>
              <p className="text-xs text-gray-500 mt-1">
                IVA incluido en precios
              </p>
            </button>

            <button
              type="button"
              onClick={() => setDocumentType('CCF')}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                documentType === 'CCF'
                  ? 'border-green-600 bg-green-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-lg">CCF</span>
                {documentType === 'CCF' && (
                  <span className="text-green-600">✓</span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                Comprobante de Crédito Fiscal
              </p>
              <p className="text-xs text-gray-500 mt-1">IVA calculado aparte</p>
            </button>
          </div>
        </div>

        {/* Forms */}
        <div className="mt-6">
          {documentType === 'FCF' ? (
            <FCFForm onSubmit={handleFCFSubmit} loading={loading} />
          ) : (
            <CCFForm onSubmit={handleCCFSubmit} loading={loading} />
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
