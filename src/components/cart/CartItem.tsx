import { Minus, Plus, Trash2 } from 'lucide-react';
import type { CartItem as CartItemType } from '@/@types';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/dteHelpers';

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  const subtotal = product.price * quantity;

  return (
    <div className="flex gap-4 py-4 border-b last:border-b-0">
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {formatCurrency(product.price)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDecrement}
            disabled={quantity <= 1}
            className="p-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus size={16} />
          </button>

          <span className="w-8 text-center text-sm font-medium">
            {quantity}
          </span>

          <button
            onClick={handleIncrement}
            disabled={quantity >= product.stock}
            className="p-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
          </button>

          <button
            onClick={handleRemove}
            className="ml-auto p-1 text-red-600 hover:text-red-700"
            title="Eliminar"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Subtotal */}
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold text-gray-900">
          {formatCurrency(subtotal)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
