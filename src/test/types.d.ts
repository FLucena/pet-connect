export {};

interface MockEvent {
  httpMethod: string;
  path: string;
  body?: string;
  pathParameters?: Record<string, string>;
}

interface MockResponse {
  statusCode: number;
  body: string;
  headers?: Record<string, string>;
}

interface MockContext {
  awsRequestId: string;
  functionName: string;
  functionVersion: string;
  invokedFunctionArn: string;
  memoryLimitInMB: string;
  getRemainingTimeInMillis: () => number;
  callbackWaitsForEmptyEventLoop: boolean;
}

declare global {
  namespace NodeJS {
    interface Global {
      clearDatabase: () => Promise<void>;
      createMockEvent: (method: string, path: string, body?: string, pathParameters?: Record<string, string>) => MockEvent;
      parseResponseBody: (response: MockResponse) => unknown;
    }
  }
} 