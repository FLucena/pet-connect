import { Handler } from '@netlify/functions';
import connectDB from '../../src/lib/mongodb';
import Shelter from '../../src/models/Shelter';
import { validateShelterData } from '../../src/utils/validation';
import { rateLimit } from '../../src/utils/rateLimit';
// import { authenticateRequest } from '../../src/utils/auth';

const handler: Handler = async (event) => {
  console.log('Received request:', {
    method: event.httpMethod,
    path: event.path,
    query: event.queryStringParameters,
    headers: event.headers
  });

  try {
    // Rate limiting
    console.log('Checking rate limit...');
    const rateLimitResult = await rateLimit(event);
    if (!rateLimitResult.success) {
      console.log('Rate limit exceeded:', rateLimitResult.message);
      return {
        statusCode: 429,
        body: JSON.stringify({ error: 'Too many requests' })
      };
    }
    console.log('Rate limit check passed');

    // Authentication check for non-GET requests
    // TEMPORARILY DISABLED FOR LOCAL DEVELOPMENT
    // if (event.httpMethod !== 'GET') {
    //   console.log('Checking authentication...');
    //   const authResult = await authenticateRequest(event);
    //   if (!authResult.success) {
    //     console.log('Authentication failed:', authResult.message);
    //     return {
    //       statusCode: 401,
    //       body: JSON.stringify({ error: 'Unauthorized' })
    //     };
    //   }
    //   console.log('Authentication successful');
    // }

    // Connect to database
    console.log('Connecting to database...');
    try {
      await connectDB();
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection error:', error);
      return {
        statusCode: 503,
        body: JSON.stringify({ error: 'Service unavailable' })
      };
    }

    switch (event.httpMethod) {
      case 'GET': {
        console.log('Processing GET request...');
        if (event.queryStringParameters?.id) {
          console.log('Fetching single shelter:', event.queryStringParameters.id);
          const shelter = await Shelter.findOne({ id: event.queryStringParameters.id });
          if (!shelter) {
            console.log('Shelter not found:', event.queryStringParameters.id);
            return {
              statusCode: 404,
              body: JSON.stringify({ error: 'Shelter not found' })
            };
          }
          console.log('Shelter found:', shelter.id);
          return {
            statusCode: 200,
            body: JSON.stringify(shelter)
          };
        }
        console.log('Fetching all shelters...');
        const shelters = await Shelter.find({});
        console.log(`Found ${shelters.length} shelters`);
        return {
          statusCode: 200,
          body: JSON.stringify(shelters)
        };
      }

      case 'POST': {
        console.log('Processing POST request...');
        const shelterData = JSON.parse(event.body!);
        console.log('Received shelter data:', shelterData);
        
        // Validate input data
        console.log('Validating shelter data...');
        const validationResult = validateShelterData(shelterData);
        if (!validationResult.success) {
          console.log('Validation failed:', validationResult.errors);
          return {
            statusCode: 400,
            body: JSON.stringify({ 
              error: 'Validation failed',
              details: validationResult.errors
            })
          };
        }
        console.log('Validation successful');

        const count = await Shelter.countDocuments();
        const id = `S${String(count + 1).padStart(3, '0')}`;
        console.log('Generated shelter ID:', id);
        
        const newShelter = new Shelter({
          ...shelterData,
          id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
        
        console.log('Saving new shelter...');
        await newShelter.save();
        console.log('Shelter saved successfully:', id);
        
        return {
          statusCode: 201,
          body: JSON.stringify(newShelter)
        };
      }

      case 'PUT': {
        console.log('Processing PUT request...');
        const { id: updateId, ...updateData } = JSON.parse(event.body!);
        console.log('Updating shelter:', updateId);
        
        // Validate input data
        console.log('Validating update data...');
        const validationResult = validateShelterData(updateData);
        if (!validationResult.success) {
          console.log('Validation failed:', validationResult.errors);
          return {
            statusCode: 400,
            body: JSON.stringify({ 
              error: 'Validation failed',
              details: validationResult.errors
            })
          };
        }
        console.log('Validation successful');

        const updatedShelter = await Shelter.findOneAndUpdate(
          { id: updateId },
          { ...updateData, updatedAt: new Date().toISOString() },
          { new: true }
        );

        if (!updatedShelter) {
          console.log('Shelter not found for update:', updateId);
          return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Shelter not found' })
          };
        }

        console.log('Shelter updated successfully:', updateId);
        return {
          statusCode: 200,
          body: JSON.stringify(updatedShelter)
        };
      }

      case 'DELETE': {
        console.log('Processing DELETE request...');
        const { id: deleteId } = JSON.parse(event.body!);
        console.log('Deleting shelter:', deleteId);
        
        const deletedShelter = await Shelter.findOneAndDelete({ id: deleteId });
        
        if (!deletedShelter) {
          console.log('Shelter not found for deletion:', deleteId);
          return {
            statusCode: 404,
            body: JSON.stringify({ error: 'Shelter not found' })
          };
        }

        console.log('Shelter deleted successfully:', deleteId);
        return {
          statusCode: 204
        };
      }

      default:
        console.log('Method not allowed:', event.httpMethod);
        return {
          statusCode: 405,
          body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }
  } catch (error) {
    console.error('Error in shelters function:', error);
    
    // Handle specific error types
    if (error instanceof SyntaxError) {
      console.log('Invalid JSON in request body');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON' })
      };
    }

    if (error instanceof Error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: 'Internal Server Error',
          details: error.message
        })
      };
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unknown error occurred' })
    };
  }
};

export { handler }; 