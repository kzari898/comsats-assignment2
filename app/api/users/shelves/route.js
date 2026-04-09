import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
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
    
    const { bookId, shelfType } = await request.json();

    if (!bookId || !shelfType) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const user = await User.findById(decoded.userId);

    // Check if book is already in a shelf
    const existingShelfIndex = user.bookshelves.findIndex(
      (shelf) => shelf.book_id.toString() === bookId
    );

    if (existingShelfIndex > -1) {
      // Update existing shelf
      user.bookshelves[existingShelfIndex].shelf_type = shelfType;
      user.bookshelves[existingShelfIndex].addedAt = new Date();
    } else {
      // Add new shelf
      user.bookshelves.push({
        book_id: bookId,
        shelf_type: shelfType,
      });
    }

    await user.save();

    return NextResponse.json({ message: 'Shelf updated successfully', bookshelves: user.bookshelves }, { status: 200 });

  } catch (error) {
    console.error('Update shelf error:', error);
    return NextResponse.json(
      { message: 'Failed to update shelf', error: error.message },
      { status: 500 }
    );
  }
}
