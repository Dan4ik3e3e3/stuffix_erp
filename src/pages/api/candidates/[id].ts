import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import connectDB from '@/lib/db';
import { Candidate } from '@/models/Candidate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  await connectDB();

  switch (req.method) {
    case 'GET':
      try {
        const candidate = await Candidate.findById(id).lean();
        if (!candidate) {
          return res.status(404).json({ error: 'Candidate not found' });
        }
        res.status(200).json(candidate);
      } catch (error) {
        res.status(500).json({ error: 'Error fetching candidate' });
      }
      break;

    case 'PUT':
      try {
        const candidate = await Candidate.findByIdAndUpdate(
          id,
          { ...req.body, updatedBy: session.user.id },
          { new: true, runValidators: true }
        ).lean();
        
        if (!candidate) {
          return res.status(404).json({ error: 'Candidate not found' });
        }
        
        res.status(200).json(candidate);
      } catch (error) {
        res.status(500).json({ error: 'Error updating candidate' });
      }
      break;

    case 'DELETE':
      try {
        const candidate = await Candidate.findByIdAndDelete(id);
        if (!candidate) {
          return res.status(404).json({ error: 'Candidate not found' });
        }
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Error deleting candidate' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 