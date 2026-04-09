import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please provide a rating from 1 to 5'],
    min: 1,
    max: 5,
  },
  reviewText: {
    type: String,
    trim: true,
    maxlength: [1000, 'Review cannot be more than 1000 characters'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Enforce unique review per user per book
reviewSchema.index({ user_id: 1, book_id: 1 }, { unique: true });

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
export default Review;
