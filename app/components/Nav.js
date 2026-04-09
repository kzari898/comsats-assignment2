'use client';

import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useState } from 'react';

export default function Nav() {
  const { user, logout, loading } = useAuth();
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/?search=${encodeURIComponent(search)}`;
    }
  };

  return (
    <header className="nav-header">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          The Literati Hub
        </Link>
        
        <form onSubmit={handleSearch} className="nav-search">
          <input 
            type="text" 
            placeholder="Search books, authors, ISBN..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <nav className="nav-links">
          <Link href="/">Catalog</Link>
          
          {!loading && (
            <>
              {user ? (
                <>
                  <Link href="/my-books">My Books</Link>
                  {user.role === 'admin' && (
                    <Link href="/admin" className="text-secondary font-bold">Admin</Link>
                  )}
                  <Link href="/profile" className="nav-profile-link">
                    <img src={user.avatarUrl || '/default-avatar.png'} alt="Avatar" className="nav-avatar" />
                    {user.username}
                  </Link>
                  <button onClick={logout} className="btn-secondary">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-secondary">Login</Link>
                  <Link href="/register" className="btn-primary">Sign Up</Link>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
