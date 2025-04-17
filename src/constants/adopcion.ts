export const MASCOTAS_POR_PAGINA = 6;

export const ESTADOS = {
  DISPONIBLE: 'disponible',
  ADOPTADO: 'adoptado',
  EN_PROCESO: 'en_proceso'
} as const;

export const TIPOS_MASCOTA = ['perro', 'gato'] as const;
export const TAMAÑOS = ['pequeño', 'mediano', 'grande'] as const;
export const SEXOS = ['macho', 'hembra'] as const;
export const EDADES = ['cachorro', 'joven', 'adulto', 'senior'] as const;

export type Estado = typeof ESTADOS[keyof typeof ESTADOS];
export type TipoMascota = typeof TIPOS_MASCOTA[number];
export type Tamaño = typeof TAMAÑOS[number];
export type Sexo = typeof SEXOS[number];
export type Edad = typeof EDADES[number]; 