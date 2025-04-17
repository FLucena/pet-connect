import { Estado, TipoMascota, Tamaño, Sexo, Edad } from '../constants/adopcion';

export interface Mascota {
  id: string;
  tipo: TipoMascota;
  nombre: string;
  raza: string;
  edad: {
    años: number;
    meses: number;
  };
  sexo: Sexo;
  tamaño: Tamaño;
  peso: number;
  color: string;
  caracteristicasFisicas: {
    pelaje: string;
    orejas?: string;
    cola?: string;
    patron?: string;
    marcasEspeciales: string[];
  };
  salud: {
    estado: string;
    vacunas: string[];
    ultimaVacuna: string;
    esterilizado: boolean;
    fechaEsterilizacion: string;
    microchip: boolean;
    numeroMicrochip: string;
    condicionesEspeciales: string[];
    alergias: string[];
    medicamentos: string[];
  };
  comportamiento: {
    energia: string;
    sociabilidad: string;
    entrenamiento: string;
    buenoConNinos: boolean;
    buenoConPerros: boolean;
    buenoConGatos: boolean;
    caracter: string[];
    necesidadesEspeciales: string[];
  };
  historia: {
    origen: string;
    fechaRescate: string;
    circunstanciasRescate: string;
    historiaMedica: string;
    notasEspeciales: string;
  };
  cuidados: {
    alimentacion: string;
    ejercicio: string;
    aseo: string;
    necesidadesEspeciales: string[];
  };
  relaciones: {
    refugioActual: string;
    fechaIngresoRefugio: string;
    adoptanteActual: string | null;
    fechaAdopcion?: string;
    adoptantesAnteriores: Array<{
      id: string;
      fechaAdopcion: string;
      fechaDevolucion: string;
      razon: string;
    }>;
    fosterActual: string | null;
    fostersAnteriores: string[];
  };
  fotos: string[];
  estado: Estado;
  fechaRegistro: string;
  ultimaActualizacion: string;
}

export interface PetFilters {
  tipo: TipoMascota | '';
  tamaño: Tamaño | '';
  sexo: Sexo | '';
  edad: Edad | '';
  raza: string;
  busqueda: string;
  estado: Estado | '';
}

export interface PetErrors {
  tipo: boolean;
} 