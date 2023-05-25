import {joseVerifyUserPayload} from "@/lib/jwt";

export async function POST(request)
{
    const data = await request.json();
    const decoded = await joseVerifyUserPayload(data.signedToken)

    return new Response(JSON.stringify({decoded : {signedToken : data.accessToken, ...decoded}}))
}