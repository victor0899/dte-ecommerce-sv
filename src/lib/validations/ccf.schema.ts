import { z } from 'zod';
import { REGEX_PATTERNS } from '@/lib/constants';

/**
 * Esquema de validación para Comprobante de Crédito Fiscal (CCF)
 */
export const ccfSchema = z.object({
  tipoPersona: z.enum(['juridica', 'natural'], {
    message: 'Debe seleccionar el tipo de persona',
  }),

  razonSocial: z
    .string()
    .min(3, 'La razón social debe tener al menos 3 caracteres')
    .max(200, 'La razón social no puede exceder 200 caracteres')
    .trim(),

  nrc: z
    .string()
    .regex(
      REGEX_PATTERNS.NRC,
      'Formato de NRC inválido. Use el formato: XXXXXX-X'
    )
    .trim(),

  nit: z
    .string()
    .regex(
      REGEX_PATTERNS.NIT,
      'Formato de NIT inválido. Use el formato: XXXX-XXXXXX-XXX-X'
    )
    .trim(),

  codActividad: z
    .string()
    .regex(
      REGEX_PATTERNS.CODIGO_ACTIVIDAD,
      'El código de actividad debe ser de 5 dígitos'
    )
    .trim(),

  direccion: z.object({
    departamento: z
      .string()
      .length(2, 'Debe seleccionar un departamento')
      .regex(/^\d{2}$/, 'Código de departamento inválido'),

    municipio: z
      .string()
      .length(2, 'Debe seleccionar un municipio')
      .regex(/^\d{2}$/, 'Código de municipio inválido'),

    complemento: z
      .string()
      .min(10, 'La dirección debe tener al menos 10 caracteres')
      .max(200, 'La dirección no puede exceder 200 caracteres')
      .trim(),
  }),

  correo: z
    .string()
    .email('Correo electrónico inválido')
    .max(100, 'El correo no puede exceder 100 caracteres')
    .toLowerCase()
    .trim(),
});

export type CCFFormData = z.infer<typeof ccfSchema>;
