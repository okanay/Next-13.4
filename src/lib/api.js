export const joseDecodedToken = async (signedToken) => {

    const body = {
        signedToken: signedToken || "no-token"
    }

    return await fetch("api/verify", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        }
    }).then(data => data.json()).catch(error => {return error})

}