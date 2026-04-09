'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { use } from 'react';
import Reviews from '@/app/components/Reviews';

export default function BookDetails(props) {
  const params = use(props.params);
  const { user, setUser } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setBook(data.book);
        }
      } catch (error) {
        console.error('Failed to fetch book', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBook();
  }, [params.id]);

  const addToShelf = async (shelfType) => {
    if (!user) {
      window.location.href = '/login';
      return;
    }
    
    setStatus('Adding...');
    
    try {
      const res = await fetch('/api/users/shelves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: book._id, shelfType })
      });
      
      if (res.ok) {
        const data = await res.json();
        // Update the global user context so stats are immediate
        setUser(prev => ({ ...prev, bookshelves: data.bookshelves }));
        setStatus(`Added to ${shelfType}`);
        setTimeout(() => setStatus(''), 3000);
      } else {
        const err = await res.json();
        setStatus(err.message || 'Failed to add');
      }
    } catch (error) {
      setStatus('Failed to add');
      console.error(error);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading book details...</div>;
  if (!book) return <div className="text-center mt-20">Book not found</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 animate-fade-in">
      <div className="glass-panel overflow-hidden flex flex-col md:flex-row relative">
        <div className="w-full md:w-1/3 relative h-96 md:h-auto">
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-bg-card hidden md:block"></div>
        </div>
        
        <div className="p-8 md:w-2/3 flex flex-col justify-center relative z-10">
          <Link href="/" className="text-sm text-primary mb-4 hover:underline">&larr; Back to Catalog</Link>
          
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-4xl font-bold">{book.title}</h1>
          </div>
          
          <p className="text-xl text-text-muted mb-4">by {book.author}</p>
          
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            <span className="bg-[rgba(255,102,196,0.1)] text-secondary px-3 py-1 rounded-full border border-[rgba(255,102,196,0.2)]">
              {book.genre}
            </span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-500 text-lg">★</span> 
              {book.averageRating > 0 ? `${book.averageRating.toFixed(1)} (${book.totalReviews} reviews)` : 'No reviews yet'}
            </span>
            <span className="text-text-muted">ISBN: {book.isbn}</span>
            <span className="text-text-muted">Published: {new Date(book.publicationDate).getFullYear()}</span>
          </div>
          
          <div className="prose prose-invert max-w-none mb-8">
            <h3 className="text-xl font-semibold mb-3 text-primary">Abstraction / Introduction</h3>
            <p className="whitespace-pre-line leading-relaxed text-text-muted">{book.description}</p>
          </div>
          
          {(book.authorIntroduction || book.awards) && (
            <div className="grid md:grid-cols-2 gap-6 mb-8 p-6 rounded-xl bg-bg-card border border-border-color">
              {book.authorIntroduction && (
                <div>
                  <h4 className="text-lg font-semibold text-secondary mb-2">About the Author</h4>
                  <p className="text-sm text-text-muted leading-relaxed">{book.authorIntroduction}</p>
                </div>
              )}
              {book.awards && (
                <div>
                  <h4 className="text-lg font-semibold text-yellow-500 mb-2">Awards & Recognition</h4>
                  <div className="flex items-start gap-2">
                    <span className="text-xl">🏆</span>
                    <p className="text-sm text-text-main font-medium leading-relaxed">{book.awards}</p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-auto">
            <h3 className="text-lg font-semibold mb-3">Add to your lists</h3>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => addToShelf('Want to Read')} className="btn-primary flex-1 whitespace-nowrap">
                Want to Read
              </button>
              <button onClick={() => addToShelf('Currently Reading')} className="btn-secondary flex-1 border-primary text-primary hover:bg-primary hover:text-white whitespace-nowrap">
                Currently Reading
              </button>
              <button onClick={() => addToShelf('Read')} className="btn-secondary flex-1 border-secondary text-secondary hover:bg-secondary hover:text-white whitespace-nowrap">
                Read
              </button>
            </div>
            {status && (
              <p className={`mt-3 text-sm font-medium ${status.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>
                {status}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Reviews component */}
      <Reviews bookId={book._id} />
    </div>
  );
}
