import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import { PortfolioItem } from '../types';
import { Plus, Edit, Trash2, Save, X, Upload, ExternalLink, Star } from 'lucide-react';

const AdminPortfolio = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'schilderwerk' as 'schilderwerk' | 'tuinieren' | 'ramen-wassen' | 'overig',
    altText: '',
    featured: false,
    imageUrl: '',
    isCloudinary: false,
    cloudinaryPublicId: '',
  });

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const q = query(collection(db, 'portfolio'), orderBy('createdDate', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdDate: doc.data().createdDate?.toDate() || new Date()
      })) as PortfolioItem[];
      setPortfolioItems(items);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `portfolio/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setFormData(prev => ({
        ...prev,
        imageUrl: downloadURL,
        isCloudinary: false,
        cloudinaryPublicId: '',
      }));
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Fout bij uploaden van bestand');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.imageUrl) {
      alert('Voeg een afbeelding toe');
      return;
    }

    try {
      const portfolioData = {
        ...formData,
        createdDate: editingItem ? editingItem.createdDate : serverTimestamp(),
        updatedDate: serverTimestamp(),
      };

      if (editingItem) {
        await updateDoc(doc(db, 'portfolio', editingItem.id), portfolioData);
      } else {
        await addDoc(collection(db, 'portfolio'), portfolioData);
      }

      resetForm();
      fetchPortfolioItems();
    } catch (error) {
      console.error('Error saving portfolio item:', error);
      alert('Fout bij opslaan');
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      altText: item.altText,
      featured: item.featured,
      imageUrl: item.imageUrl,
      isCloudinary: item.isCloudinary,
      cloudinaryPublicId: item.cloudinaryPublicId || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (item: PortfolioItem) => {
    if (!confirm('Ben je zeker dat je dit portfolio item wilt verwijderen?')) {
      return;
    }

    try {
      // Delete from Firestore
      await deleteDoc(doc(db, 'portfolio', item.id));

      // Delete image from Firebase Storage if it's not a Cloudinary image
      if (!item.isCloudinary && item.imageUrl.includes('firebase')) {
        try {
          const imageRef = ref(storage, item.imageUrl);
          await deleteObject(imageRef);
        } catch (error) {
          console.error('Error deleting image:', error);
        }
      }

      fetchPortfolioItems();
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      alert('Fout bij verwijderen');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'schilderwerk',
      altText: '',
      featured: false,
      imageUrl: '',
      isCloudinary: false,
      cloudinaryPublicId: '',
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'schilderwerk': return 'bg-amber-100 text-amber-800';
      case 'tuinieren': return 'bg-green-100 text-green-800';
      case 'ramen-wassen': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
        <span className="ml-3 text-gray-600">Portfolio laden...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Portfolio Beheer</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Nieuw Project</span>
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingItem ? 'Project Bewerken' : 'Nieuw Project Toevoegen'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Afbeelding
                  </label>
                  
                  {/* Current Image Preview */}
                  {formData.imageUrl && (
                    <div className="mb-4">
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                    </div>
                  )}

                  {/* Upload Options */}
                  <div className="space-y-4">
                    {/* File Upload */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Upload bestand:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                        disabled={uploading}
                      />
                      {uploading && (
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600 mr-2"></div>
                          Uploaden...
                        </div>
                      )}
                    </div>

                    {/* Cloudinary URL */}
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">
                        Of Cloudinary URL:
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="url"
                          value={formData.isCloudinary ? formData.imageUrl : ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            imageUrl: e.target.value,
                            isCloudinary: true,
                          }))}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                          placeholder="https://res.cloudinary.com/..."
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (formData.imageUrl) {
                              window.open(formData.imageUrl, '_blank');
                            }
                          }}
                          className="px-3 py-2 text-gray-600 hover:text-gray-800"
                          disabled={!formData.imageUrl}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titel *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      placeholder="Project titel"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categorie *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    >
                      <option value="schilderwerk">Schilderwerk</option>
                      <option value="tuinieren">Tuinieren</option>
                      <option value="ramen-wassen">Ramen Wassen</option>
                      <option value="overig">Overig</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beschrijving
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Beschrijving van het project"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt tekst *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.altText}
                    onChange={(e) => setFormData(prev => ({ ...prev, altText: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Beschrijving voor toegankelijkheid"
                  />
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="featured" className="flex items-center text-sm font-medium text-gray-700">
                    <Star className="w-4 h-4 mr-1" />
                    Uitgelicht project
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    disabled={uploading || !formData.imageUrl}
                    className="bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingItem ? 'Bijwerken' : 'Opslaan'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <div key={item.id} className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.altText}
                className="w-full h-48 object-cover"
              />
              {item.featured && (
                <div className="absolute top-2 left-2">
                  <span className="bg-amber-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Uitgelicht
                  </span>
                </div>
              )}
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-full transition-all"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="bg-white bg-opacity-90 hover:bg-opacity-100 text-red-600 p-2 rounded-full transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('-', ' ')}
                </span>
                {item.isCloudinary && (
                  <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    Cloudinary
                  </span>
                )}
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {item.title}
              </h3>
              
              {item.description && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {item.description}
                </p>
              )}
              
              <p className="text-xs text-gray-500">
                {new Intl.DateTimeFormat('nl-NL').format(item.createdDate)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {portfolioItems.length === 0 && (
        <div className="text-center py-12">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nog geen portfolio items
          </h3>
          <p className="text-gray-600 mb-4">
            Voeg uw eerste project toe om te beginnen.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Eerste Project Toevoegen
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;