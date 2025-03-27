import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import { Candidate, ICandidate } from '@/models/Candidate';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const candidates = await Candidate.find().sort({ createdAt: -1 });
    return NextResponse.json(candidates);
  } catch (error) {
    console.error('GET /api/candidates error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const candidate: ICandidate = await request.json();
    
    const newCandidate = await Candidate.create({
      ...candidate,
      createdBy: session.user.id,
    });

    return NextResponse.json(newCandidate);
  } catch (error) {
    console.error('POST /api/candidates error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing candidate ID' }, { status: 400 });
    }

    await connectDB();
    const candidateData: Partial<ICandidate> = await request.json();

    const updatedCandidate = await Candidate.findOneAndUpdate(
      { _id: id, createdBy: session.user.id },
      { $set: candidateData },
      { new: true }
    );

    if (!updatedCandidate) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    return NextResponse.json(updatedCandidate);
  } catch (error) {
    console.error('PUT /api/candidates error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing candidate ID' }, { status: 400 });
    }

    await connectDB();
    const deletedCandidate = await Candidate.findOneAndDelete({
      _id: id,
      createdBy: session.user.id,
    });

    if (!deletedCandidate) {
      return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error('DELETE /api/candidates error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 