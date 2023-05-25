import {NextResponse} from 'next/server';
import {getToken} from "next-auth/jwt";
import {joseVerifyUserPayload} from "@/lib/jwt";

export async function middleware(request) {

    const secret = process.env.NEXTAUTH_SECRET
    const session = await getToken({req: request, secret: secret});

    let user = {}
    if (session !== undefined)  user = await joseVerifyUserPayload(session?.token)


    if (user.verify === false && !request.url.includes("/login"))
    {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    else if (user.verify === true && request.url.includes("/login")) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }

}

export const config = {
    matcher: ['/profile/:path*', '/login/:path*'],
};
