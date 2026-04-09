import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Book from '@/models/Book';

export async function GET(request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const genre = searchParams.get('genre') || '';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } }
      ];
    }

    if (genre) {
      query.genre = genre;
    }

    const books = await Book.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(query);

    return NextResponse.json({
      books,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Fetch books error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch books', error: error.message },
      { status: 500 }
    );
  }
}

// For Admin to add new books
export async function POST(request) {
  try {
    // In a real app we'd verify admin token here
    await connectToDatabase();
    const data = await request.json();

    const book = await Book.create(data);

    return NextResponse.json({ message: 'Book created successfully', book }, { status: 201 });
  } catch (error) {
    console.error('Create book error:', error);
    return NextResponse.json(
      { message: 'Failed to create book', error: error.message },
      { status: 500 }
    );
  }
}
