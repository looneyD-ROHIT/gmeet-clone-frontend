import React, { useEffect, useCallback, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { axiosPrivate as axiosPrivateRefresher } from '../api/axios.jsx';
import { useNavigate, redirect } from 'react-router-dom';
import useRefreshToken from '../hooks/useRefreshToken';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/features/authSlice';
import { io } from "socket.io-client";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Box,
    Heading,
    Text
} from '@chakra-ui/react'
import MeetButtonGroup from "../components/ui/MeetButtonGroup.jsx";
import MeetCarousel from "../components/ui/MeetCarousel.jsx";
import MeetWindow from "../components/ui/MeetWindow.jsx";

const AppPage = () => {
    const navigate = useNavigate();
    const navigateToHome = useCallback(() => navigate('/'), [navigate]);
    const axiosPrivate = useAxiosPrivate();
    const authData = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [currentMeetId, setCurrentMeetId] = useState(null);


    // useEffect to refresh tokens even if user is sitting idle (10mins)
    // useEffect(() => {
    //     const id = setInterval(async () => {
    //         // refreshing the tokens even if user is idle for even 10mins
    //         try {
    //             // console.log('haga')
    //             const response = await axiosPrivate.get('/ping');
    //         } catch (err) {
    //             console.error('Error occured in setInterval: ' + err);
    //         }
    //     }, 10 * 60 * 1000);

    //     return () => {
    //         clearInterval(id);
    //     }
    // }, [])

    // useEffect for initial validation
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

    const createMeetHandler = async (e) => {
        e.preventDefault();
        // console.log(authData.id);
        try {

            const response = await axiosPrivate.post('/app/create', {
                id: authData.id
            })
            // console.log(response.data.message);
            setCurrentMeetId(response.data.message.length > 0 ? response.data.message : null);
            navigate(`/app/${response.data.message}`, { from: '/app' });
        } catch (err) {
            console.error('createMeet: ' + err);
        }
    }

    const joinMeetHandler = (e) => {
        e.preventDefault();
        navigate(`/app/${currentMeetId}`, { from: '/app' });
    }

    return (
        <>
            <Box background={"gray.100"}>
                {
                    <Flex mx={'10px'} align={'center'} justifyContent={'space-evenly'} direction={{
                        base: 'column',
                        lg: 'row',
                    }}>

                        <Flex w={{
                            base: '100vw',
                            lg: '40vw',
                        }} h={{
                            base: '300px',
                            lg: '90vh',
                        }} justify={'center'} align={'center'}>
                            <Card boxShadow={'xl'} size={'lg'}>
                                <CardHeader>
                                    <Heading size='md' textAlign={'center'}>Create or Join a Meeting</Heading>
                                </CardHeader>
                                <CardBody>
                                    <MeetButtonGroup
                                        onCreate={createMeetHandler}
                                        onJoin={joinMeetHandler}
                                        currentMeetId={currentMeetId}
                                        setCurrentMeetId={setCurrentMeetId}
                                    />
                                </CardBody>
                            </Card>
                        </Flex>

                        <Flex w={{
                            base: '100vw',
                            lg: '600px',
                        }} h={{
                            base: '55vh',
                            lg: '90vh'
                        }} align={'center'} justify={'center'} >
                            <Card boxShadow={'2xl'} size={'lg'}>
                                <CardHeader>
                                    <Heading size='md' textAlign={'center'}>Steps to follow!</Heading>
                                </CardHeader>
                                <CardBody>
                                    <MeetCarousel />
                                </CardBody>
                            </Card>
                        </Flex>

                    </Flex>
                }
            </Box>

        </>
    )
}

export default AppPage;
