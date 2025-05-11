import Pet from '../models/Pet';

interface PhysicalCharacteristics {
  coat: string;
  ears?: string;
  tail?: string;
  pattern?: string;
  specialMarks?: string[];
}

interface Health {
  status: string;
  vaccines?: string[];
  lastVaccine?: string;
  sterilized: boolean;
  sterilizationDate?: string;
  microchip: boolean;
  microchipNumber?: string;
  specialConditions?: string[];
  allergies?: string[];
  medications?: string[];
}

interface Behavior {
  energy: string;
  sociability: string;
  training: string;
  goodWithChildren: boolean;
  goodWithDogs: boolean;
  goodWithCats: boolean;
  character?: string[];
  specialNeeds?: string[];
}

interface PetAge {
  years: number;
  months: number;
}

interface PetType {
  id: string;
  type: string;
  name: string;
  breed: string;
  age: PetAge;
  sex: string;
  size: string;
  weight: number;
  color: string;
  physicalCharacteristics: PhysicalCharacteristics;
  health: Health;
  behavior: Behavior;
  history: {
    origin: string;
    rescueDate: string;
    rescueCircumstances?: string;
    medicalHistory?: string;
    specialNotes?: string;
  };
  care: {
    feeding: string;
    exercise: string;
    grooming: string;
    specialNeeds?: string[];
  };
  relationships: {
    currentShelter: string;
    shelterEntryDate: string;
    currentAdopter?: string;
    adoptionDate?: string;
    previousAdopters?: {
      id: string;
      adoptionDate: string;
      returnDate: string;
      reason: string;
    }[];
    currentFoster?: string;
    previousFosters?: string[];
  };
  photos?: string[];
  status: string;
  registrationDate: string;
  lastUpdate: string;
}

// API Route Handlers
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const pet = await getPetById(id);
      if (!pet) {
        return new Response(JSON.stringify({ error: 'Pet not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify(pet), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const pets = await getPets();
    return new Response(JSON.stringify(pets), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching pets:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function POST(request: Request) {
  try {
    const petData = await request.json();
    const result = await createPet(petData);
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
    const pets = await Pet.find({});
    return pets;
  } catch (error) {
    console.error('Error fetching pets:', error);
    throw error;
  }
}

export async function createPet(petData: PetType) {
  try {
    const pet = await Pet.create(petData);
    return pet;
  } catch (error) {
    console.error('Error creating pet:', error);
    throw error;
  }
}

export async function getPetById(id: string) {
  try {
    const pet = await Pet.findOne({ id });
    return pet;
  } catch (error) {
    console.error('Error fetching pet by id:', error);
    throw error;
  }
}

export async function updatePet(id: string, petData: Partial<PetType>) {
  try {
    const pet = await Pet.findOneAndUpdate(
      { id },
      petData,
      { new: true }
    );
    if (!pet) {
      throw new Error('Pet not found');
    }
    return pet;
  } catch (error) {
    console.error('Error updating pet:', error);
    throw error;
  }
}

export async function deletePet(id: string) {
  try {
    const pet = await Pet.findOneAndDelete({ id });
    if (!pet) {
      throw new Error('Pet not found');
    }
    return pet;
  } catch (error) {
    console.error('Error deleting pet:', error);
    throw error;
  }
}

export async function searchPets(query: {
  name?: string;
  type?: string;
  breed?: string;
  sex?: string;
  size?: string;
  userId?: string;
}) {
  try {
    const filter: {
      name?: { $regex: string; $options: string };
      type?: string;
      breed?: string;
      sex?: string;
      size?: string;
      userId?: string;
    } = {};
    
    if (query.name) {
      filter.name = { $regex: query.name, $options: 'i' };
    }
    if (query.type) {
      filter.type = query.type;
    }
    if (query.breed) {
      filter.breed = query.breed;
    }
    if (query.sex) {
      filter.sex = query.sex;
    }
    if (query.size) {
      filter.size = query.size;
    }
    if (query.userId) {
      filter.userId = query.userId;
    }
    
    const pets = await Pet.find(filter);
    return pets;
  } catch (error) {
    console.error('Error searching pets:', error);
    throw error;
  }
}

export async function getPetsByUser(userId: string) {
  try {
    const pets = await Pet.find({ userId });
    return pets;
  } catch (error) {
    console.error('Error fetching user pets:', error);
    throw error;
  }
} 