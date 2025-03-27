import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import connectDB from '@/lib/db';
import { Candidate } from '@/models/Candidate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const candidates = await Candidate.find().lean();
        res.status(200).json(candidates);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching candidates' });
      }
      break;

    case 'POST':
      try {
        const candidate = new Candidate({
          ...req.body,
          createdBy: session.user.id,
        });
        await candidate.save();
        res.status(201).json(candidate);
      } catch (error) {
        res.status(500).json({ error: 'Error creating candidate' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 