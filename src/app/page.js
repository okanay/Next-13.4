'use client'
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {joseDecodedToken} from "@/lib/api";

export default function Home() {

    const {data : session, status} = useSession()
    const [payload, setPayload] = useState({})
    const handleVerifyJWT = async () => {

        const decoded = await joseDecodedToken(session?.user?.token)
        const {payload, verify} = decoded.decoded

        setPayload(payload)
    }

    useEffect(() => {
        handleVerifyJWT()
    }, [session])

    return (<main className={'mx-auto max-w-7xl'}>
        <p>{payload.id}</p>
        <p>{payload.accessToken}</p>
        <p>{payload.name}</p>
        <p>{payload.role}</p>
        <p>{payload.email}</p>
    </main>)
}
