import mongoose from 'mongoose';

const bookshelfBookSchema = new mongoose.Schema({
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  shelf_type: {
    type: String,
    enum: ['Want to Read', 'Currently Reading', 'Read'],
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
    maxlength: [30, 'Username cannot be more than 30 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email address'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  passwordHash: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: '/default-avatar.png',
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters'],
  },
  bookshelves: [bookshelfBookSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
