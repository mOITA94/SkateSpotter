export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface SkateSpot {
  id: number;
  name: string; 
  description: string;
  location: string;
  surface: string;
  difficulty: string;
  imageUrl: string;
  createdAt: string;
  rating: number;
  ratingCount: number;
  averageRating?: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
}