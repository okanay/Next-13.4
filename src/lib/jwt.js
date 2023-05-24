import jwt from "jsonwebtoken"

export function signJwtAccessToken(payload, options)
{
    const secret_key = process.env.SECRET_KEY;
    return jwt.sign(payload, secret_key , options)

}

export async function verifyJWT(token)
{
    try
    {
        console.log('try')
        const secret_key = process.env.SECRET_KEY;
        return jwt.verify(token, secret_key)
    }
    catch (error)
    {
        console.log(error)
        return null
    }
}
