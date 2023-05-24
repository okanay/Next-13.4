import {verifyJWT} from "@/lib/jwt";

export async function POST(request)
{
    const data = await request.json();
    const decoded = await verifyJWT(data.accessToken)

    return new Response(JSON.stringify({message : "test", data, ...decoded}))
}