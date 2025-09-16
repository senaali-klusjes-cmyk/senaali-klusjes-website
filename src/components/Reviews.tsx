import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Review } from '../types';
import { Star, Calendar, User } from 'lucide-react';

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, 'reviews'), orderBy('date', 'desc'));
        const querySnapshot = await getDocs(q);
        const reviewsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate() || new Date()
        })) as Review[];
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('nl-NL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Reviews laden...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Wat onze <span className="text-amber-600">klanten</span> zeggen
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Lees de ervaringen van onze tevreden klanten en ontdek waarom zij 
            voor Senaali Klusjes hebben gekozen.
          </p>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md mx-auto">
              <User className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Nog geen reviews
              </h3>
              <p className="text-gray-300">
                Wees de eerste om een review achter te laten!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-800 border border-gray-700 hover:border-amber-600 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-white">
                      {review.clientName}
                    </h3>
                    <p className="text-sm text-amber-600 font-medium">
                      {review.service}
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    {renderStars(review.rating)}
                  </div>
                </div>

                {/* Review Image */}
                {review.imageUrl && (
                  <div className="mb-4">
                    <img
                      src={review.imageUrl}
                      alt="Project foto"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Comment */}
                <blockquote className="text-gray-300 leading-relaxed mb-4">
                  "{review.comment}"
                </blockquote>

                {/* Date */}
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(review.date)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ook zo'n positieve ervaring?
            </h3>
            <p className="text-gray-300 mb-6">
              Neem contact met ons op en ervaar zelf de kwaliteit van Senaali Klusjes.
            </p>
            <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
              Start Uw Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;