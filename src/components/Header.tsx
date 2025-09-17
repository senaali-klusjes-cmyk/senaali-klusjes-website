import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Diensten', href: '/diensten' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Over Ons', href: '/over-ons' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gray-800 shadow-lg relative z-50">
      {/* Top bar */}
      <div className="bg-amber-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>+32493071002</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail size={16} />
              <span>senaalikemaldar@gmail.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            {user ? (
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Admin ingelogd</span>
              </span>
            ) : (
              <span>Gratis een snelle offerte!</span>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/Senaali-Klussen-Logo-NoBackground-Web copy.png"
              alt="Senaali Klusjes"
              className="h-16 w-auto mr-3 filter-none"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">Senaali Klusjes</h1>
              <p className="text-sm text-gray-300">Professionele klussen voor uw huis</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-amber-400 bg-amber-900'
                    : 'text-gray-300 hover:text-amber-400 hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/admin')
                    ? 'text-amber-400 bg-amber-900'
                    : 'text-gray-300 hover:text-amber-400 hover:bg-gray-700'
                }`}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2 text-green-400 text-sm">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Admin</span>
              </div>
            )}
            <Link
              to="/offerte"
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Gratis Offerte
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-amber-400 hover:bg-gray-700"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gray-800 shadow-lg border-t border-gray-700">
          <nav className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-amber-400 bg-amber-900'
                    : 'text-gray-300 hover:text-amber-400 hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/admin')
                    ? 'text-amber-400 bg-amber-900'
                    : 'text-gray-300 hover:text-amber-400 hover:bg-gray-700'
                }`}
              >
                Admin Dashboard
              </Link>
            )}
            {user && (
              <button
                onClick={async () => {
                  await logout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-red-400 hover:bg-gray-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Uitloggen</span>
              </button>
            )}
            {user && (
              <div className="flex items-center space-x-2 text-green-400 px-3 py-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Admin ingelogd</span>
              </div>
            )}
            <Link
              to="/offerte"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold mt-4"
            >
              Gratis Offerte
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;