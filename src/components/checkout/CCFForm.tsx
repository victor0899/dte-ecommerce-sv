import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ccfSchema, type CCFFormData } from '@/lib/validations/ccf.schema';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import { DEPARTAMENTOS, getMunicipiosByDepartamento } from '@/lib/geography';
import { ACTIVIDADES_ECONOMICAS } from '@/lib/constants';
import { useState } from 'react';

interface CCFFormProps {
  onSubmit: (data: CCFFormData) => void;
  loading?: boolean;
}

const CCFForm = ({ onSubmit, loading = false }: CCFFormProps) => {
  const [selectedDepartamento, setSelectedDepartamento] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CCFFormData>({
    resolver: zodResolver(ccfSchema),
    defaultValues: {
      tipoPersona: 'juridica',
    },
  });

  const departamentoValue = watch('direccion.departamento');

  // Actualizar municipios cuando cambia el departamento
  const handleDepartamentoChange = (value: string) => {
    setSelectedDepartamento(value);
  };

  // Formatear NRC: XXXXXX-X
  const formatNRC = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 6) {
      return numbers;
    }
    return `${numbers.slice(0, 6)}-${numbers.slice(6, 7)}`;
  };

  // Formatear NIT: XXXX-XXXXXX-XXX-X
  const formatNIT = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) {
      return numbers;
    } else if (numbers.length <= 10) {
      return `${numbers.slice(0, 4)}-${numbers.slice(4)}`;
    } else if (numbers.length <= 13) {
      return `${numbers.slice(0, 4)}-${numbers.slice(4, 10)}-${numbers.slice(10)}`;
    }
    return `${numbers.slice(0, 4)}-${numbers.slice(4, 10)}-${numbers.slice(10, 13)}-${numbers.slice(13, 14)}`;
  };

  const handleNRCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNRC(e.target.value);
    setValue('nrc', formatted);
  };

  const handleNITChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNIT(e.target.value);
    setValue('nit', formatted);
  };

  const municipiosOptions = selectedDepartamento
    ? getMunicipiosByDepartamento(selectedDepartamento).map(m => ({
        value: m.codigo,
        label: m.nombre,
      }))
    : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-green-900 mb-2">
          Comprobante de Crédito Fiscal (CCF)
        </h3>
        <p className="text-sm text-green-700">
          Se calculará el IVA (13%) por separado. Todos los campos son
          obligatorios.
        </p>
      </div>

      {/* Tipo de Persona */}
      <Select
        label="Tipo de Persona"
        options={[
          { value: 'juridica', label: 'Persona Jurídica' },
          { value: 'natural', label: 'Persona Natural' },
        ]}
        error={errors.tipoPersona?.message}
        required
        {...register('tipoPersona')}
      />

      {/* Razón Social */}
      <Input
        label="Razón Social / Nombre"
        placeholder="Empresa S.A. de C.V."
        error={errors.razonSocial?.message}
        required
        {...register('razonSocial')}
      />

      {/* NRC */}
      <Input
        label="NRC (Número de Registro de Contribuyente)"
        placeholder="123456-7"
        helperText="Formato: XXXXXX-X"
        error={errors.nrc?.message}
        required
        maxLength={8}
        {...register('nrc', {
          onChange: handleNRCChange,
        })}
      />

      {/* NIT */}
      <Input
        label="NIT"
        placeholder="1234-567890-123-4"
        helperText="Formato: XXXX-XXXXXX-XXX-X"
        error={errors.nit?.message}
        required
        maxLength={17}
        {...register('nit', {
          onChange: handleNITChange,
        })}
      />

      {/* Código de Actividad Económica */}
      <Select
        label="Actividad Económica"
        options={ACTIVIDADES_ECONOMICAS.map(act => ({
          value: act.codigo,
          label: `${act.codigo} - ${act.nombre}`,
        }))}
        error={errors.codActividad?.message}
        required
        {...register('codActividad')}
      />

      {/* Dirección */}
      <div className="space-y-4 border-t pt-4">
        <h4 className="font-medium text-gray-900">Dirección</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Departamento"
            options={DEPARTAMENTOS.map(d => ({
              value: d.codigo,
              label: d.nombre,
            }))}
            error={errors.direccion?.departamento?.message}
            required
            {...register('direccion.departamento', {
              onChange: e => handleDepartamentoChange(e.target.value),
            })}
          />

          <Select
            label="Municipio"
            options={municipiosOptions}
            error={errors.direccion?.municipio?.message}
            disabled={!selectedDepartamento && !departamentoValue}
            required
            {...register('direccion.municipio')}
          />
        </div>

        <Input
          label="Dirección Completa"
          placeholder="Calle Principal, Edificio #123, Oficina 4"
          error={errors.direccion?.complemento?.message}
          required
          {...register('direccion.complemento')}
        />
      </div>

      {/* Correo */}
      <Input
        label="Correo Electrónico"
        type="email"
        placeholder="empresa@correo.com"
        error={errors.correo?.message}
        required
        {...register('correo')}
      />

      <Button type="submit" fullWidth size="lg" disabled={loading}>
        {loading ? 'Generando factura...' : 'Generar Factura CCF'}
      </Button>
    </form>
  );
};

export default CCFForm;
