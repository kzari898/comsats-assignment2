import './globals.css';
import { AuthProvider } from './context/AuthContext';
import Nav from './components/Nav';

export const metadata = {
  title: 'The Literati Hub',
  description: 'A premium social catalog and discovery platform for book lovers.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Nav />
          <main className="main-content">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
