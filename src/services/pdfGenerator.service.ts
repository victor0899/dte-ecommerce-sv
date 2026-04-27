import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { DTE } from '@/@types';

/**
 * Genera un PDF a partir de un elemento HTML
 * @param element - Elemento HTML a convertir
 * @param filename - Nombre del archivo PDF
 */
export const generatePDFFromElement = async (
  element: HTMLElement,
  filename: string
): Promise<void> => {
  try {
    console.log('Iniciando captura del elemento para PDF...');

    // Capturar el elemento como canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Mayor calidad
      useCORS: true, // Permitir imágenes cross-origin
      logging: true, // Habilitar logging para debug
      backgroundColor: '#ffffff',
      allowTaint: true, // Permitir imágenes con taint
      removeContainer: false,
      imageTimeout: 0,
    });

    console.log('Canvas capturado exitosamente:', canvas.width, 'x', canvas.height);

    // Obtener dimensiones
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width en mm
    const pageHeight = 297; // A4 height en mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    // Crear PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = 0;

    // Añadir primera página
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Añadir páginas adicionales si es necesario
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Guardar PDF
    console.log('Guardando PDF:', filename);
    pdf.save(filename);
    console.log('PDF generado exitosamente');
  } catch (error) {
    console.error('Error detallado al generar PDF:', error);
    if (error instanceof Error) {
      throw new Error(`No se pudo generar el PDF: ${error.message}`);
    }
    throw new Error('No se pudo generar el PDF: Error desconocido');
  }
};

/**
 * Genera un PDF de una factura DTE
 * @param dte - Objeto DTE
 * @param elementId - ID del elemento HTML del template
 */
export const generateInvoicePDF = async (
  dte: DTE,
  elementId: string = 'invoice-template'
): Promise<void> => {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error('No se encontró el template de la factura');
  }

  const filename = `Factura-${dte.identificacion.numeroControl}.pdf`;
  await generatePDFFromElement(element, filename);
};

/**
 * Genera un Blob del PDF (útil para preview o almacenamiento)
 * @param element - Elemento HTML a convertir
 * @returns Blob del PDF
 */
export const generatePDFBlob = async (element: HTMLElement): Promise<Blob> => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    return pdf.output('blob');
  } catch (error) {
    console.error('Error al generar PDF Blob:', error);
    throw new Error('No se pudo generar el PDF');
  }
};
