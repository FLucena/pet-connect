import { Request as NodeFetchRequest } from 'node-fetch';
import Adopter from '../models/Adopter';

type Request = NodeFetchRequest | globalThis.Request;

function getQueryParams(request: Request): URLSearchParams {
  if (request instanceof NodeFetchRequest) {
    return new URLSearchParams(request.url.split('?')[1] || '');
  }
  return new URL(request.url).searchParams;
}

export async function GET(request: Request) {
  const params = getQueryParams(request);
  const id = params.get('id');
  
  if (id) {
    try {
      const adopter = await Adopter.findOne({ id });
      if (!adopter) {
        return new Response(null, { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      return new Response(JSON.stringify(adopter), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid ID format' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  const adopters = await Adopter.find({});
  return new Response(JSON.stringify(adopters), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request: Request) {
  try {
    const adopterData = await request.json();
    const adopter = await Adopter.create(adopterData);
    return new Response(JSON.stringify(adopter), { 
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Failed to create adopter' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function PUT(request: Request) {
  const params = getQueryParams(request);
  const id = params.get('id');
  const updateData = await request.json();
  
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID is required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const adopter = await Adopter.findOneAndUpdate(
      { id },
      updateData,
      { new: true }
    );
    
    if (!adopter) {
      return new Response(null, { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify(adopter), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid ID format' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function DELETE(request: Request) {
  const params = getQueryParams(request);
  const id = params.get('id');
  
  if (!id) {
    return new Response(JSON.stringify({ error: 'ID is required' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  try {
    const result = await Adopter.findOneAndDelete({ id });
    if (!result) {
      return new Response(null, { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(null, { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid ID format' }), { 
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 