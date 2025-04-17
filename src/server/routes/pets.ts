import { Router, RequestHandler } from 'express';
import { connectToDatabase } from '../../lib/db';
import { ObjectId } from 'mongodb';

const router = Router();

// Get all pets
const getAllPets: RequestHandler = async (_req, res) => {
  try {
    const { db } = await connectToDatabase();
    const pets = await db.collection('pets').find({}).toArray();
    res.json(pets);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get pet by ID
const getPetById: RequestHandler = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const pet = await db.collection('pets').findOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (!pet) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }
    
    res.json(pet);
  } catch (error) {
    console.error('Error fetching pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create pet
const createPet: RequestHandler = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('pets').insertOne(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update pet
const updatePet: RequestHandler = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('pets').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    
    if (result.matchedCount === 0) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error updating pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete pet
const deletePet: RequestHandler = async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const result = await db.collection('pets').deleteOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Pet not found' });
      return;
    }
    
    res.json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Register routes
router.get('/', getAllPets);
router.get('/:id', getPetById);
router.post('/', createPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router; 