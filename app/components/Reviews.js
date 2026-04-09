'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function Reviews({ bookId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews/${bookId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error('Failed to fetch reviews', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      window.location.href = '/login';
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId, rating, reviewText }),
      });

      if (res.ok) {
        setRating(5);
        setReviewText('');
        fetchReviews(); // Refresh list to show new review
        // In a real app we might also want to trigger a refresh of the book details to update average rating
        window.location.reload(); 
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to submit review');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 border-b border-border-color pb-2">Community Reviews</h2>

      {/* Review Form */}
      {user ? (
        <div className="glass-panel p-6 mb-8">
          <h3 className="font-semibold mb-4 text-primary">Write a Review</h3>
          
          {error && <div className="text-red-400 mb-4 text-sm bg-red-900/20 p-3 rounded">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm text-text-muted mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-2xl transition-colors ${rating >= star ? 'text-yellow-500' : 'text-gray-600'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="reviewText" className="block text-sm text-text-muted mb-2">Your Review (Optional)</label>
              <textarea
                id="reviewText"
                className="form-textarea w-full"
                rows="4"
                placeholder="What did you think of this book?"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn-primary"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      ) : (
        <div className="glass-panel p-6 mb-8 text-center bg-[rgba(140,82,255,0.05)]">
          <p className="text-text-muted mb-3">Please log in to write a review.</p>
          <a href="/login" className="btn-secondary">Log In</a>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-8 text-text-muted">No reviews yet. Be the first to review this book!</div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="glass-panel p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={review.user_id?.avatarUrl || '/default-avatar.png'} 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full object-cover border border-border-color"
                  />
                  <div>
                    <div className="font-semibold">{review.user_id?.username || 'GUEST USER'}</div>
                    <div className="text-xs text-text-muted">{new Date(review.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-600'}>★</span>
                  ))}
                </div>
              </div>
              {review.reviewText && (
                <p className="text-text-main whitespace-pre-line">{review.reviewText}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
