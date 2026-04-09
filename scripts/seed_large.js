require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

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

const generateBooks = () => {
  const genres = ['Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Non-Fiction', 'Biography', 'Romance'];
  const books = [];
  
  // Real or realistic book titles per genre
  const templates = {
    'Fiction': ["The Great Gatsby", "To Kill a Mockingbird", "1984", "Pride and Prejudice", "The Catcher in the Rye", "The Lord of the Rings", "Animal Farm", "Jane Eyre", "Catch-22", "Wuthering Heights", "Brave New World", "The Grapes of Wrath", "Fahrenheit 451"],
    'Science Fiction': ["Dune", "Neuromancer", "Foundation", "Snow Crash", "Ender's Game", "The Left Hand of Darkness", "Hyperion", "The Martian", "Ringworld", "The Dispossessed", "Stranger in a Strange Land", "I, Robot", "The Time Machine"],
    'Fantasy': ["The Hobbit", "Harry Potter", "A Game of Thrones", "The Name of the Wind", "Mistborn", "The Way of Kings", "The Color of Magic", "American Gods", "Good Omens", "The Lies of Locke Lamora", "The Golden Compass", "Assassin's Apprentice"],
    'Mystery': ["The Girl with the Dragon Tattoo", "Gone Girl", "The Da Vinci Code", "And Then There Were None", "The Hound of the Baskervilles", "Murder on the Orient Express", "The Silence of the Lambs", "Big Little Lies", "The Sweetness at the Bottom of the Pie", "In the Woods", "The Girl on the Train"],
    'Non-Fiction': ["Sapiens", "Thinking, Fast and Slow", "Educated", "Quiet", "Outliers", "The Power of Habit", "Guns, Germs, and Steel", "A Brief History of Time", "Freakonomics", "The Immortal Life of Henrietta Lacks", "Becoming", "Born a Crime"],
    'Biography': ["Steve Jobs", "Alexander Hamilton", "John Adams", "The Diary of a Young Girl", "Leonardo da Vinci", "Einstein", "Titan", "Churchill", "Benjamin Franklin", "Grant", "Washington", "Team of Rivals"],
    'Romance': ["Outlander", "The Notebook", "Me Before You", "The Fault in Our Stars", "Twilight", "Fifty Shades of Grey", "Bridges of Madison County", "A Walk to Remember", "The Time Traveler's Wife", "P.S. I Love You", "Eleanor & Park", "Beautiful Disaster"]
  };

  const covers = [
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476275466078-4007374efac4?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop"
  ];

  let isbnCounter = 10000;

  for (const genre of genres) {
    const titles = templates[genre];
    for (let i = 0; i < 11; i++) { // Generate 11 books per genre
      books.push({
        title: titles[i % titles.length] + (i >= titles.length ? ' II' : ''),
        author: `Author ${genre} ${i}`,
        isbn: `978-0000${isbnCounter++}`,
        genre: genre,
        publicationDate: new Date(Date.now() - Math.floor(Math.random() * 1000000000000)),
        coverImage: covers[i % covers.length],
        description: `This is a spectacular ${genre} book full of amazing twists and turns. It has won numerous awards. The author explores deep themes. Required reading for fans of ${genre}.`,
        averageRating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // Between 3.0 and 5.0
        totalReviews: Math.floor(Math.random() * 1000)
      });
    }
  }

  return books;
};

async function seedDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    console.log('Clearing existing books...');
    await Book.deleteMany({});

    console.log('Inserting large seed data...');
    const booksToInsert = generateBooks();
    await Book.insertMany(booksToInsert);
    
    console.log(`Database seeded successfully with ${booksToInsert.length} books!`);
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
