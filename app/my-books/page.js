'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function MyBooks() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Want to Read');
  const [shelvedBooks, setShelvedBooks] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchShelvedBooks = async () => {
      if (!user?.bookshelves?.length) {
        setFetching(false);
        return;
      }

      setFetching(true);
      try {
        // Fetch full book details for all books in the user's shelves
        const bookPromises = user.bookshelves.map(async (shelf) => {
          const res = await fetch(`/api/books/${shelf.book_id}`);
          if (res.ok) {
            const data = await res.json();
            return {
              ...data.book,
              shelf_type: shelf.shelf_type,
              addedAt: shelf.addedAt
            };
          }
          return null;
        });

        const booksData = await Promise.all(bookPromises);
        setShelvedBooks(booksData.filter(b => b !== null));
      } catch (error) {
        console.error('Error fetching shelved books:', error);
      } finally {
        setFetching(false);
      }
    };

    if (user && !loading) {
      fetchShelvedBooks();
    }
  }, [user, loading]);

  if (loading || !user) {
    return <div className="text-center mt-20">Loading your books...</div>;
  }

  const tabs = ['Want to Read', 'Currently Reading', 'Read'];
  
  // Filter books for the currently active tab
  const displayedBooks = shelvedBooks.filter(book => book.shelf_type === activeTab);

  return (
    <div className="max-w-6xl mx-auto py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        My Books
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-8 border-b border-border-color">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 font-semibold text-lg transition-all relative ${
              activeTab === tab ? 'text-white' : 'text-text-muted hover:text-white'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-t-md animate-fade-in"></span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="glass-panel p-6 min-h-[400px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">{activeTab}</h2>
          <span className="bg-[rgba(255,255,255,0.1)] px-3 py-1 rounded-full text-sm">
            {displayedBooks.length} books
          </span>
        </div>

        {fetching ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : displayedBooks.length === 0 ? (
          <div className="text-center py-16 text-text-muted">
            <p className="text-lg mb-4">You have no books on this shelf.</p>
            <Link href="/" className="btn-primary">Browse Catalog</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedBooks.map((book) => (
              <div key={book._id} className="bg-bg-dark rounded-xl border border-border-color overflow-hidden flex flex-col group hover:border-[rgba(255,102,196,0.5)] transition-all">
                <Link href={`/book/${book._id}`} className="block h-48 overflow-hidden relative">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>
                <div className="p-4 flex-1 flex flex-col">
                  <Link href={`/book/${book._id}`} className="font-bold text-lg leading-tight mb-1 hover:text-secondary transition-colors line-clamp-2">
                    {book.title}
                  </Link>
                  <p className="text-sm text-text-muted mb-auto">{book.author}</p>
                  <div className="mt-4 text-xs text-text-muted pt-3 border-t border-border-color">
                    Added on {new Date(book.addedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
