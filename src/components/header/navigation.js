'use client'

import {signIn, signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {verifyJWT} from "@/lib/jwt";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export const Navigation = () => {

    const {data : session, status} = useSession()

    if ( status === "loading") return <div className={'fixed w-screen h-screen bg-white z-[999] inset-0'}><p>Loading..</p></div>
    const handleVerifyJWT = async () => {

        const body = {
            signedToken: session?.user?.signedToken || "no-token"
        }
        const result = await fetch("/api/verify", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        })

        console.log(await result.json())

    }
    const handleSign = async (event) => {
        event.preventDefault()
        const response = await signIn("credentials", {username: "jsmith", password: "1234"})
    }

    return <header>
        <nav>
            <ul className={'flex justify-center px-6 py-8 gap-8 border border-slate-200/20 rounded-b-lg shadow shadow-slate-200 items-center font-opensans'}>
                <li className={'text-bold text-lg text-slate-700 '}>
                    <div className="group relative">
                        <div
                            className="absolute -inset-0.5 rounded bg-gradient-to-r from-pink-400 via-rose-500 to-pink-500 opacity-40 blur transition-all duration-500 group-hover:opacity-75 group-hover:-inset-1"/>
                        <Link href={'/'} className="relative rounded bg-white px-4 py-1.5 text-slate-700">
                            Index
                        </Link>
                    </div>
                </li>
                <li className={'text-bold text-lg text-slate-700'}>
                    <div className="group relative">
                        <div
                            className="absolute -inset-0.5 rounded bg-gradient-to-r from-blue-400 via-sky-500 to-blue-500 opacity-40 blur transition-all duration-500 group-hover:opacity-75 group-hover:-inset-1"/>
                        <Link href={'/profile'} className="relative rounded bg-white px-4 py-1.5 text-slate-700">
                            Profile
                        </Link>
                    </div>
                </li>
                <li className={'text-bold text-lg text-slate-700'}>
                    <div className="group relative">
                        <div
                            className="absolute -inset-0.5 rounded bg-gradient-to-r from-blue-400 via-sky-500 to-blue-500 opacity-40 blur transition-all duration-500 group-hover:opacity-75 group-hover:-inset-1"/>
                        <Link href={'/login'} className="relative rounded bg-white px-4 py-1.5 text-slate-700">
                            Login
                        </Link>
                    </div>
                </li>

                : <li className={'text-bold text-lg text-slate-700'}>
                <div className="group relative">
                    <div
                        className="absolute -inset-0.5 rounded bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 opacity-40 blur transition-all duration-500 group-hover:opacity-75 group-hover:-inset-1"/>
                    <button
                        onClick={() => {handleVerifyJWT()}}
                        className="relative rounded bg-white px-4 py-1.5 text-slate-700">
                        Verify Log
                    </button>
                </div>
            </li>

                {status !== "authenticated"
                    ? <li className={'text-bold text-lg text-slate-700'}>
                    <div className="group relative">
                        <div
                            className="absolute -inset-0.5 rounded bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 opacity-40 blur transition-all duration-500 group-hover:opacity-75 group-hover:-inset-1"/>
                        <button
                            onClick={handleSign}
                            className="relative rounded bg-white px-4 py-1.5 text-slate-700">
                            Sign IN
                        </button>
                    </div>
                </li>
                    : <li className={'text-bold text-lg text-slate-700'}>
                        <div className="group relative">
                            <div
                                className="absolute -inset-0.5 rounded bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 opacity-40 blur transition-all duration-500 group-hover:opacity-75 group-hover:-inset-1"/>
                            <button
                                onClick={() => {signOut()}}
                                className="relative rounded bg-white px-4 py-1.5 text-slate-700">
                                Sign Out
                            </button>
                        </div>
                    </li>
                }
            </ul>
        </nav>
    </header>
}