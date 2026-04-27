import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import CheckoutPage from '@/pages/CheckoutPage';
import InvoiceHistoryPage from '@/pages/InvoiceHistoryPage';
import InvoiceDetailPage from '@/pages/InvoiceDetailPage';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/history" element={<InvoiceHistoryPage />} />
            <Route path="/invoice/:id" element={<InvoiceDetailPage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
