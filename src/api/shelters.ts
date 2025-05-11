import connectDB from '../lib/mongodb';
import Shelter from '../models/Shelter';
import { Shelter as ShelterType } from '../types/shelter';

export interface Shelter {
  id: string;
  nombre: string;
  descripcion: string;
  contacto: {
    email: string;
    telefono: string;
    direccion: string;
  };
  ubicacion: {
    ciudad: string;
    provincia: string;
    coordenadas?: {
      lat: number;
      lng: number;
    };
  };
  capacidad: number;
  instalaciones: string[];
  servicios: string[];
  personal: {
    veterinarios: number;
    cuidadores: number;
    voluntarios: number;
  };
  animales: {
    total: number;
    disponibles: number;
    adoptados: number;
  };
  fotos: string[];
  estado: 'activo' | 'inactivo';
  fechaRegistro: string;
  ultimaActualizacion: string;
}

// API Route Handlers
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (id) {
      const shelter = await getShelterById(id);
      return new Response(JSON.stringify(shelter), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    const shelters = await getShelters();
    return new Response(JSON.stringify(shelters), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error in GET /api/shelters:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch shelters' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const shelterData = await request.json();
    // Generate a unique ID with format "S001", "S002", etc.
    await connectDB();
    const count = await Shelter.countDocuments();
    const id = `S${String(count + 1).padStart(3, '0')}`;
    
    const result = await createShelter({ ...shelterData, id });
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (err) {
    console.error('Error in POST /api/shelters:', err);
    return new Response(JSON.stringify({ error: 'Failed to create shelter' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'Shelter ID is required' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const shelterData = await request.json();
    const result = await updateShelter(id, shelterData);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error in PUT /api/shelters:', err);
    return new Response(JSON.stringify({ error: 'Failed to update shelter' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) {
      return new Response(JSON.stringify({ error: 'Shelter ID is required' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const result = await deleteShelter(id);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error in DELETE /api/shelters:', err);
    return new Response(JSON.stringify({ error: 'Failed to delete shelter' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

export async function getShelters(): Promise<ShelterType[]> {
  await connectDB();
  const shelters = await Shelter.find({}).lean();
  return shelters as unknown as ShelterType[];
}

export async function getShelterById(id: string): Promise<ShelterType> {
  await connectDB();
  const shelter = await Shelter.findOne({ id }).lean();
  if (!shelter) throw new Error('Shelter not found');
  return shelter as unknown as ShelterType;
}

export async function createShelter(data: Omit<ShelterType, 'id'>): Promise<{ insertedId: string }> {
  await connectDB();
  // Generate a unique id (could use nanoid or similar in real app)
  const id = 'S' + Date.now();
  const shelter = new Shelter({ ...data, id });
  await shelter.save();
  return { insertedId: id };
}

export async function updateShelter(id: string, data: Partial<ShelterType>): Promise<{ modifiedCount: number }> {
  await connectDB();
  const result = await Shelter.updateOne({ id }, { $set: data });
  if (result.matchedCount === 0) throw new Error('Shelter not found');
  return { modifiedCount: result.modifiedCount };
}

export async function deleteShelter(id: string): Promise<{ deletedCount: number }> {
  await connectDB();
  const result = await Shelter.deleteOne({ id });
  if (result.deletedCount === 0) throw new Error('Shelter not found');
  return { deletedCount: result.deletedCount };
}

export async function searchShelters(query: {
  nombre?: string;
  ciudad?: string;
  provincia?: string;
  servicios?: string[];
}) {
  try {
    await connectDB();
    const filter: {
      nombre?: { $regex: string; $options: string };
      'ubicacion.ciudad'?: string;
      'ubicacion.provincia'?: string;
      servicios?: { $in: string[] };
    } = {};
    
    if (query.nombre) {
      filter.nombre = { $regex: query.nombre, $options: 'i' };
    }
    if (query.ciudad) {
      filter['ubicacion.ciudad'] = query.ciudad;
    }
    if (query.provincia) {
      filter['ubicacion.provincia'] = query.provincia;
    }
    if (query.servicios) {
      filter.servicios = { $in: query.servicios };
    }

    const shelters = await Shelter.find(filter).lean();
    return shelters as unknown as ShelterType[];
  } catch (error) {
    console.error('Error searching shelters:', error);
    throw error;
  }
} 