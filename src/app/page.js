'use client'
import {useSession} from "next-auth/react";

export default function Home() {

    const {data : session, status, update} = useSession()

    return (<main className={'mx-auto max-w-7xl'}>


    </main>)
}
