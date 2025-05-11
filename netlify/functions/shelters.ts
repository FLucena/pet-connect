import { Handler } from '@netlify/functions';
import connectDB from '../../src/lib/mongodb';
import Shelter from '../../src/models/Shelter';

const handler: Handler = async (event) => {
  try {
    await connectDB();

    switch (event.httpMethod) {
      case 'GET': {
        if (event.queryStringParameters?.id) {
          const shelter = await Shelter.findOne({ id: event.queryStringParameters.id });
          return {
            statusCode: 200,
            body: JSON.stringify(shelter)
          };
        }
        const shelters = await Shelter.find({});
        return {
          statusCode: 200,
          body: JSON.stringify(shelters)
        };
      }

      case 'POST': {
        const shelterData = JSON.parse(event.body!);
        const count = await Shelter.countDocuments();
        const id = `S${String(count + 1).padStart(3, '0')}`;
        
        const newShelter = new Shelter({
          ...shelterData,
          id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        
        await newShelter.save();
        return {
          statusCode: 201,
          body: JSON.stringify(newShelter)
        };
      }

      case 'PUT': {
        const { id: updateId, ...updateData } = JSON.parse(event.body!);
        const updatedShelter = await Shelter.findOneAndUpdate(
          { id: updateId },
          { ...updateData, updatedAt: new Date().toISOString() },
          { new: true }
        );
        return {
          statusCode: 200,
          body: JSON.stringify(updatedShelter)
        };
      }

      case 'DELETE': {
        const { id: deleteId } = JSON.parse(event.body!);
        await Shelter.findOneAndDelete({ id: deleteId });
        return {
          statusCode: 204
        };
      }

      default:
        return {
          statusCode: 405,
          body: 'Method Not Allowed'
        };
    }
  } catch (error) {
    console.error('Error in shelters function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};

export { handler }; 