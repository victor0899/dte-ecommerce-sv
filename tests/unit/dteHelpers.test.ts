import { describe, it, expect } from 'vitest';
import {
  formatCurrency,
  generarIdentificacion,
  generarSelloRecepcion,
} from '@/utils/dteHelpers';

describe('dteHelpers', () => {
  describe('formatCurrency', () => {
    it('should format currency with $ symbol', () => {
      expect(formatCurrency(100)).toBe('$100.00');
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should handle decimal numbers', () => {
      expect(formatCurrency(10.5)).toBe('$10.50');
      expect(formatCurrency(10.99)).toBe('$10.99');
    });

    it('should add thousands separator', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00');
      expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    });

    it('should handle negative numbers', () => {
      expect(formatCurrency(-100)).toBe('-$100.00');
      expect(formatCurrency(-1234.56)).toBe('-$1,234.56');
    });

    it('should round to 2 decimals', () => {
      expect(formatCurrency(10.125)).toBe('$10.13');
      expect(formatCurrency(10.124)).toBe('$10.12');
    });
  });

  describe('generarIdentificacion', () => {
    it('should generate FCF identification', () => {
      const id = generarIdentificacion('FCF');

      expect(id.tipoDte).toBe('01');
      expect(id.tipoModelo).toBe(1);
      expect(id.tipoOperacion).toBe(1);
      expect(id.tipoAmbiente).toBe('00');
      expect(id.version).toBe(1);
    });

    it('should generate CCF identification', () => {
      const id = generarIdentificacion('CCF');

      expect(id.tipoDte).toBe('03');
      expect(id.tipoModelo).toBe(1);
      expect(id.tipoOperacion).toBe(1);
      expect(id.tipoAmbiente).toBe('00');
      expect(id.version).toBe(1);
    });

    it('should generate unique codigo de generacion', () => {
      const id1 = generarIdentificacion('FCF');
      const id2 = generarIdentificacion('FCF');

      expect(id1.codigoGeneracion).not.toBe(id2.codigoGeneracion);
      expect(id1.codigoGeneracion.length).toBe(36); // UUID v4 length
    });

    it('should generate unique numero de control', () => {
      const id1 = generarIdentificacion('FCF');
      const id2 = generarIdentificacion('FCF');

      expect(id1.numeroControl).not.toBe(id2.numeroControl);
      // Formato: DTE-01-XXXXXXXXXXXXX (DTE-XX-15 dígitos)
      expect(id1.numeroControl).toMatch(/^DTE-\d{2}-\d{15}$/);
    });

    it('should include current date and time', () => {
      const id = generarIdentificacion('FCF');
      const now = new Date();
      const expectedDate = now.toISOString().split('T')[0];

      expect(id.fecEmi).toBe(expectedDate);
      expect(id.horEmi).toMatch(/^\d{2}:\d{2}:\d{2}$/);
    });
  });

  describe('generarSelloRecepcion', () => {
    it('should generate a seal string', () => {
      const sello = generarSelloRecepcion();

      expect(typeof sello).toBe('string');
      expect(sello.length).toBe(40); // 40 caracteres
    });

    it('should generate unique seals', () => {
      const sello1 = generarSelloRecepcion();
      const sello2 = generarSelloRecepcion();

      expect(sello1).not.toBe(sello2);
    });

    it('should be alphanumeric', () => {
      const sello = generarSelloRecepcion();
      // 40 caracteres alfanuméricos
      expect(sello).toMatch(/^[A-Za-z0-9]{40}$/);
    });
  });
});
