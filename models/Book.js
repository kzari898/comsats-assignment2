import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  author: {
    type: String,
    required: [true, 'Please provide an author'],
    trim: true,
  },
  isbn: {
    type: String,
    required: [true, 'Please provide an ISBN'],
    unique: true,
    trim: true,
  },
  genre: {
    type: String,
    required: [true, 'Please provide a genre'],
  },
  publicationDate: {
    type: Date,
    required: [true, 'Please provide a publication date'],
  },
  coverImage: {
    type: String,
    default: '/default-book-cover.png',
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  authorIntroduction: {
    type: String,
    default: '',
  },
  awards: {
    type: String,
    default: '',
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);
export default Book;
