import Cart from '@/components/cart/Cart';
import CheckoutForm from '@/components/checkout/CheckoutForm';

const CheckoutPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Finalizar Compra
        </h1>
        <p className="text-gray-600">
          Revisa tu pedido y completa los datos de facturación
        </p>
      </div>

      <Cart />

      <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
