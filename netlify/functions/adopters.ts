import { Handler } from '@netlify/functions';
import connectDB from '../../src/lib/mongodb';
import Adopter from '../../src/models/Adopter';

const handler: Handler = async (event) => {
  await connectDB();

  switch (event.httpMethod) {
    case 'GET': {
      if (event.queryStringParameters?.id) {
        const adopter = await Adopter.findOne({ id: event.queryStringParameters.id });
        return {
          statusCode: 200,
          body: JSON.stringify(adopter)
        };
      }
      const adopters = await Adopter.find({});
      return {
        statusCode: 200,
        body: JSON.stringify(adopters)
      };
    }

    case 'POST': {
      const adopterData = JSON.parse(event.body!);
      const count = await Adopter.countDocuments();
      const id = `A${String(count + 1).padStart(3, '0')}`;
      
      const newAdopter = new Adopter({
        ...adopterData,
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      await newAdopter.save();
      return {
        statusCode: 201,
        body: JSON.stringify(newAdopter)
      };
    }

    case 'PUT': {
      const { id: updateId, ...updateData } = JSON.parse(event.body!);
      const updatedAdopter = await Adopter.findOneAndUpdate(
        { id: updateId },
        { ...updateData, updatedAt: new Date().toISOString() },
        { new: true }
      );
      return {
        statusCode: 200,
        body: JSON.stringify(updatedAdopter)
      };
    }

    case 'DELETE': {
      const { id: deleteId } = JSON.parse(event.body!);
      await Adopter.findOneAndDelete({ id: deleteId });
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
};

export { handler }; 