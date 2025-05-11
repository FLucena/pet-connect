import { Handler } from '@netlify/functions';
import connectDB from '../../src/lib/mongodb';
import Pet from '../../src/models/Pet';

const handler: Handler = async (event) => {
  await connectDB();

  switch (event.httpMethod) {
    case 'GET':
      if (event.queryStringParameters?.id) {
        const pet = await Pet.findOne({ id: event.queryStringParameters.id });
        return {
          statusCode: 200,
          body: JSON.stringify(pet)
        };
      }
      const pets = await Pet.find({});
      return {
        statusCode: 200,
        body: JSON.stringify(pets)
      };

    case 'POST':
      const petData = JSON.parse(event.body!);
      const count = await Pet.countDocuments();
      const id = `M${String(count + 1).padStart(3, '0')}`;
      
      const newPet = new Pet({
        ...petData,
        id,
        registrationDate: new Date().toISOString(),
        lastUpdate: new Date().toISOString()
      });
      
      await newPet.save();
      return {
        statusCode: 201,
        body: JSON.stringify(newPet)
      };

    case 'PUT':
      const { id: updateId, ...updateData } = JSON.parse(event.body!);
      const updatedPet = await Pet.findOneAndUpdate(
        { id: updateId },
        { ...updateData, lastUpdate: new Date().toISOString() },
        { new: true }
      );
      return {
        statusCode: 200,
        body: JSON.stringify(updatedPet)
      };

    case 'DELETE':
      const { id: deleteId } = JSON.parse(event.body!);
      await Pet.findOneAndDelete({ id: deleteId });
      return {
        statusCode: 204
      };

    default:
      return {
        statusCode: 405,
        body: 'Method Not Allowed'
      };
  }
};

export { handler }; 