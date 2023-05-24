import {NextResponse} from 'next/server';
import {getToken} from "next-auth/jwt";

export async function middleware(request) {

    const secret = process.env.NEXTAUTH_SECRET
    const session = await getToken({req: request, secret: secret});

    if (session === null && !request.url.includes("/login"))
    {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    else if (session !== null && request.url.includes("/login"))
    {
        return NextResponse.redirect(new URL('/profile', request.url));
    }
}

export const config = {
    matcher: ['/profile/:path*', '/login/:path*'],
};
