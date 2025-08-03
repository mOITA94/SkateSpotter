export const API_BASE_URL = 'http://localhost:8080/api';

export const DIFFICULTY_OPTIONS = [
  { value: 'BEGINNER', label: 'Beginner' },
  { value: 'INTERMEDIATE', label: 'Intermediate' },
  { value: 'ADVANCED', label: 'Advanced' },
  { value: 'EXPERT', label: 'Expert' },
] as const;

export const SURFACE_OPTIONS = [
  { value: 'CONCRETE', label: 'Concrete' },
  { value: 'ASPHALT', label: 'Asphalt' },
  { value: 'WOOD', label: 'Wood' },
  { value: 'METAL', label: 'Metal' },
  { value: 'STONE', label: 'Stone' },
] as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SPOTS: '/spots',
  CREATE_SPOT: '/spots/create',
  EDIT_SPOT: '/spots/:id/edit',
  REPORTS: '/reports',
} as const;