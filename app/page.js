import Link from 'next/link';

// Simple helper to fetch books server-side
async function getBooks(searchParams) {
  const params = await searchParams;
  const search = params?.search || '';
  const genre = params?.genre || '';
  const page = params?.page || 1;
  
  const query = new URLSearchParams({
    search,
    genre,
    page: page.toString(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/books?${query.toString()}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function Home({ searchParams }) {
  const { books, pagination } = await getBooks(searchParams);
  const params = await searchParams;
  const search = params?.search || '';
  const genre = params?.genre || '';

  return (
    <div className="flex gap-8 max-md:flex-col animate-fade-in">
      {/* Sidebar Filters */}
      <aside className="w-64 flex-shrink-0">
        <div className="glass-panel p-6 sticky top-24">
          <h2 className="text-xl font-bold mb-4 border-b border-border-color pb-2">Discover</h2>
          
          <div className="mb-6">
            <h3 className="font-semibold text-primary mb-2">Genres</h3>
            <ul className="space-y-2">
              {[
                { name: 'All Genres', value: '' },
                { name: 'Fiction', value: 'Fiction' },
                { name: 'Science Fiction', value: 'Science Fiction' },
                { name: 'Fantasy', value: 'Fantasy' },
                { name: 'Mystery', value: 'Mystery' },
                { name: 'Non-Fiction', value: 'Non-Fiction' }
              ].map((g) => (
                <li key={g.name}>
                  <Link 
                    href={`/?${new URLSearchParams({ ...params, genre: g.value, page: '1' }).toString()}`}
                    className={`block py-1 hover:text-primary transition-colors ${genre === g.value ? 'text-primary font-bold' : 'text-text-muted'}`}
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-10 p-12 rounded-3xl bg-[rgba(24,24,27,0.4)] border border-border-color filter backdrop-blur-md text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 drop-shadow-sm">Welcome to The Literati Hub</h1>
            <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              Your premium destination to discover, track, and review the world's greatest literature.
            </p>
          </div>
          {/* Decorative background blurs */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-50 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-[120px] animate-float"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-secondary rounded-full mix-blend-screen filter blur-[120px] animate-float-delayed"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-float"></div>
          </div>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {search ? `Search results for "${search}"` : genre ? `${genre} Books` : 'Catalog'}
          </h2>
          <span className="text-text-muted">{pagination.total} books found</span>
        </div>

        {books.length === 0 ? (
          <div className="glass-panel p-12 text-center text-text-muted">
            <p>No books found matching your criteria.</p>
            <Link href="/" className="btn-secondary mt-4 inline-block">Clear Filters</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <Link href={`/book/${book._id}`} key={book._id} className="glass-panel group hover:border-primary transition-all duration-300 block overflow-hidden flex flex-col h-full">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent opacity-80"></div>
                </div>
                <div className="p-4 flex flex-col flex-1 transform -translate-y-6 relative z-10">
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">{book.genre}</span>
                  <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors line-clamp-2">{book.title}</h3>
                  <p className="text-sm text-text-muted mb-3">{book.author}</p>
                  
                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-border-color">
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-yellow-500">★</span>
                      <span>{book.averageRating > 0 ? book.averageRating.toFixed(1) : 'New'}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <Link 
                key={p} 
                href={`/?${new URLSearchParams({ ...params, page: p.toString() }).toString()}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg border ${p === pagination.page ? 'bg-primary border-primary text-white' : 'border-border-color hover:border-primary'} transition-colors`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
