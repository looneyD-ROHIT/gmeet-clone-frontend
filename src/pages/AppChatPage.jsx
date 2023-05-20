import React, { useEffect, useReducer, useState } from 'react'
import MeetWindow from "../components/ui/MeetWindow.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import { useToast } from "@chakra-ui/toast";
import socket from "../config/socketConfig.jsx";

const AppChatPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { meetcode } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const toast = useToast();
    // valid meetcode
    const [validMeetCode, setValidMeetCode] = useState(null);
    // reference to the video+audio stream
    const [localStream, setLocalStream] = useState(new MediaStream());

    // useEffect to check the meetid if its valid or not
    useEffect(() => {
        const initialMeetIdCheck = async () => {
            try {
                const response = await axiosPrivate.post('/app/check', {
                    meetcode: meetcode
                });
                console.log(response.data);
                if (!response.data.success) {
                    toast({
                        position: 'top',
                        title: 'Invalid details :(',
                        description: 'Enter valid MeetCode',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    })
                    navigate(location?.state?.from ? location.state.from : '/app');
                } else {
                    toast({
                        position: 'top',
                        title: 'Success :)',
                        description: 'Entered meet via code',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                    setValidMeetCode(response.data.message);
                }
            } catch (err) {
                console.error('initialmeetidcheck: ' + err);
                toast({
                    position: 'top',
                    title: 'Error :(',
                    description: 'Some internal error occured!!!',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                })
            }
        }
        const id = setTimeout(initialMeetIdCheck, 200);

        return () => {
            console.log('CLEANUP!!! from meetidcheck')
            clearTimeout(id);
            socket?.disconnect();
        }
    }, [])

    return (
        <>
            <MeetWindow socket={socket} />
        </>
    )
}

export default AppChatPage;