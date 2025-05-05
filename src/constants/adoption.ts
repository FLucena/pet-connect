export const PETS_PER_PAGE = 6;

export const STATUS = {
  AVAILABLE: 'disponible',
  ADOPTED: 'adoptado',
  IN_PROCESS: 'en_proceso'
} as const;

export const PET_TYPES = ['perro', 'gato'] as const;
export const SIZES = ['pequeño', 'mediano', 'grande'] as const;
export const SEXES = ['macho', 'hembra'] as const;
export const AGE_CATEGORIES = ['cachorro', 'joven', 'adulto', 'senior'] as const;

export type Status = typeof STATUS[keyof typeof STATUS];
export type PetType = typeof PET_TYPES[number];
export type Size = typeof SIZES[number];
export type Sex = typeof SEXES[number];
export type AgeCategory = typeof AGE_CATEGORIES[number]; 