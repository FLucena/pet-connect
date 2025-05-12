import { HandlerEvent } from '@netlify/functions';

interface RateLimitResult {
  success: boolean;
  message?: string;
}

// Simple in-memory store for rate limiting
// In production, you should use Redis or a similar solution
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

export const rateLimit = async (event: HandlerEvent): Promise<RateLimitResult> => {
  const ip = event.headers['client-ip'] || 'unknown';
  const now = Date.now();
  
  const record = rateLimitStore.get(ip);
  
  if (!record) {
    // First request from this IP
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS
    });
    return { success: true };
  }

  if (now > record.resetTime) {
    // Reset window
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS
    });
    return { success: true };
  }

  if (record.count >= MAX_REQUESTS) {
    return {
      success: false,
      message: `Rate limit exceeded. Try again in ${Math.ceil((record.resetTime - now) / 1000)} seconds.`
    };
  }

  // Increment counter
  record.count++;
  rateLimitStore.set(ip, record);
  
  return { success: true };
}; 