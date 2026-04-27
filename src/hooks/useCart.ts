import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

/**
 * Hook para acceder al contexto del carrito
 * @throws Error si se usa fuera del CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }

  return context;
};
