import { Handler } from '@netlify/functions';
import connectDB from '../../src/lib/mongodb';
import Sponsor from '../../src/models/Sponsor';

const handler: Handler = async (event) => {
  await connectDB();

  switch (event.httpMethod) {
    case 'GET': {
      if (event.queryStringParameters?.id) {
        const sponsor = await Sponsor.findOne({ id: event.queryStringParameters.id });
        return {
          statusCode: 200,
          body: JSON.stringify(sponsor)
        };
      }
      const sponsors = await Sponsor.find({});
      return {
        statusCode: 200,
        body: JSON.stringify(sponsors)
      };
    }

    case 'POST': {
      const sponsorData = JSON.parse(event.body!);
      const count = await Sponsor.countDocuments();
      const id = `S${String(count + 1).padStart(3, '0')}`;
      
      const newSponsor = new Sponsor({
        ...sponsorData,
        id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      await newSponsor.save();
      return {
        statusCode: 201,
        body: JSON.stringify(newSponsor)
      };
    }

    case 'PUT': {
      const { id: updateId, ...updateData } = JSON.parse(event.body!);
      const updatedSponsor = await Sponsor.findOneAndUpdate(
        { id: updateId },
        { ...updateData, updatedAt: new Date().toISOString() },
        { new: true }
      );
      return {
        statusCode: 200,
        body: JSON.stringify(updatedSponsor)
      };
    }

    case 'DELETE': {
      const { id: deleteId } = JSON.parse(event.body!);
      await Sponsor.findOneAndDelete({ id: deleteId });
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