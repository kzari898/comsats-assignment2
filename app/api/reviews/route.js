import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Review from '@/models/Review';
import Book from '@/models/Book';
import { verifyToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const token = request.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    await connectToDatabase();
    
    const { bookId, rating, reviewText } = await request.json();

    if (!bookId || !rating) {
      return NextResponse.json({ message: 'Rating and Book ID are required' }, { status: 400 });
    }

    // Try to create the review, MongoDB unique compound index will throw error if it already exists
    try {
      const review = await Review.create({
        user_id: decoded.userId,
        book_id: bookId,
        rating: Number(rating),
        reviewText
      });

      // Recalculate average rating for the book
      const allReviews = await Review.find({ book_id: bookId });
      const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
      const averageRating = totalRating / allReviews.length;

      // Update the book
      await Book.findByIdAndUpdate(bookId, {
        averageRating: averageRating,
        totalReviews: allReviews.length
      });

      // Populate user info before returning
      await review.populate('user_id', 'username avatarUrl');

      return NextResponse.json({ message: 'Review added successfully', review }, { status: 201 });
      
    } catch (dbError) {
      // 11000 is MongoDB duplicate key error (meaning user already reviewed this book)
      if (dbError.code === 11000) {
        return NextResponse.json({ message: 'You have already reviewed this book' }, { status: 409 });
      }
      throw dbError;
    }

  } catch (error) {
    console.error('Add review error:', error);
    return NextResponse.json(
      { message: 'Failed to add review', error: error.message },
      { status: 500 }
    );
  }
}
