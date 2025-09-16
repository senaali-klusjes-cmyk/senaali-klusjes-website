export interface Review {
  id: string;
  clientName: string;
  service: string;
  rating: number;
  comment: string;
  date: Date;
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'schilderwerk' | 'tuinieren' | 'ramen-wassen';
  images: string[];
  completedDate: Date;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  description: string;
  submittedDate: Date;
  status: 'pending' | 'contacted' | 'completed';
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  albumName: string;
  uploadDate: Date;
  cloudinaryPublicId?: string;
}

export interface Album {
  id: string;
  name: string;
  createdDate: Date;
  photoCount: number;
}