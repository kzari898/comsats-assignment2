'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

export default function AdminPanel() {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  const initialFormState = {
    title: '', author: '', isbn: '', genre: '',
    publicationDate: '', description: '', coverImage: '',
    authorIntroduction: '', awards: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Fetch books for management
  const fetchBooks = async () => {
    try {
      const res = await fetch('/api/books?limit=100');
      if (res.ok) {
        const data = await res.json();
        setBooks(data.books);
      }
    } catch (error) {
      console.error('Failed to fetch books', error);
    }
  };

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchBooks();
    }
  }, [user]);

  // Basic admin guard check
  if (!loading && (!user || user.role !== 'admin')) {
    router.push('/');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(editingId ? 'Updating...' : 'Adding...');

    try {
      const url = editingId ? `/api/books/${editingId}` : '/api/books';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus(editingId ? 'Book updated successfully!' : 'Book added successfully!');
        setFormData(initialFormState);
        setEditingId(null);
        fetchBooks(); // Refresh list
      } else {
        const error = await res.json();
        setStatus(`Error: ${error.message}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      genre: book.genre,
      publicationDate: new Date(book.publicationDate).toISOString().split('T')[0],
      description: book.description,
      coverImage: book.coverImage,
      authorIntroduction: book.authorIntroduction || '',
      awards: book.awards || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this book?')) return;
    
    setStatus('Deleting...');
    try {
      const res = await fetch(`/api/books/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setStatus('Book deleted successfully!');
        fetchBooks();
        if (editingId === id) {
          setEditingId(null);
          setFormData(initialFormState);
        }
      } else {
        const error = await res.json();
        setStatus(`Error: ${error.message}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setStatus('Edit cancelled');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {status && (
        <div className={`p-4 rounded mb-6 ${status.includes('Error') ? 'bg-red-900 text-red-100' : 'bg-green-900 text-green-100'}`}>
          {status}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="glass-panel p-6 h-fit sticky top-20">
          <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Book' : 'Add New Book'}</h2>
          
          <form onSubmit={handleSubmit} className="auth-form flex flex-col gap-4">
            <div className="form-group mb-0">
              <label className="form-label" htmlFor="title">Title</label>
              <input type="text" id="title" className="form-input" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group mb-0">
                <label className="form-label" htmlFor="author">Author</label>
                <input type="text" id="author" className="form-input" value={formData.author} onChange={handleChange} required />
              </div>
              <div className="form-group mb-0">
                <label className="form-label" htmlFor="isbn">ISBN</label>
                <input type="text" id="isbn" className="form-input" value={formData.isbn} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-group mb-0">
                <label className="form-label" htmlFor="genre">Genre</label>
                <select id="genre" className="form-select" value={formData.genre} onChange={handleChange} required>
                  <option value="">Select a genre...</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Biography">Biography</option>
                  <option value="Romance">Romance</option>
                </select>
              </div>
              <div className="form-group mb-0">
                <label className="form-label" htmlFor="publicationDate">Publication Date</label>
                <input type="date" id="publicationDate" className="form-input" value={formData.publicationDate} onChange={handleChange} required />
              </div>
            </div>

            <div className="form-group mb-0">
              <label className="form-label" htmlFor="coverImage">Cover Image URL</label>
              <input type="url" id="coverImage" className="form-input" value={formData.coverImage} onChange={handleChange} />
            </div>

            <div className="form-group mb-0">
              <label className="form-label" htmlFor="description">Book Description / Abstraction</label>
              <textarea id="description" className="form-textarea" rows="4" value={formData.description} onChange={handleChange} required></textarea>
            </div>

            <div className="form-group mb-0">
              <label className="form-label" htmlFor="authorIntroduction">Author Introduction</label>
              <textarea id="authorIntroduction" className="form-textarea" rows="3" value={formData.authorIntroduction} onChange={handleChange}></textarea>
            </div>

            <div className="form-group mb-0">
              <label className="form-label" htmlFor="awards">Awards (Best Editorial, Commendations, etc.)</label>
              <input type="text" id="awards" className="form-input" value={formData.awards} onChange={handleChange} placeholder="e.g. Pulitzer Prize 2024, NYT Bestseller" />
            </div>

            <div className="flex gap-4 mt-2">
              <button type="submit" className="btn-primary flex-1">
                {editingId ? 'Update Book' : 'Add Book'}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="btn-secondary flex-1">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List Section */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold mb-4">Manage Books</h2>
          <div className="overflow-y-auto max-h-[800px] pr-2 custom-scrollbar">
            {books.length === 0 ? (
              <p className="text-text-muted">No books in the catalog. Add some!</p>
            ) : (
              <ul className="flex flex-col gap-4">
                {books.map(book => (
                  <li key={book._id} className="bg-bg-card border border-border-color p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex gap-4">
                      <img src={book.coverImage} alt={book.title} className="w-16 h-24 object-cover rounded" />
                      <div>
                        <h3 className="font-bold text-lg leading-tight">{book.title}</h3>
                        <p className="text-text-muted text-sm">{book.author}</p>
                        <span className="inline-block mt-1 text-xs px-2 py-1 rounded bg-bg-dark border border-border-color">
                          {book.genre}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row sm:flex-col gap-2 shrink-0 self-end sm:self-auto">
                      <button onClick={() => handleEdit(book)} className="text-sm bg-blue-900/50 text-blue-300 hover:bg-blue-800 px-3 py-1 rounded transition-colors">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(book._id)} className="text-sm bg-red-900/50 text-red-300 hover:bg-red-800 px-3 py-1 rounded transition-colors">
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
