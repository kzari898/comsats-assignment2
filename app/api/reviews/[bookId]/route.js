import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Review from '@/models/Review';

export async function GET(request, { params }) {
  try {
    const { bookId } = await params;
    await connectToDatabase();
    
    const reviews = await Review.find({ book_id: bookId })
      .populate('user_id', 'username avatarUrl')
      .sort({ createdAt: -1 });

    return NextResponse.json({ reviews }, { status: 200 });

  } catch (error) {
    console.error('Fetch reviews error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch reviews', error: error.message },
      { status: 500 }
    );
  }
}
