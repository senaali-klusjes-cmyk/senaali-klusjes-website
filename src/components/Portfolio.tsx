import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, serverTimestamp, query, orderBy, where, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import { Plus, Trash2, Upload, Image, FolderPlus, Folder, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PortfolioItem {
  id: string;
  imageUrl: string;
  albumName: string;
  uploadDate: Date;
  cloudinaryPublicId?: string;
}

interface Album {
  id: string;
  name: string;
  category: string;
  createdDate: Date;
  photoCount: number;
}

const Portfolio = () => {
  const { user } = useAuth();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [showNewAlbumForm, setShowNewAlbumForm] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState('');
  const [newAlbumCategory, setNewAlbumCategory] = useState('schilderwerk');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [deleteConfirmAlbum, setDeleteConfirmAlbum] = useState<string | null>(null);
  const [deleteConfirmPhoto, setDeleteConfirmPhoto] = useState<string | null>(null);

  useEffect(() => {
    console.log('Portfolio component mounted');
    fetchAlbums();
  }, []);

  useEffect(() => {
    if (selectedAlbum) {
      console.log('Fetching photos for album:', selectedAlbum);
      fetchPhotosForAlbum(selectedAlbum);
    }
  }, [selectedAlbum]);

  const fetchAlbums = async () => {
    console.log('Fetching albums...');
    try {
      setLoading(true);
      
      // Fetch albums
      const albumsRef = collection(db, 'albums');
      const querySnapshot = await getDocs(albumsRef);
      console.log('Albums query result:', querySnapshot.size, 'documents');
      
      // Also fetch all portfolio items to count photos per album
      const portfolioRef = collection(db, 'portfolio');
      const portfolioSnapshot = await getDocs(portfolioRef);
      const allPhotos = portfolioSnapshot.docs.map(doc => doc.data());
      
      const albumsData = await Promise.all(querySnapshot.docs.map(async doc => {
        const data = doc.data();
        const albumName = data.name || 'Unnamed Album';
        
        // Count photos for this album
        const photoCount = allPhotos.filter(photo => photo.albumName === albumName).length;
        
        return {
          id: doc.id,
          name: albumName,
          category: data.category || 'allerlei-klusjes',
          createdDate: data.createdDate?.toDate() || new Date(),
          photoCount: photoCount
        };
      }));
      
      // Sort in JavaScript instead of Firestore
      albumsData.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime());
      
      console.log('Processed albums:', albumsData);
      setAlbums(albumsData);
    } catch (error) {
      console.error('Error fetching albums:', error);
      console.error('Error details:', error.code, error.message);
      
      // Show user-friendly error message
      if (error.code === 'permission-denied') {
        console.log('Permission denied - check Firestore rules');
        alert('Geen toegang tot database. Controleer Firestore regels.');
      }
      
      setAlbums([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPhotosForAlbum = async (albumName: string) => {
    console.log('Fetching photos for album:', albumName);
    try {
      setLoading(true);
      
      const portfolioRef = collection(db, 'portfolio');
      const querySnapshot = await getDocs(portfolioRef);
      console.log('Portfolio query result:', querySnapshot.size, 'documents');
      
      // Filter in JavaScript
      const photosData = querySnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            imageUrl: data.imageUrl,
            albumName: data.albumName,
            uploadDate: data.uploadDate?.toDate() || new Date(),
            cloudinaryPublicId: data.cloudinaryPublicId
          };
        })
        .filter(photo => photo.albumName === albumName)
        .sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime()) as PortfolioItem[];
      
      console.log('Filtered photos:', photosData);
      setPortfolioItems(photosData);
    } catch (error) {
      console.error('Error fetching photos:', error);
      console.error('Error details:', error.code, error.message);
      
      if (error.code === 'permission-denied') {
        console.log('Permission denied for portfolio - check Firestore rules');
        alert('Geen toegang tot foto database. Controleer Firestore regels.');
      }
      
      setPortfolioItems([]);
    } finally {
      setLoading(false);
    }
  };

  const createAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumName.trim()) return;

    console.log('Creating album:', newAlbumName);
    try {
      const docRef = await addDoc(collection(db, 'albums'), {
        name: newAlbumName.trim(),
        category: newAlbumCategory,
        createdDate: serverTimestamp(),
        photoCount: 0
      });
      
      console.log('Album created with ID:', docRef.id);
      setNewAlbumName('');
      setNewAlbumCategory('schilderwerk');
      setShowNewAlbumForm(false);
      fetchAlbums();
    } catch (error) {
      console.error('Error creating album:', error);
      alert('Fout bij aanmaken album: ' + error.message);
    }
  };

  const uploadToCloudinary = async (files: FileList, albumName: string) => {
    if (!files || files.length === 0 || !albumName) return;

    console.log('Starting upload for', files.length, 'files to album:', albumName);

    // Check all files first
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert(`Bestand ${file.name} is te groot. Maximaal 10MB toegestaan.`);
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert(`${file.name} is geen afbeelding. Alleen afbeeldingen zijn toegestaan.`);
        return;
      }
    }

    setUploading(true);
    setUploadProgress(0);
    
    try {
      const totalFiles = files.length;
      let completedFiles = 0;
      
      console.log('Uploading', totalFiles, 'files to Cloudinary...');
      
      // Upload each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`Uploading file ${i + 1}/${totalFiles}: ${file.name}`);
        
        // Update progress for current file
        const baseProgress = (completedFiles / totalFiles) * 100;
        const fileProgress = (1 / totalFiles) * 100;
        
        setUploadProgress(baseProgress + (fileProgress * 0.1)); // 10% for start
        
        // Create FormData for Cloudinary upload
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'senaali_portfolio');
        formData.append('folder', `senaali-klusjes/portfolio/${albumName}`);
        
        setUploadProgress(baseProgress + (fileProgress * 0.3)); // 30% for prep
        
        // Upload to Cloudinary
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/ddgsjjbjv/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        
        setUploadProgress(baseProgress + (fileProgress * 0.6)); // 60% for upload
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Cloudinary error:', errorText);
          throw new Error(`Upload failed for ${file.name}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Cloudinary upload success for', file.name, ':', data);
        
        setUploadProgress(baseProgress + (fileProgress * 0.8)); // 80% for cloudinary done
        
        // Save to Firebase
        const docRef = await addDoc(collection(db, 'portfolio'), {
          imageUrl: data.secure_url,
          albumName: albumName,
          cloudinaryPublicId: data.public_id,
          uploadDate: serverTimestamp(),
        });
        
        console.log('Saved to Firebase with ID:', docRef.id);
        
        completedFiles++;
        setUploadProgress((completedFiles / totalFiles) * 100);
      }
      
      console.log('All files uploaded successfully!');
      
      // Refresh the photos for current album
      fetchPhotosForAlbum(albumName);
      
      // Refresh albums to update photo count
      fetchAlbums();
      
    } catch (error) {
      console.error('Error uploading:', error);
      // Show error in progress bar area instead of alert
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: PortfolioItem) => {
    if (deleteConfirmPhoto === item.id) {
      try {
        console.log('Deleting photo:', item.id);
        await deleteDoc(doc(db, 'portfolio', item.id));
        
        // Refresh current album
        if (selectedAlbum) {
          fetchPhotosForAlbum(selectedAlbum);
          fetchAlbums(); // Refresh albums to update photo count
        }
        setDeleteConfirmPhoto(null);
      } catch (error) {
        console.error('Error deleting photo:', error);
      }
    } else {
      setDeleteConfirmPhoto(item.id);
    }
  };

  const handleDeleteAlbum = async (albumId: string, albumName: string) => {
    if (deleteConfirmAlbum === albumId) {
      try {
        console.log('Deleting album:', albumName);
        
        // First delete all photos in this album
        const photosSnapshot = await getDocs(collection(db, 'portfolio'));
        const photosToDelete = photosSnapshot.docs.filter(doc => 
          doc.data().albumName === albumName
        );
        
        console.log('Deleting', photosToDelete.length, 'photos');
        
        // Delete all photos
        const deletePromises = photosToDelete.map(photoDoc => 
          deleteDoc(doc(db, 'portfolio', photoDoc.id))
        );
        await Promise.all(deletePromises);
        
        // Then delete the album
        await deleteDoc(doc(db, 'albums', albumId));
        
        console.log('Album and photos deleted');
        
        // Refresh albums list
        fetchAlbums();
        setDeleteConfirmAlbum(null);
      } catch (error) {
        console.error('Error deleting album:', error);
      }
    } else {
      setDeleteConfirmAlbum(albumId);
    }
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === portfolioItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? portfolioItems.length - 1 : prev - 1
    );
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!lightboxOpen) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'schilderwerk': return 'bg-amber-100 text-amber-800';
      case 'tuinieren': return 'bg-green-100 text-green-800';
      case 'ramen-wassen': return 'bg-blue-100 text-blue-800';
      case 'allerlei-klusjes': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'schilderwerk': return 'Schilderwerk';
      case 'tuinieren': return 'Tuinieren';
      case 'ramen-wassen': return 'Ramen Wassen';
      case 'allerlei-klusjes': return 'Allerlei Klusjes';
      default: return category;
    }
  };

  // Album view
  if (!selectedAlbum) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-4">
              Foto <span className="text-amber-600">Albums</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Bekijk onze afgeronde projecten georganiseerd per album.
            </p>
          </div>

          {/* New Album Button - Only for Admin */}
          {user && (
            <div className="mb-8 text-center">
              {!showNewAlbumForm ? (
                <button
                  onClick={() => setShowNewAlbumForm(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 mx-auto transition-colors"
                >
                  <FolderPlus className="w-5 h-5" />
                  <span>Nieuw Album</span>
                </button>
              ) : (
                <form onSubmit={createAlbum} className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md mx-auto">
                  <h3 className="text-xl font-bold text-white mb-4">Nieuw Album Aanmaken</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Album naam
                      </label>
                      <input
                        type="text"
                        value={newAlbumName}
                        onChange={(e) => setNewAlbumName(e.target.value)}
                        placeholder="Bijv. Huis van de Jansen"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Categorie
                      </label>
                      <select
                        value={newAlbumCategory}
                        onChange={(e) => setNewAlbumCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      >
                        <option value="schilderwerk">🎨 Schilderwerk</option>
                        <option value="tuinieren">🌱 Tuinieren</option>
                        <option value="ramen-wassen">💧 Ramen Wassen</option>
                        <option value="allerlei-klusjes">🔧 Allerlei Klusjes</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewAlbumForm(false);
                        setNewAlbumName('');
                        setNewAlbumCategory('schilderwerk');
                      }}
                      className="flex-1 px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors mt-4"
                    >
                      Annuleren
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors mt-4"
                    >
                      Aanmaken
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Albums Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
              <p className="text-gray-300">Albums laden...</p>
            </div>
          ) : albums.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
                <Folder className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Nog geen albums
                </h3>
                <p className="text-gray-300">
                  {user ? 'Maak je eerste album aan om te beginnen.' : 'Er zijn nog geen albums toegevoegd.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-amber-600 transition-all duration-300 hover:shadow-xl group relative"
                >
                  {/* Admin Delete Button */}
                  {user && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {deleteConfirmAlbum === album.id ? (
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAlbum(album.id, album.name);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Verwijderen
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteConfirmAlbum(null);
                            }}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Annuleren
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteConfirmAlbum(album.id);
                          }}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                          title="Album verwijderen"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                  
                  <div 
                    className="text-center cursor-pointer"
                    onClick={() => setSelectedAlbum(album.name)}
                  >
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                      <Folder className="w-8 h-8 text-amber-600" />
                    </div>
                    
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(album.category)}`}>
                        {getCategoryLabel(album.category)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {album.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {album.photoCount} {album.photoCount === 1 ? 'foto' : 'foto\'s'}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      {new Intl.DateTimeFormat('nl-NL').format(album.createdDate)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Photos view for selected album
  return (
    <div className="min-h-screen bg-gray-900 pt-20">

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Previous Button */}
          {portfolioItems.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {/* Next Button */}
          {portfolioItems.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image */}
          <div className="max-w-4xl max-h-full p-4">
            <img
              src={portfolioItems[currentImageIndex]?.imageUrl}
              alt="Portfolio foto"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-4 py-2 rounded-lg">
            {currentImageIndex + 1} / {portfolioItems.length}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedAlbum(null)}
              className="text-amber-600 hover:text-amber-700 flex items-center space-x-2 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Terug naar Albums</span>
            </button>
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Album: <span className="text-amber-600">{selectedAlbum}</span>
          </h1>
          <p className="text-xl text-gray-300">
            {portfolioItems.length} foto's in dit album
          </p>
        </div>

        {/* Upload Section - Only for Admin */}
        {user && (
          <div className="mb-8 text-center">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">Foto Toevoegen</h3>
              
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0 && selectedAlbum) {
                    uploadToCloudinary(files, selectedAlbum);
                  }
                }}
                className="hidden"
                id="file-upload"
                disabled={uploading}
              />
              
              <label
                htmlFor="file-upload"
                className={`cursor-pointer flex flex-col items-center space-y-4 p-6 border-2 border-dashed border-gray-600 rounded-lg hover:border-amber-500 transition-colors ${
                  uploading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <Image className="w-8 h-8 text-amber-600" />
                </div>
                <div className="text-center">
                  <span className="text-amber-400 font-medium">
                    {uploading ? 'Uploaden...' : 'Klik om foto\'s te uploaden'}
                  </span>
                  <p className="text-sm text-gray-400 mt-1">
                    PNG, JPG, GIF tot 10MB (meerdere bestanden mogelijk)
                  </p>
                </div>
              </label>
              
              {uploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>Foto's uploaden...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-amber-600 h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  {uploadProgress === 100 && (
                    <div className="flex items-center justify-center mt-2 text-sm text-green-400">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      Foto's succesvol toegevoegd!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Photos Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-gray-300">Foto's laden...</p>
          </div>
        ) : portfolioItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
              <Upload className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Nog geen foto's
              </h3>
              <p className="text-gray-300">
                {user ? 'Upload je eerste foto om te beginnen.' : 'Er zijn nog geen foto\'s in dit album.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className="group relative bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-amber-600 transition-all duration-300 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt="Portfolio foto"
                    className="w-full h-full object-contain bg-gray-900 transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                    loading="lazy"
                    onClick={() => openLightbox(index)}
                  />
                  
                  {/* Admin Delete Button */}
                  {user && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {deleteConfirmPhoto === item.id ? (
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => handleDelete(item)}
                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Verwijderen
                          </button>
                          <button
                            onClick={() => setDeleteConfirmPhoto(null)}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                          >
                            Annuleren
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmPhoto(item.id)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Date */}
                <div className="p-3">
                  <p className="text-xs text-gray-400 text-center">
                    {new Intl.DateTimeFormat('nl-NL').format(item.uploadDate)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;