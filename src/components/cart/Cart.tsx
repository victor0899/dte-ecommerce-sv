import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const Cart = () => {
  const { state, itemCount } = useCart();

  if (itemCount === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-medium text-gray-900 mb-2">
          Tu carrito está vacío
        </h3>
        <p className="text-gray-500">Agrega productos para empezar tu compra</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Carrito de Compras
        </h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          {state.items.map(item => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="lg:col-span-1">
        <CartSummary />
      </div>
    </div>
  );
};

export default Cart;
