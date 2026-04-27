import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fcfSchema, type FCFFormData } from '@/lib/validations/fcf.schema';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';

interface FCFFormProps {
  onSubmit: (data: FCFFormData) => void;
  loading?: boolean;
}

const FCFForm = ({ onSubmit, loading = false }: FCFFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FCFFormData>({
    resolver: zodResolver(fcfSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Factura de Consumidor Final (FCF)
        </h3>
        <p className="text-sm text-blue-700">
          Los precios ya incluyen IVA (13%). Complete los datos del cliente.
        </p>
      </div>

      <Input
        label="Nombre Completo"
        placeholder="Juan Pérez"
        error={errors.nombre?.message}
        required
        {...register('nombre')}
      />

      <Input
        label="DUI o NIT"
        placeholder="12345678-9 o 1234-567890-123-4"
        helperText="Opcional. Use formato: DUI (########-#) o NIT (####-######-###-#)"
        error={errors.documento?.message}
        {...register('documento')}
      />

      <Input
        label="Correo Electrónico"
        type="email"
        placeholder="cliente@correo.com"
        error={errors.correo?.message}
        required
        {...register('correo')}
      />

      <Button type="submit" fullWidth size="lg" disabled={loading}>
        {loading ? 'Generando factura...' : 'Generar Factura FCF'}
      </Button>
    </form>
  );
};

export default FCFForm;
