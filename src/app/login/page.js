'use client'
import {signIn, useSession} from "next-auth/react";
import {joseDecodedToken} from "@/lib/api";
import {useState} from "react";

export default function LoginPag () {



    return <>
        <button onClick={() => {signIn("credentials")}}>
            Sign In
        </button>
    </>
}