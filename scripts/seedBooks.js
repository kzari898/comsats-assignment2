require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const dns = require('dns');

// Override local DNS to fix querySrv ECONNREFUSED issues with +srv strings
dns.setServers(['8.8.8.8', '8.8.4.4']);

// We have to redefine the model here slightly because this is a plain Node script
// and Next.js / Mongoose models combined can have issues outside the server env.
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: { type: String, unique: true },
  genre: String,
  publicationDate: Date,
  coverImage: String,
  description: String,
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

const sampleBooks = [
  {
    title: "Dune",
    author: "Frank Herbert",
    isbn: "978-0441172719",
    genre: "Science Fiction",
    publicationDate: new Date("1965-08-01"),
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop",
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange, a drug capable of extending life and enhancing consciousness."
  },
  {
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    genre: "Science Fiction",
    publicationDate: new Date("1949-06-08"),
    coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop",
    description: "Among the seminal texts of the 20th century, Nineteen Eighty-Four is a rare work that grows more haunting as its futuristic purgatory becomes more real."
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    genre: "Fiction",
    publicationDate: new Date("1925-04-10"),
    coverImage: "https://images.unsplash.com/photo-1476275466078-4007374efac4?q=80&w=600&auto=format&fit=crop",
    description: "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted 'gin was the national drink and sex the national obsession'."
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0547928227",
    genre: "Fantasy",
    publicationDate: new Date("1937-09-21"),
    coverImage: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=600&auto=format&fit=crop",
    description: "A great modern classic and the prelude to The Lord of the Rings. Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure."
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0141439518",
    genre: "Fiction",
    publicationDate: new Date("1813-01-28"),
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    description: "Since its immediate success in 1813, Pride and Prejudice has remained one of the most popular novels in the English language. Jane Austen called this brilliant work 'her own darling child' and its vivacious heroine, Elizabeth Bennet, 'as delightful a creature as ever appeared in print.'"
  }
];

async function seedDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    console.log('Clearing existing books...');
    await Book.deleteMany({});

    console.log('Inserting seed data...');
    await Book.insertMany(sampleBooks);
    
    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
