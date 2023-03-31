import React, { useEffect, useCallback } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { axiosPrivate as axiosPrivateRefresher } from '../api/axios';
import { useNavigate, redirect } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/features/authSlice';
import {Flex, Box} from '@chakra-ui/react';
import MeetButtonGroup from "../components/ui/MeetButtonGroup.jsx";

const AppPage = () => {
    const navigate = useNavigate();
    const navigateToHome = useCallback(() => navigate('/'), [navigate]);
    const axiosPrivate = useAxiosPrivate();
    const authData = useSelector(state => state.auth);
    const dispatch = useDispatch();

    // useEffect to refresh tokens even if user is sitting idle (10mins)
    useEffect(() => {
        const id = setInterval(async () => {
            // refreshing the tokens even if user is idle for even 10mins
            try {
                console.log('haga')
                const response = await axiosPrivate.get('/ping');
            } catch (err) {
                console.error('Error occured in setInterval: ' + err);
            }
        }, 10  * 60 * 1000);

        return () => {
            clearInterval(id);
        }
    }, [])

    useEffect(() => {
        const initialValidation = async () => {
            try {
                const response = await axiosPrivate.get('/ping');
            } catch (err) {
                console.error('Error occured in initialValidation: ' + err);
            }
        }
        // initialValidation();
        const id = setTimeout(initialValidation, 0);

        return () => {
            clearTimeout(id);
        }
    }, [])

    // const clickHandler = useCallback(async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axiosPrivateRefresher.post('/app');
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }, []);

    return (
        <>
            <Flex mx={'10px'} align={'center'} justifyContent={'space-between'}>
                <Flex w={'40vw'} h={'90vh'} align={'center'}>
                    <MeetButtonGroup/>
                </Flex>
                <Flex w={'50vw'} align={'center'} justify={'center'} >Meet/Carousel Area</Flex>
            </Flex>
        </>
    )
}

export default AppPage;
