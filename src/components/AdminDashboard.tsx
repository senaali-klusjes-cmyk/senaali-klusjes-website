import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LogOut, User, Mail, Image } from 'lucide-react';
import AdminQuotes from './AdminQuotes';
import AdminPortfolio from './AdminPortfolio';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<'quotes' | 'portfolio'>('quotes');

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Admin Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 px-8 py-12 text-center">
            <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-amber-100">Welkom terug, {user?.email}</p>
          </div>

          {/* Content */}
          <div className="px-8 py-12 text-center">
            {/* Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-lg p-1 flex">
                <button
                  onClick={() => setActiveTab('quotes')}
                  className={`px-6 py-3 rounded-md font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === 'quotes'
                      ? 'bg-white text-amber-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Offertes</span>
                </button>
                <button
                  onClick={() => setActiveTab('portfolio')}
                  className={`px-6 py-3 rounded-md font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === 'portfolio'
                      ? 'bg-white text-amber-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Image className="w-4 h-4" />
                  <span>Portfolio</span>
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center space-x-3 mx-auto"
            >
              <LogOut className="w-6 h-6" />
              <span>Uitloggen</span>
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {activeTab === 'quotes' && <AdminQuotes />}
            {activeTab === 'portfolio' && <AdminPortfolio />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;