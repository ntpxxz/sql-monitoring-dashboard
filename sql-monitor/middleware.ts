import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    try {
        // Continue to the next middleware/route handler
        return NextResponse.next();
    } catch (error) {
        console.error('Database connection error:', error);
        return new NextResponse(
            JSON.stringify({ 
                error: 'Internal Server Error',
                message: 'Database connection failed' 
            }),
            { 
                status: 500,
                headers: { 'content-type': 'application/json' }
            }
        );
    }
}

export const config = {
    matcher: '/api/:path*'
};