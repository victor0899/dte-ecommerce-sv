import ProductGrid from '@/components/products/ProductGrid';
import { PRODUCTS } from '@/data/products';

const HomePage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Catálogo de Productos
        </h1>
        <p className="text-gray-600">
          Explora nuestro catálogo y agrega productos a tu carrito
        </p>
      </div>

      <ProductGrid products={PRODUCTS} />
    </div>
  );
};

export default HomePage;
