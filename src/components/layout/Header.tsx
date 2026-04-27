import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, FileText, Menu, X } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo + Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">EC</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                E-Commerce SV
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Productos
              </Link>
              <Link
                to="/history"
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-1"
              >
                <FileText size={18} />
                <span>Historial</span>
              </Link>
            </nav>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-2">
            {/* Cart Icon */}
            <Link
              to="/checkout"
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              onClick={closeMenu}
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={closeMenu}
              >
                Productos
              </Link>
              <Link
                to="/history"
                className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2 py-2"
                onClick={closeMenu}
              >
                <FileText size={18} />
                <span>Historial</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
