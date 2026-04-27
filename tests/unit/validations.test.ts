import { describe, it, expect } from 'vitest';
import { fcfSchema } from '@/lib/validations/fcf.schema';
import { ccfSchema } from '@/lib/validations/ccf.schema';

describe('Validation Schemas', () => {
  describe('FCF Schema', () => {
    it('should validate correct FCF data', () => {
      const validData = {
        nombre: 'Juan Pérez',
        documento: '12345678-9',
        correo: 'juan@email.com',
      };

      const result = fcfSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should require nombre', () => {
      const invalidData = {
        correo: 'juan@email.com',
      };

      const result = fcfSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should require correo', () => {
      const invalidData = {
        nombre: 'Juan Pérez',
      };

      const result = fcfSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should validate email format', () => {
      const invalidData = {
        nombre: 'Juan Pérez',
        correo: 'invalid-email',
      };

      const result = fcfSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should allow optional documento', () => {
      const validData = {
        nombre: 'Juan Pérez',
        correo: 'juan@email.com',
      };

      const result = fcfSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should trim whitespace from fields', () => {
      const data = {
        nombre: '  Juan Pérez  ',
        correo: '  juan@email.com  ',
      };

      const result = fcfSchema.safeParse(data);
      if (result.success) {
        expect(result.data.nombre).toBe('Juan Pérez');
        expect(result.data.correo).toBe('juan@email.com');
      }
    });
  });

  describe('CCF Schema', () => {
    it('should validate correct CCF data', () => {
      const validData = {
        tipoPersona: 'juridica',
        razonSocial: 'Empresa S.A. de C.V.',
        nrc: '123456-7',
        nit: '1234-567890-123-4',
        codActividad: '62020',
        direccion: {
          departamento: '06',
          municipio: '14',
          complemento: 'Calle Principal #123',
        },
        correo: 'empresa@email.com',
      };

      const result = ccfSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should require all mandatory fields', () => {
      const invalidData = {
        tipoPersona: 'juridica',
      };

      const result = ccfSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should validate NRC format', () => {
      const invalidData = {
        tipoPersona: 'juridica',
        razonSocial: 'Empresa S.A.',
        nrc: 'invalid',
        nit: '1234-567890-123-4',
        codActividad: '62020',
        direccion: {
          departamento: '06',
          municipio: '14',
          complemento: 'Calle Principal',
        },
        correo: 'empresa@email.com',
      };

      const result = ccfSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should validate NIT format', () => {
      const invalidData = {
        tipoPersona: 'juridica',
        razonSocial: 'Empresa S.A.',
        nrc: '123456-7',
        nit: 'invalid',
        codActividad: '62020',
        direccion: {
          departamento: '06',
          municipio: '14',
          complemento: 'Calle Principal',
        },
        correo: 'empresa@email.com',
      };

      const result = ccfSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should validate email format', () => {
      const invalidData = {
        tipoPersona: 'juridica',
        razonSocial: 'Empresa S.A.',
        nrc: '123456-7',
        nit: '1234-567890-123-4',
        codActividad: '62020',
        direccion: {
          departamento: '06',
          municipio: '14',
          complemento: 'Calle Principal',
        },
        correo: 'invalid-email',
      };

      const result = ccfSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should accept both juridica and natural persona types', () => {
      const juridicaData = {
        tipoPersona: 'juridica',
        razonSocial: 'Empresa S.A.',
        nrc: '123456-7',
        nit: '1234-567890-123-4',
        codActividad: '62020',
        direccion: {
          departamento: '06',
          municipio: '14',
          complemento: 'Calle Principal',
        },
        correo: 'empresa@email.com',
      };

      const naturalData = {
        ...juridicaData,
        tipoPersona: 'natural',
      };

      expect(ccfSchema.safeParse(juridicaData).success).toBe(true);
      expect(ccfSchema.safeParse(naturalData).success).toBe(true);
    });

    it('should require direccion object with all fields', () => {
      const invalidData = {
        tipoPersona: 'juridica',
        razonSocial: 'Empresa S.A.',
        nrc: '123456-7',
        nit: '1234-567890-123-4',
        codActividad: '62020',
        direccion: {
          departamento: '06',
        },
        correo: 'empresa@email.com',
      };

      const result = ccfSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should validate NRC pattern XXXXXX-X', () => {
      const validNRCs = ['123456-7', '000000-0', '999999-9'];
      const invalidNRCs = ['12345-7', '1234567', '123-456-7', 'abcdef-g'];

      validNRCs.forEach((nrc) => {
        const data = {
          tipoPersona: 'juridica',
          razonSocial: 'Empresa S.A.',
          nrc,
          nit: '1234-567890-123-4',
          codActividad: '62020',
          direccion: {
            departamento: '06',
            municipio: '14',
            complemento: 'Calle Principal',
          },
          correo: 'empresa@email.com',
        };
        expect(ccfSchema.safeParse(data).success).toBe(true);
      });

      invalidNRCs.forEach((nrc) => {
        const data = {
          tipoPersona: 'juridica',
          razonSocial: 'Empresa S.A.',
          nrc,
          nit: '1234-567890-123-4',
          codActividad: '62020',
          direccion: {
            departamento: '06',
            municipio: '14',
            complemento: 'Calle Principal',
          },
          correo: 'empresa@email.com',
        };
        expect(ccfSchema.safeParse(data).success).toBe(false);
      });
    });

    it('should validate NIT pattern XXXX-XXXXXX-XXX-X', () => {
      const validNITs = ['1234-567890-123-4', '0000-000000-000-0', '9999-999999-999-9'];
      const invalidNITs = ['1234567890123', '1234-5678-123-4', 'abcd-efghij-klm-n'];

      validNITs.forEach((nit) => {
        const data = {
          tipoPersona: 'juridica',
          razonSocial: 'Empresa S.A.',
          nrc: '123456-7',
          nit,
          codActividad: '62020',
          direccion: {
            departamento: '06',
            municipio: '14',
            complemento: 'Calle Principal',
          },
          correo: 'empresa@email.com',
        };
        expect(ccfSchema.safeParse(data).success).toBe(true);
      });

      invalidNITs.forEach((nit) => {
        const data = {
          tipoPersona: 'juridica',
          razonSocial: 'Empresa S.A.',
          nrc: '123456-7',
          nit,
          codActividad: '62020',
          direccion: {
            departamento: '06',
            municipio: '14',
            complemento: 'Calle Principal',
          },
          correo: 'empresa@email.com',
        };
        expect(ccfSchema.safeParse(data).success).toBe(false);
      });
    });
  });
});
