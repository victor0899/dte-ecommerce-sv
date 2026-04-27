import { describe, it, expect } from 'vitest';
import { numeroALetras } from '@/utils/numeroALetras';

describe('numeroALetras', () => {
  describe('basic numbers', () => {
    it('should convert single digits', () => {
      expect(numeroALetras(0)).toContain('DÓLARES');
      expect(numeroALetras(1)).toContain('DÓLAR');
      expect(numeroALetras(5)).toContain('CINCO');
      expect(numeroALetras(9)).toContain('NUEVE');
    });

    it('should convert tens', () => {
      expect(numeroALetras(10)).toContain('DIEZ');
      expect(numeroALetras(20)).toContain('VEINTE');
      expect(numeroALetras(30)).toContain('TREINTA');
      expect(numeroALetras(50)).toContain('CINCUENTA');
    });

    it('should convert teens (11-15)', () => {
      expect(numeroALetras(11)).toContain('ONCE');
      expect(numeroALetras(12)).toContain('DOCE');
      expect(numeroALetras(13)).toContain('TRECE');
      expect(numeroALetras(14)).toContain('CATORCE');
      expect(numeroALetras(15)).toContain('QUINCE');
    });

    it('should convert hundreds', () => {
      expect(numeroALetras(100)).toContain('CIEN');
      expect(numeroALetras(200)).toContain('DOSCIENTOS');
      expect(numeroALetras(500)).toContain('QUINIENTOS');
      expect(numeroALetras(900)).toContain('NOVECIENTOS');
    });
  });

  describe('compound numbers', () => {
    it('should convert numbers with tens and units', () => {
      expect(numeroALetras(21)).toContain('VEINTI');
      expect(numeroALetras(25)).toContain('VEINTICINCO');
      expect(numeroALetras(37)).toContain('TREINTA Y SIETE');
      expect(numeroALetras(99)).toContain('NOVENTA Y NUEVE');
    });

    it('should convert numbers with hundreds, tens and units', () => {
      expect(numeroALetras(123)).toContain('CIENTO');
      expect(numeroALetras(123)).toContain('VEINTI');
      expect(numeroALetras(456)).toContain('CUATROCIENTOS CINCUENTA Y SEIS');
      expect(numeroALetras(789)).toContain('SETECIENTOS OCHENTA Y NUEVE');
    });
  });

  describe('thousands', () => {
    it('should convert thousands', () => {
      expect(numeroALetras(1000)).toContain('MIL');
      expect(numeroALetras(2000)).toContain('DOS MIL');
      expect(numeroALetras(5000)).toContain('CINCO MIL');
    });

    it('should convert thousands with hundreds', () => {
      expect(numeroALetras(1100)).toContain('MIL');
      expect(numeroALetras(1100)).toContain('CIEN');
      expect(numeroALetras(1234)).toContain('MIL');
      expect(numeroALetras(1234)).toContain('DOSCIENTOS');
    });
  });

  describe('millions', () => {
    it('should convert millions', () => {
      expect(numeroALetras(1000000)).toContain('MILLÓN');
      expect(numeroALetras(2000000)).toContain('MILLONES');
      expect(numeroALetras(5000000)).toContain('CINCO');
    });

    it('should convert millions with thousands', () => {
      expect(numeroALetras(1234567)).toContain('MILLÓN');
      expect(numeroALetras(1234567)).toContain('DOSCIENTOS');
    });
  });

  describe('decimals (cents)', () => {
    it('should convert decimals correctly', () => {
      expect(numeroALetras(1.50)).toContain('50/100');
      expect(numeroALetras(10.99)).toContain('DIEZ');
      expect(numeroALetras(10.99)).toContain('99/100');
      expect(numeroALetras(100.01)).toContain('CIEN');
      expect(numeroALetras(100.01)).toContain('01/100');
    });

    it('should handle zero cents', () => {
      expect(numeroALetras(10.00)).toContain('DIEZ');
      expect(numeroALetras(100.0)).toContain('CIEN');
    });

    it('should round cents to 2 decimals', () => {
      expect(numeroALetras(10.125)).toMatch(/\d{2}\/100/);
      expect(numeroALetras(10.999)).toMatch(/\d{2}\/100/);
    });
  });

  describe('edge cases', () => {
    it('should handle zero', () => {
      expect(numeroALetras(0)).toContain('DÓLARES');
      expect(numeroALetras(0.0)).toContain('DÓLARES');
    });

    it('should handle very small amounts', () => {
      expect(numeroALetras(0.01)).toContain('01/100');
      expect(numeroALetras(0.99)).toContain('99/100');
    });

    it('should handle typical invoice amounts', () => {
      expect(numeroALetras(113)).toContain('CIENTO TRECE');
      expect(numeroALetras(226)).toContain('DOSCIENTOS');
      expect(numeroALetras(508.50)).toContain('QUINIENTOS');
      expect(numeroALetras(508.50)).toContain('50/100');
    });

    it('should always return uppercase', () => {
      const result = numeroALetras(12345.67);
      expect(result).toBe(result.toUpperCase());
    });

    it('should handle negative numbers', () => {
      // Assuming the function handles negatives or returns a valid format
      const result = numeroALetras(-10);
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('real-world examples', () => {
    it('should convert typical product prices', () => {
      expect(numeroALetras(678.50)).toContain('SEISCIENTOS SETENTA Y OCHO');
      expect(numeroALetras(113.00)).toContain('CIENTO TRECE');
      expect(numeroALetras(90.40)).toContain('NOVENTA');
      expect(numeroALetras(90.40)).toContain('40/100');
    });

    it('should convert typical invoice totals', () => {
      expect(numeroALetras(1234.56)).toContain('MIL DOSCIENTOS TREINTA Y CUATRO');
      expect(numeroALetras(5678.90)).toContain('CINCO MIL SEISCIENTOS SETENTA Y OCHO');
    });
  });
});
