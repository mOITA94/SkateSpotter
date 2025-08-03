export interface User {
  id: number;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
}

export interface Spot {
  id: number;
  name: string;
  description: string;
  location: string;
  locationUrl?: string;
  surface: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  rating: number;
  imageUrl: string;
  createdBy: User;
  createdAt: string;
}

export interface Report {
  id: number;
  reason: string;
  spot: Spot;
  reportedBy: User;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CreateSpotData {
  name: string;
  description: string;
  location: string;
  locationUrl?: string;
  surface: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  image: File;
}

export interface SpotFilters {
  difficulty?: string;
  surface?: string;
  location?: string;
}