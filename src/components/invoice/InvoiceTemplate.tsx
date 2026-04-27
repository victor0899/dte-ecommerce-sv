import { forwardRef } from 'react';
import type { DTE } from '@/@types';
import { formatCurrency } from '@/utils/dteHelpers';
import { EMISOR } from '@/lib/constants';

interface InvoiceTemplateProps {
  dte: DTE;
}

/**
 * Template HTML de la factura para imprimir/PDF
 * Este componente se renderiza oculto y se captura con html2canvas
 */
const InvoiceTemplate = forwardRef<HTMLDivElement, InvoiceTemplateProps>(
  ({ dte }, ref) => {
    const isFCF = dte.identificacion.tipoDte === '01';

    return (
      <div
        ref={ref}
        className="bg-white p-8 max-w-4xl mx-auto"
        style={{
          fontFamily: 'Arial, sans-serif',
          width: '794px', // A4 width in pixels at 96 DPI
          minHeight: '1123px', // A4 height in pixels at 96 DPI
          backgroundColor: '#ffffff',
          padding: '32px',
        }}
      >
        {/* Header */}
        <div className="border-b-2 border-gray-800 pb-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {EMISOR.nombreComercial}
              </h1>
              <p className="text-sm text-gray-600 mt-1">{EMISOR.nombre}</p>
              <p className="text-sm text-gray-600">NIT: {EMISOR.nit}</p>
              <p className="text-sm text-gray-600">NRC: {EMISOR.nrc}</p>
            </div>
            <div className="text-right">
              <div
                className={`inline-block px-4 py-2 rounded ${
                  isFCF ? 'bg-blue-100' : 'bg-green-100'
                }`}
              >
                <p className="font-bold text-lg">
                  {isFCF ? 'FACTURA' : 'CRÉDITO FISCAL'}
                </p>
                <p className="text-xs">
                  {isFCF ? 'Consumidor Final' : 'Comprobante'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Document Info */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p>
              <strong>Número de Control:</strong>
            </p>
            <p className="text-gray-700">{dte.identificacion.numeroControl}</p>
          </div>
          <div>
            <p>
              <strong>Código de Generación:</strong>
            </p>
            <p className="text-gray-700 break-all">
              {dte.identificacion.codigoGeneracion}
            </p>
          </div>
          <div>
            <p>
              <strong>Fecha de Emisión:</strong>
            </p>
            <p className="text-gray-700">
              {dte.identificacion.fecEmi} {dte.identificacion.horEmi}
            </p>
          </div>
          <div>
            <p>
              <strong>Sello de Recepción:</strong>
            </p>
            <p className="text-gray-700 break-all text-xs">
              {dte.resumen.selloRecepcion}
            </p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-gray-50 p-4 rounded mb-6">
          <h3 className="font-bold text-gray-900 mb-2">Cliente</h3>
          <div className="text-sm space-y-1">
            <p>
              <strong>Nombre:</strong> {dte.receptor.nombre}
            </p>
            {'nrc' in dte.receptor && (
              <>
                <p>
                  <strong>NRC:</strong> {dte.receptor.nrc}
                </p>
                <p>
                  <strong>NIT:</strong> {dte.receptor.nit}
                </p>
                <p>
                  <strong>Actividad:</strong> {dte.receptor.codActividad}
                </p>
              </>
            )}
            <p>
              <strong>Correo:</strong> {dte.receptor.correo}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-6 text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Descripción</th>
              <th className="p-2 text-right">Cant.</th>
              <th className="p-2 text-right">P. Unit.</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {dte.cuerpoDocumento.map(item => (
              <tr key={item.numItem} className="border-b">
                <td className="p-2">{item.numItem}</td>
                <td className="p-2">
                  {item.codigo && (
                    <span className="text-gray-500 text-xs">
                      [{item.codigo}]{' '}
                    </span>
                  )}
                  {item.descripcion}
                </td>
                <td className="p-2 text-right">{item.cantidad}</td>
                <td className="p-2 text-right">
                  {formatCurrency(item.precioUni)}
                </td>
                <td className="p-2 text-right">
                  {formatCurrency(item.ventaGravada)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-6">
          <div className="w-64 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Ventas Gravadas:</span>
              <span>{formatCurrency(dte.resumen.totalGravada)}</span>
            </div>

            {isFCF ? (
              <div className="flex justify-between text-gray-500 italic text-xs">
                <span>IVA (13%):</span>
                <span>Incluido</span>
              </div>
            ) : (
              'iva13' in dte.resumen && (
                <div className="flex justify-between">
                  <span>IVA (13%):</span>
                  <span>{formatCurrency(dte.resumen.iva13)}</span>
                </div>
              )
            )}

            <div className="flex justify-between font-bold text-lg border-t-2 border-gray-800 pt-2">
              <span>TOTAL:</span>
              <span>{formatCurrency(dte.resumen.totalPagar)}</span>
            </div>

            <div className="text-xs text-gray-600 mt-2">
              <strong>Total en letras:</strong>
              <br />
              {dte.resumen.totalLetras}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-4 text-center text-xs text-gray-500">
          <p>Documento Tributario Electrónico (DTE)</p>
          <p>
            Generado según normativa del Ministerio de Hacienda de El Salvador
          </p>
          <p className="mt-2">
            E-Commerce SV - Sistema de Facturación Electrónica
          </p>
        </div>
      </div>
    );
  }
);

InvoiceTemplate.displayName = 'InvoiceTemplate';

export default InvoiceTemplate;
