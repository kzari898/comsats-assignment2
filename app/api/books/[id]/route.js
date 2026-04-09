import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Book from '@/models/Book';
import { verifyToken } from '@/lib/auth';
import User from '@/models/User';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    await connectToDatabase();
    
    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json({ book }, { status: 200 });

  } catch (error) {
    console.error('Fetch book error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch book', error: error.message },
      { status: 500 }
    );
  }
}

// Helper to check admin
async function isAdmin(request) {
  const token = request.cookies.get('token')?.value;
  if (!token) return false;
  const decoded = verifyToken(token);
  if (!decoded) return false;
  
  await connectToDatabase();
  const user = await User.findById(decoded.userId);
  return user && user.role === 'admin';
}

export async function PUT(request, { params }) {
  try {
    if (!(await isAdmin(request))) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    await connectToDatabase();
    
    const body = await request.json();
    const book = await Book.findByIdAndUpdate(id, body, { new: true });

    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Book updated successfully', book }, { status: 200 });

  } catch (error) {
    console.error('Update book error:', error);
    return NextResponse.json({ message: 'Failed to update book', error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!(await isAdmin(request))) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    await connectToDatabase();
    
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Book deleted successfully' }, { status: 200 });

  } catch (error) {
    console.error('Delete book error:', error);
    return NextResponse.json({ message: 'Failed to delete book', error: error.message }, { status: 500 });
  }
}
