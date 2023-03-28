import React from 'react'

const RegisterPage = () => {
    return (
        <div>RegisterPage</div>
    )
}

const loadExistingLoginStatusHelper = async ({ request, params }) => {

    /**
     * TODO
     * CHECK EXISTING LOGIN STATUS, IF ANY TOKEN ALREADY EXISTS, TO PREVENT ACCESS
     * TO REGISTER ROUTE ONCE LOGGED IN
     */

    return {};
}

export const loadExistingLoginStatus = ({ request, params }) => {
    // return defer({
    //     loaderData: loadExistingLoginStatusHelper({ request, params })
    // })
    return {};
}

export default RegisterPage