import mongoose from 'mongoose';

export interface ICandidate {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  status: 'new' | 'contacted' | 'interview' | 'offer' | 'hired' | 'rejected';
  skills: string[];
  experience: number;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  location: string;
  resume: string;
  notes: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const candidateSchema = new mongoose.Schema<ICandidate>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'interview', 'offer', 'hired', 'rejected'],
      default: 'new',
    },
    skills: [{
      type: String,
    }],
    experience: {
      type: Number,
      required: true,
    },
    salary: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: 'RUB',
      },
    },
    location: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
    },
    notes: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Candidate = mongoose.models.Candidate || mongoose.model<ICandidate>('Candidate', candidateSchema); 