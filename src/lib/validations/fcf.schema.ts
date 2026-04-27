import { z } from 'zod';
import { REGEX_PATTERNS } from '@/lib/constants';

/**
 * Esquema de validación para Factura de Consumidor Final (FCF)
 */
export const fcfSchema = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),

  documento: z
    .string()
    .optional()
    .refine(
      val => {
        if (!val || val.trim() === '') return true;
        return REGEX_PATTERNS.DUI.test(val) || REGEX_PATTERNS.NIT.test(val);
      },
      {
        message:
          'Formato inválido. Use DUI (########-#) o NIT (####-######-###-#)',
      }
    ),

  correo: z
    .string()
    .email('Correo electrónico inválido')
    .max(100, 'El correo no puede exceder 100 caracteres')
    .toLowerCase()
    .trim(),
});

export type FCFFormData = z.infer<typeof fcfSchema>;
