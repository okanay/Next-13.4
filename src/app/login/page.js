'use client'
import {signIn} from "next-auth/react";

export default function LoginPag () {

    return <>
        <button onClick={() => {signIn("credentials")}}>
            Sign In
        </button>
    </>
}