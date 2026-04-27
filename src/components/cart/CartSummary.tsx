import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/dteHelpers';

const CartSummary = () => {
  const { state, itemCount } = useCart();

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Resumen del Pedido
      </h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            Productos ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="font-medium">{formatCurrency(state.subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">IVA (13%)</span>
          <span className="text-gray-500 italic">Incluido en precios</span>
        </div>

        <div className="border-t pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-lg font-bold text-blue-600">
              {formatCurrency(state.total)}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CartSummary;
