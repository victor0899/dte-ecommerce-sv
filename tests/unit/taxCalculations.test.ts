import { describe, it, expect } from 'vitest';
import {
  calcularPrecioBase,
  calcularIVA,
  calcularTotalesFCF,
  calcularTotalesCCF,
  roundToTwo,
} from '@/utils/taxCalculations';

describe('taxCalculations', () => {
  describe('roundToTwo', () => {
    it('should round to 2 decimal places', () => {
      expect(roundToTwo(10.123)).toBe(10.12);
      expect(roundToTwo(10.125)).toBe(10.13);
      expect(roundToTwo(10.126)).toBe(10.13);
      expect(roundToTwo(10)).toBe(10);
    });

    it('should handle negative numbers', () => {
      expect(roundToTwo(-10.125)).toBe(-10.13);
      expect(roundToTwo(-10.124)).toBe(-10.12);
    });
  });

  describe('calcularPrecioBase', () => {
    it('should calculate base price from price with IVA', () => {
      const precioConIVA = 113; // $100 + 13% IVA
      const precioBase = calcularPrecioBase(precioConIVA);
      expect(precioBase).toBe(100);
    });

    it('should handle decimal results correctly', () => {
      const precioConIVA = 56.5; // $50 + 13% IVA
      const precioBase = calcularPrecioBase(precioConIVA);
      expect(precioBase).toBe(50);
    });

    it('should round to 2 decimals', () => {
      const precioConIVA = 100;
      const precioBase = calcularPrecioBase(precioConIVA);
      expect(precioBase.toString().split('.')[1]?.length || 0).toBeLessThanOrEqual(2);
    });
  });

  describe('calcularIVA', () => {
    it('should calculate 13% IVA from base price', () => {
      const precioBase = 100;
      const iva = calcularIVA(precioBase);
      expect(iva).toBe(13);
    });

    it('should round to 2 decimals', () => {
      const precioBase = 10.55;
      const iva = calcularIVA(precioBase);
      expect(iva).toBe(1.37);
    });

    it('should handle zero', () => {
      expect(calcularIVA(0)).toBe(0);
    });
  });

  describe('calcularTotalesFCF', () => {
    it('should calculate totals correctly for FCF', () => {
      const items = [
        { precioConIVA: 113, cantidad: 1 },
        { precioConIVA: 56.5, cantidad: 2 },
      ];

      const totales = calcularTotalesFCF(items);

      // En FCF, totalGravada es el precio CON IVA incluido
      expect(totales.totalGravada).toBe(226); // 113 + 56.5 + 56.5
      expect(totales.totalIva).toBe(0); // Siempre 0 en FCF (IVA implícito)
      expect(totales.montoTotalOperacion).toBe(226);
      expect(totales.totalPagar).toBe(226);
    });

    it('should handle single item', () => {
      const items = [{ precioConIVA: 113, cantidad: 1 }];
      const totales = calcularTotalesFCF(items);

      expect(totales.totalGravada).toBe(113); // Precio con IVA
      expect(totales.totalIva).toBe(0); // IVA implícito en FCF
      expect(totales.totalPagar).toBe(113);
    });

    it('should handle multiple quantities', () => {
      const items = [{ precioConIVA: 113, cantidad: 3 }];
      const totales = calcularTotalesFCF(items);

      expect(totales.totalGravada).toBe(339); // 113 * 3
      expect(totales.totalIva).toBe(0); // IVA implícito en FCF
      expect(totales.totalPagar).toBe(339);
    });

    it('should set totalNoGravado to 0', () => {
      const items = [{ precioConIVA: 113, cantidad: 1 }];
      const totales = calcularTotalesFCF(items);

      expect(totales.totalNoGravado).toBe(0);
    });

    it('should calculate subTotal correctly', () => {
      const items = [{ precioConIVA: 113, cantidad: 1 }];
      const totales = calcularTotalesFCF(items);

      expect(totales.subTotal).toBe(113); // En FCF, subTotal = totalGravada
    });
  });

  describe('calcularTotalesCCF', () => {
    it('should calculate totals correctly for CCF', () => {
      const items = [
        { precioConIVA: 113, cantidad: 1 },
        { precioConIVA: 56.5, cantidad: 2 },
      ];

      const totales = calcularTotalesCCF(items);

      expect(totales.totalGravada).toBe(200);
      expect(totales.iva13).toBe(26);
      expect(totales.montoTotalOperacion).toBe(226);
      expect(totales.totalPagar).toBe(226);
    });

    it('should handle single item', () => {
      const items = [{ precioConIVA: 113, cantidad: 1 }];
      const totales = calcularTotalesCCF(items);

      expect(totales.totalGravada).toBe(100);
      expect(totales.iva13).toBe(13);
      expect(totales.totalPagar).toBe(113);
    });

    it('should set totalNoGravado to 0', () => {
      const items = [{ precioConIVA: 113, cantidad: 1 }];
      const totales = calcularTotalesCCF(items);

      expect(totales.totalNoGravado).toBe(0);
    });

    it('should calculate subTotal as totalGravada', () => {
      const items = [{ precioConIVA: 113, cantidad: 1 }];
      const totales = calcularTotalesCCF(items);

      expect(totales.subTotal).toBe(totales.totalGravada);
    });
  });

  describe('edge cases', () => {
    it('should handle empty items array for FCF', () => {
      const totales = calcularTotalesFCF([]);

      expect(totales.totalGravada).toBe(0);
      expect(totales.totalIva).toBe(0);
      expect(totales.totalPagar).toBe(0);
    });

    it('should handle empty items array for CCF', () => {
      const totales = calcularTotalesCCF([]);

      expect(totales.totalGravada).toBe(0);
      expect(totales.iva13).toBe(0);
      expect(totales.totalPagar).toBe(0);
    });

    it('should handle very small amounts', () => {
      const items = [{ precioConIVA: 0.01, cantidad: 1 }];
      const totales = calcularTotalesFCF(items);

      expect(totales.totalPagar).toBeGreaterThan(0);
      expect(totales.totalPagar).toBeLessThan(0.02);
    });

    it('should handle large amounts', () => {
      const items = [{ precioConIVA: 10000, cantidad: 100 }];
      const totales = calcularTotalesFCF(items);

      expect(totales.totalPagar).toBe(1000000);
    });
  });
});
