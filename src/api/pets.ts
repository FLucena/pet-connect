import { connectToDatabase } from '../lib/db';

interface PhysicalCharacteristics {
  tamaño: "pequeño" | "mediano" | "grande";
  peso: number;
  color: string;
}

interface Health {
  vacunas?: string[];
  enfermedades?: string[];
  alergias?: string[];
  medicamentos?: string[];
}

interface Behavior {
  temperamento?: string;
  sociabilidad?: string;
  entrenamiento?: string[];
  necesidadesEspeciales?: string[];
}

interface PetAge {
  años?: number;
  meses?: number;
}

interface Pet {
  id: string;
  tipo: string;
  nombre: string;
  raza: string;
  edad: PetAge;
  sexo: "macho" | "hembra";
  tamaño: "pequeño" | "mediano" | "grande";
  peso: number;
  color: string;
  caracteristicasFisicas: PhysicalCharacteristics;
  salud: Health;
  comportamiento: Behavior;
  createdAt?: Date;
  userId?: string;
}

// API Route Handlers
export async function GET(request: Request) {
  try {
    console.log('GET /api/pets');
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (id) {
      const pet = await getPetById(id);
      return new Response(JSON.stringify(pet), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    const pets = await getPets();
    return new Response(JSON.stringify(pets), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error in GET /api/pets:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch pets' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const petData = await request.json();
    // Generate a unique ID with format "M001", "M002", etc.
    const { db } = await connectToDatabase();
    const count = await db.collection('pets').countDocuments();
    const id = `M${String(count + 1).padStart(3, '0')}`;
    
    const result = await createPet({ ...petData, id });
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  } catch (err) {
    console.error('Error in POST /api/pets:', err);
    return new Response(JSON.stringify({ error: 'Failed to create pet' }), {
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
      return new Response(JSON.stringify({ error: 'Pet ID is required' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const petData = await request.json();
    const result = await updatePet(id, petData);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error in PUT /api/pets:', err);
    return new Response(JSON.stringify({ error: 'Failed to update pet' }), {
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
      return new Response(JSON.stringify({ error: 'Pet ID is required' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const result = await deletePet(id);
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error in DELETE /api/pets:', err);
    return new Response(JSON.stringify({ error: 'Failed to delete pet' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}

export async function getPets() {
  try {
    const { db } = await connectToDatabase();
    const pets = await db.collection('pets').find({}).toArray();
    return pets;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
}

export async function createPet(petData: Pet) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('pets').insertOne({
      ...petData,
      createdAt: new Date()
    });
    return result;
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
}

export async function getPetById(id: string) {
  try {
    const { db } = await connectToDatabase();
    const pet = await db.collection('pets').findOne({ id });
    if (!pet) {
      throw new Error('Pet not found');
    }
    return pet;
  } catch (error) {
    console.error('Error fetching pet:', error);
    throw error;
  }
}

export async function updatePet(id: string, petData: Partial<Pet>) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('pets').updateOne(
      { id },
      { $set: petData }
    );
    if (result.matchedCount === 0) {
      throw new Error('Pet not found');
    }
    return result;
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
}

export async function deletePet(id: string) {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('pets').deleteOne({ id });
    if (result.deletedCount === 0) {
      throw new Error('Pet not found');
    }
    return result;
  } catch (error) {
    console.error('Error deleting pet:', error);
    throw error;
  }
}

export async function searchPets(query: {
  nombre?: string;
  tipo?: string;
  raza?: string;
  sexo?: "macho" | "hembra";
  tamaño?: "pequeño" | "mediano" | "grande";
  userId?: string;
}) {
  try {
    const { db } = await connectToDatabase();
    const filter: {
      nombre?: { $regex: string; $options: string };
      tipo?: string;
      raza?: string;
      sexo?: "macho" | "hembra";
      tamaño?: "pequeño" | "mediano" | "grande";
      userId?: string;
    } = {};
    
    if (query.nombre) {
      filter.nombre = { $regex: query.nombre, $options: 'i' };
    }
    if (query.tipo) {
      filter.tipo = query.tipo;
    }
    if (query.raza) {
      filter.raza = query.raza;
    }
    if (query.sexo) {
      filter.sexo = query.sexo;
    }
    if (query.tamaño) {
      filter.tamaño = query.tamaño;
    }
    if (query.userId) {
      filter.userId = query.userId;
    }

    const pets = await db.collection('pets').find(filter).toArray();
    return pets;
  } catch (error) {
    console.error('Error searching pets:', error);
    throw error;
  }
}

export async function getPetsByUser(userId: string) {
  try {
    const { db } = await connectToDatabase();
    const pets = await db.collection('pets').find({ userId }).toArray();
    return pets;
  } catch (error) {
    console.error('Error fetching user pets:', error);
    throw error;
  }
} 