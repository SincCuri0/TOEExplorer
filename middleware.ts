import { NextRequest, NextResponse } from 'next/server'

// Simple middleware to handle basic path protection 
// and redirect to login if needed
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Don't protect API routes, they have their own auth
  if (pathname.startsWith('/api/')) {
    // Add CORS headers for API routes
    const response = NextResponse.next()
    
    // Add headers to API responses
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    return response
  }
  
  // Auth is handled in profile layout, this is just a safety fallback
  return NextResponse.next()
}

// Only run middleware on these routes
export const config = {
  matcher: [
    '/profile/:path*',
    '/api/:path*',
  ]
} 