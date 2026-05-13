import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
}

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  coverImage: string;
  media: IMedia[];
  createdAt: Date;
}

const MediaSchema = new Schema<IMedia>({
  type: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  thumbnail: { type: String },
  width: { type: Number },
  height: { type: Number },
});

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  tags: [{ type: String }],
  coverImage: { type: String, required: true },
  media: [MediaSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
