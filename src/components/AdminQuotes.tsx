import React, { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { QuoteRequest } from '../types';
import { Mail, Phone, Calendar, User, Trash2, CheckCircle, Clock, MessageSquare } from 'lucide-react';

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'contacted' | 'completed'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filteredQuotes = filter === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'contacted':
        return <MessageSquare className="w-3 h-3" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Nieuw';
      case 'contacted':
        return 'Gecontacteerd';
      case 'completed':
        return 'Afgerond';
      default:
        return 'Onbekend';
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const q = query(collection(db, 'quotes'), orderBy('submittedDate', 'desc'));
      const querySnapshot = await getDocs(q);
      const quotesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        submittedDate: doc.data().submittedDate?.toDate() || new Date()
      })) as QuoteRequest[];
      setQuotes(quotesData);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (quoteId: string, newStatus: 'pending' | 'contacted' | 'completed') => {
    try {
      await updateDoc(doc(db, 'quotes', quoteId), {
        status: newStatus
      });
      fetchQuotes(); // Refresh the list
    } catch (error) {
      console.error('Error updating quote status:', error);
    }
  };

  const deleteQuote = async (quoteId: string) => {
    if (deleteConfirm === quoteId) {
      try {
        await deleteDoc(doc(db, 'quotes', quoteId));
        fetchQuotes();
        setDeleteConfirm(null);
      } catch (error) {
        console.error('Error deleting quote:', error);
        alert('Er ging iets mis bij het verwijderen. Probeer opnieuw.');
      }
    } else {
      setDeleteConfirm(quoteId);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Offerte Aanvragen</h2>
          <p className="text-gray-600">{quotes.length} totaal aanvragen</p>
        </div>
        
        {/* Filter */}
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'Alle', count: quotes.length },
            { key: 'pending', label: 'Nieuw', count: quotes.filter(q => q.status === 'pending').length },
            { key: 'contacted', label: 'Gecontacteerd', count: quotes.filter(q => q.status === 'contacted').length },
            { key: 'completed', label: 'Afgerond', count: quotes.filter(q => q.status === 'completed').length }
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                filter === key
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Quotes List */}
      {filteredQuotes.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-2xl p-8 max-w-md mx-auto">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'Nog geen offertes' : `Geen ${getStatusLabel(filter).toLowerCase()} offertes`}
            </h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? 'Er zijn nog geen offerte aanvragen binnengekomen.'
                : `Er zijn geen offertes met status "${getStatusLabel(filter).toLowerCase()}".`
              }
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredQuotes.map((quote) => (
            <div
              key={quote.id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {quote.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {quote.service}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(quote.status)}`}>
                      {getStatusIcon(quote.status)}
                      <span>{getStatusLabel(quote.status)}</span>
                    </span>
                    {deleteConfirm === quote.id ? (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => deleteQuote(quote.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                        >
                          Verwijderen
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                        >
                          Annuleren
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(quote.id)}
                        className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                        title="Verwijderen"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <a 
                      href={`mailto:${quote.email}`}
                      className="text-amber-600 hover:text-amber-700 font-medium break-all"
                    >
                      {quote.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <a 
                      href={`tel:${quote.phone}`}
                      className="text-amber-600 hover:text-amber-700 font-medium"
                    >
                      {quote.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Intl.DateTimeFormat('nl-NL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(quote.submittedDate)}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Beschrijving:</h4>
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-3 leading-relaxed">
                    {quote.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => updateQuoteStatus(quote.id, 'contacted')}
                    disabled={quote.status === 'contacted'}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors disabled:cursor-not-allowed"
                  >
                    Gecontacteerd
                  </button>
                  <button
                    onClick={() => updateQuoteStatus(quote.id, 'completed')}
                    disabled={quote.status === 'completed'}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors disabled:cursor-not-allowed"
                  >
                    Afgerond
                  </button>
                  {quote.status !== 'pending' && (
                    <button
                      onClick={() => updateQuoteStatus(quote.id, 'pending')}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors"
                    >
                      Nieuw
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminQuotes;