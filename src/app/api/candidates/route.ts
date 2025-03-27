import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const candidates = await db.collection('candidates')
      .find({ createdBy: session.user.id })
      .toArray();

    return NextResponse.json(candidates.map(candidate => ({
      ...candidate,
      _id: candidate._id.toString()
    })));
  } catch (error) {
    console.error('GET /api/candidates error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { db } = await connectToDatabase();

    const candidate = {
      ...data,
      createdBy: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection('candidates').insertOne(candidate);
    return NextResponse.json({
      ...candidate,
      _id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('POST /api/candidates error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { _id, ...updateData } = data;

    if (!_id) {
      return NextResponse.json({ error: 'Missing candidate ID' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('candidates').findOneAndUpdate(
      { _id: new ObjectId(_id), createdBy: session.user.id },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
      { returnDocument: 'after' }
    );

    if (!result || !result.value) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...result.value,
      _id: result.value._id.toString(),
    });
  } catch (error) {
    console.error('PUT /api/candidates error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing candidate ID' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('candidates').deleteOne({
      _id: new ObjectId(id),
      createdBy: session.user.id,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/candidates error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 