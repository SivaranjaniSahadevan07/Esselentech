export interface Media {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  width?: number;
  height?: number;
}

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  coverImage: string;
  media: Media[];
  createdAt: Date;
}
