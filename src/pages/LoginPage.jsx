import React, { Suspense } from 'react'
import { useLoaderData, Await } from 'react-router-dom'
import LoginCard from '../components/cards/LoginCard'

const LoginPage = () => {
    return (
        <LoginCard />
    )
}

export default LoginPage