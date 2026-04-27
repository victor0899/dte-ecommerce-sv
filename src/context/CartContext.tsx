import { createContext, useReducer, useEffect, type ReactNode } from 'react';
import type { CartItem, Product } from '@/@types';
import { saveCart, loadCart } from '@/services/localStorage.service';

// ============= TYPES =============

interface CartState {
  items: CartItem[];
  subtotal: number;
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string } // productId
  | {
      type: 'UPDATE_QUANTITY';
      payload: { productId: string; quantity: number };
    }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  itemCount: number;
}

// ============= CONTEXT =============

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// ============= HELPERS =============

const calculateTotals = (
  items: CartItem[]
): { subtotal: number; total: number } => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return {
    subtotal: Number(subtotal.toFixed(2)),
    total: Number(subtotal.toFixed(2)),
  };
};

// ============= REDUCER =============

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.id
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Incrementar cantidad si ya existe
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Agregar nuevo item
        newItems = [...state.items, { product: action.payload, quantity: 1 }];
      }

      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        item => item.product.id !== action.payload
      );
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        // Si cantidad es 0 o negativa, eliminar el item
        const newItems = state.items.filter(
          item => item.product.id !== productId
        );
        const totals = calculateTotals(newItems);
        return { items: newItems, ...totals };
      }

      const newItems = state.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      const totals = calculateTotals(newItems);
      return { items: newItems, ...totals };
    }

    case 'CLEAR_CART': {
      return { items: [], subtotal: 0, total: 0 };
    }

    case 'LOAD_CART': {
      const totals = calculateTotals(action.payload);
      return { items: action.payload, ...totals };
    }

    default:
      return state;
  }
};

// ============= PROVIDER =============

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const initialState: CartState = {
    items: [],
    subtotal: 0,
    total: 0,
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Cargar carrito del localStorage al montar
  useEffect(() => {
    const savedCart = loadCart();
    if (savedCart.length > 0) {
      dispatch({ type: 'LOAD_CART', payload: savedCart });
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    saveCart(state.items);
  }, [state.items]);

  // ============= ACTIONS =============

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemQuantity = (productId: string): number => {
    const item = state.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // ============= CONTEXT VALUE =============

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getItemQuantity,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
