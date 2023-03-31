import React, { Suspense } from 'react';
import RegisterCard from '../components/cards/RegisterCard';
import { useLoaderData, defer, Await } from 'react-router-dom';

const RegisterPage = () => {
    // const { loaderData } = useLoaderData();
    // const loaderData = useLoaderData();

    return (
        <div><RegisterCard /></div>
    )
}

export default RegisterPage;