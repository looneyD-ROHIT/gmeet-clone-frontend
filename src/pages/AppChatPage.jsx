import React, { useEffect, useReducer, useState } from 'react'
import MeetWindow from "../components/ui/MeetWindow.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import { useToast } from "@chakra-ui/toast";
import socket from "../config/socketConfig.jsx";
import Peer from 'peerjs';

// const initialPeersState = {}
// const peersReducer = (state, action) => {
//     // console.log(state, action);
//     switch (action.type) {
//         case 'ADD':
//             // console.log("ADD");
//             return {
//                 ...state,
//                 [action.payload.peerId]: {
//                     stream: action.payload.stream
//                 }
//             }
//         case 'REMOVE':
//             // console.log("REMOVE");
//             const { [action.payload.peerId]: deleted, ...rest } = state;
//             return { ...rest };
//         default:
//             return initialState;
//     }
// }

const AppChatPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { meetcode } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const toast = useToast();
    // valid meetcode
    const [validMeetCode, setValidMeetCode] = useState(null);
    // reference to list of peers connected
    const [usersList, setUsersList] = useState([]);
    // reference to peers streams
    // const [peersStream, setPeersStream] = useState({});
    // const [peersStream, dispatchPeersStream] = useReducer(peersReducer, initialPeersState);
    // reference to the video+audio stream
    const [localStream, setLocalStream] = useState(new MediaStream());
    // reference to current peer
    const [me, setMe] = useState(null);

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
                    // console.log(socket);
                    // setValidMeetCode(meetcode);
                    // socket.connect();
                    // // after verifying that the meet id is valid, join the socket and join the meet room
                    // socket.on('connect', () => {
                    //     console.log('connected: ', socket.id);
                    //     const peer = new Peer(socket.id, {
                    //         host: 'localhost',
                    //         port: '1337',
                    //         path: 'meetclone'
                    //     });
                    //     console.log(peer);
                    //     setMe(peer);
                    // })

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
        const id = setTimeout(initialMeetIdCheck, 0);

        return () => {
            console.log('CLEANUP!!! from meetidcheck')
            clearTimeout(id);
            socket?.disconnect();
            // me?.disconnect();
        }
    }, [])

    // useEffect(() => {

    //     socket.on('message', (data) => {
    //         console.log(data);
    //     })
    //     socket.on('joined-meet', (peerId) => {
    //         console.log("joined-meet: ", peerId);
    //         const call = localStream && me?.call(peerId, localStream);
    //         call.on("stream", (userVideoStream) => {
    //             dispatchPeersStream({
    //                 type: 'ADD', payload: {
    //                     peerId: peerId,
    //                     stream: userVideoStream
    //                 }
    //             })
    //         });
    //     })

    //     // when i join as a user, i fetch the user list and call them
    //     socket.on('get-users', (meetUsersList) => {
    //         console.log(meetUsersList);
    //         // const filteredList = meetUsersList.filter(id => id != socket.id);
    //         // console.log(filteredList);
    //         // setUsersList(filteredList);
    //         // filteredList.map(peerId => {
    //         //     const call = localStream && me.call(peerId, localStream);
    //         //     console.log(call);
    //         //     call.on("stream", (userVideoStream) => {
    //         //         console.log(userVideoStream);
    //         //         dispatchPeersStream({
    //         //             type: 'ADD', payload: {
    //         //                 peerId: peerId,
    //         //                 stream: userVideoStream
    //         //             }
    //         //         })
    //         //     });
    //         // })
    //     })

    //     // on some other user disconnect, remove that user
    //     socket.on('user-disconnected', (peerId) => {
    //         console.log('user-disconnected: ', peerId);
    //         // dispatchPeersStream({
    //         //     type: 'REMOVE', payload: {
    //         //         peerId: peerId
    //         //     }
    //         // })
    //     })
    // }, [])



    // useEffect to change on changes to stream and on response to call
    // useEffect(() => {
    //     if (!me || !localStream || !localStream.active || !validMeetCode) return;

    //     // me.on("open", () => {
    //     //     console.log('joining meet')
    //     //     socket.emit('join-meet', validMeetCode, me._id);
    //     //     console.log('joined meet')
    //     // });

    //     // as and when a new user joins meet, they are called
    //     socket.on('joined-meet', (peerId) => {
    //         console.log("joined-meet: ", peerId);
    //         const call = localStream && me?.call(peerId, localStream);
    //         call.on("stream", (userVideoStream) => {
    //             // dispatch(addPeerAction(peerId, userVideoStream));
    //             dispatchPeersStream({
    //                 type: 'ADD', payload: {
    //                     peerId: peerId,
    //                     stream: userVideoStream
    //                 }
    //             })
    //         });
    //     })

    //     // when i join as a user, i fetch the user list and call them
    //     socket.on('get-users', (meetUsersList) => {
    //         console.log(meetUsersList);
    //         const filteredList = meetUsersList.filter(id => id != socket.id);
    //         console.log(filteredList);
    //         setUsersList(filteredList);
    //         filteredList.map(peerId => {
    //             const call = localStream && me.call(peerId, localStream);
    //             console.log(call);
    //             call.on("stream", (userVideoStream) => {
    //                 console.log(userVideoStream);
    //                 dispatchPeersStream({
    //                     type: 'ADD', payload: {
    //                         peerId: peerId,
    //                         stream: userVideoStream
    //                     }
    //                 })
    //             });
    //         })
    //     })

    //     // on some other user disconnect, remove that user
    //     socket.on('user-disconnected', (peerId) => {
    //         console.log('user-disconnected: ', peerId);
    //         dispatchPeersStream({
    //             type: 'REMOVE', payload: {
    //                 peerId: peerId
    //             }
    //         })
    //     })

    //     me.on("call", (call) => {
    //         console.log(call);
    //         console.log(localStream);
    //         call.answer(localStream);
    //         call.on("stream", (userVideoStream) => {
    //             console.log(userVideoStream);
    //             dispatchPeersStream({
    //                 type: 'ADD', payload: {
    //                     peerId: call['peer'],
    //                     stream: userVideoStream
    //                 }
    //             })
    //         });
    //     });







    //     // return () => {
    //     //     me.disconnect();
    //     // }
    // }, [me, localStream, validMeetCode]);
    // useEffect(() => {
    //     console.log(peersStream)
    // }, [peersStream])
    return (
        <>
            <MeetWindow socket={socket} />
        </>
    )
}

export default AppChatPage;