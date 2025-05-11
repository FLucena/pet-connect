import mongoose from 'mongoose';

export interface MockEvent {
  httpMethod: string;
  path: string;
  body?: string;
  pathParameters?: Record<string, string>;
}

export interface MockResponse {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
}

export const clearDatabase = async (): Promise<void> => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};

export const createMockEvent = (
  method: string,
  path: string,
  body?: unknown,
  pathParameters?: Record<string, string>
): MockEvent => {
  return {
    httpMethod: method,
    path,
    body: body ? JSON.stringify(body) : undefined,
    pathParameters
  };
};

export const parseResponseBody = <T = unknown>(response: MockResponse): T => {
  return JSON.parse(response.body);
};

export const mockContext = {
  awsRequestId: 'test-request-id',
  functionName: 'test-function',
  functionVersion: '$LATEST',
  invokedFunctionArn: 'test-arn',
  memoryLimitInMB: '128',
  getRemainingTimeInMillis: () => 1000,
  callbackWaitsForEmptyEventLoop: true
}; 