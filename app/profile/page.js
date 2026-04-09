'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Profile() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="text-center mt-20">Loading profile...</div>;
  }

  const getShelfCount = (type) => {
    return user.bookshelves?.filter(s => s.shelf_type === type).length || 0;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-fade-in">
      <div className="glass-panel p-8 flex flex-col items-center">
        <img 
          src={user.avatarUrl || '/default-avatar.png'} 
          alt="Profile Avatar" 
          className="w-32 h-32 rounded-full border-4 border-primary mb-4 object-cover"
        />
        <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
        <p className="text-text-muted mb-6">{user.email}</p>
        
        {user.bio && (
          <div className="w-full text-center max-w-2xl bg-bg-card p-4 rounded-lg border border-border-color mb-6">
            <h3 className="font-semibold mb-2 text-primary">About Me</h3>
            <p>{user.bio}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-6 w-full max-w-2xl mb-8 border-y border-border-color py-6">
          <div className="text-center">
            <span className="block text-3xl font-bold text-primary">{getShelfCount('Want to Read')}</span>
            <span className="text-sm text-text-muted">Want to Read</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-secondary">{getShelfCount('Currently Reading')}</span>
            <span className="text-sm text-text-muted">Currently Reading</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-bold text-white">{getShelfCount('Read')}</span>
            <span className="text-sm text-text-muted">Read</span>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="btn-primary" onClick={() => router.push('/my-books')}>
            View My Reading Lists
          </button>
          <button className="btn-secondary" onClick={logout}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
