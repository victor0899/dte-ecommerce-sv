import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import type { Product } from '@/@types';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/dteHelpers';
import Button from '@/components/common/Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem, getItemQuantity, updateQuantity, removeItem } = useCart();
  const quantity = getItemQuantity(product.id);
  const inCart = quantity > 0;

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleIncrement = () => {
    if (quantity < product.stock) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
            Solo {product.stock} disponibles
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            Agotado
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Code */}
        {product.codigo && (
          <p className="text-xs text-gray-500 mb-1">{product.codigo}</p>
        )}

        {/* Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-blue-600">
            {formatCurrency(product.price)}
          </p>
          <p className="text-xs text-gray-500">IVA incluido</p>
        </div>

        {/* Cart Controls */}
        {inCart ? (
          <div className="space-y-2">
            {/* Quantity Controls */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
              <button
                onClick={handleDecrement}
                className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:bg-gray-100 transition-colors text-gray-700"
                aria-label="Disminuir cantidad"
              >
                <Minus size={16} />
              </button>

              <span className="text-lg font-semibold text-gray-900 min-w-[3rem] text-center">
                {quantity}
              </span>

              <button
                onClick={handleIncrement}
                disabled={quantity >= product.stock}
                className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 transition-colors text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
                aria-label="Aumentar cantidad"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="w-full flex items-center justify-center space-x-2 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
              <span className="text-sm font-medium">Quitar del carrito</span>
            </button>
          </div>
        ) : (
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            fullWidth
            variant="primary"
          >
            <ShoppingCart size={18} className="mr-2" />
            Agregar al carrito
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
