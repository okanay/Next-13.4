import * as jose from 'jose'

export async function joseSignUserPayload(payload) {

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const alg = 'HS256';

    try {
        const jwt = await new jose.SignJWT(payload)
            .setProtectedHeader({alg})
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('2h')
            .sign(secret);

        return jwt;

    } catch (error) {
        return {message: error, token: undefined}
    }
}

export async function joseVerifyUserPayload(jwt) {

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);

    try {
        const {payload, protectedHeader} = await jose.jwtVerify(jwt, secret, {
            issuer: 'urn:example:issuer',
            audience: 'urn:example:audience',
        });

        return {verify: true, payload: payload}

    } catch (error) {
        return {verify: false, payload: {}}
    }
}


