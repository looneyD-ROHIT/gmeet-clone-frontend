import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useEffect, useRef, useState, useReducer, useCallback } from "react";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff } from "react-icons/md";
import VideoPlayer from './VideoPlayer';
import socket from '../../config/socketConfig'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { streamActions } from "../../store/features/streamSlice";
import peer from "../../config/peerjsConfig";
import { participantsActions } from "../../store/features/participantsSlice";

const VideoChatPanel = (props) => {
    const params = useParams();
    const dispatch = useDispatch();

    const localStreamRef = useRef();
    const localStreamParentRef = useRef();
    const remoteVideoParentRef = useRef();
    // const [localStream, setLocalStream] = useState(null);

    // streaming work

    const streamData = useSelector(state => state.stream);
    console.log(streamData);
    const localStream = streamData.stream;
    const micStatus = streamData.preferences.audio;
    const camStatus = streamData.preferences.video;


    const [localStreamWidth, setLocalStreamWidth] = useState(1.7777777777777777);
    const [localStreamHeight, setLocalStreamHeight] = useState(1);
    const [defaultVideoOptions, setDefaultVideoOptions] = useState({
        video: {
            aspectRatio: localStreamWidth / localStreamHeight,
        },
        audio: true
    })
    const [joinStatus, setJoinStatus] = useState(false);


    // participants work
    const members = useSelector(state => state.participants.members);
    console.log(members);





    const micOnOffHandler = (e) => {
        e.preventDefault();
        // setMicStatus(prev => !prev);
        dispatch(streamActions.toggleAudioPreferences({}));
    }
    const camOnOffHandler = (e) => {
        e.preventDefault();
        // setCamStatus(prev => !prev);
        dispatch(streamActions.toggleVideoPreferences({}));
    }

    const joinStatusHandler = (e) => {
        setJoinStatus(true);
    }

    // listen to changes in resize
    useEffect(() => {
        localStreamParentRef.current.style.position = 'relative';
        const resizeObserver = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            // console.log("Resized:", width, height);
            // do something on resize
            setLocalStreamWidth(width);
            setLocalStreamHeight(height);
        });

        resizeObserver?.observe(localStreamParentRef.current);

        return () => {
            resizeObserver?.disconnect(localStreamParentRef.current);
        };

    }, []);

    // set preferences by listening to changes in mic/cam status
    useEffect(() => {
        setDefaultVideoOptions({
            video: camStatus ?
                { aspectRatio: parseFloat(localStreamWidth / localStreamHeight).toFixed(6) }
                : false,
            audio: micStatus,
        })

        return () => {
            console.log('CLEANUP!!! from mic/cam listening changes');
        }
    }, [micStatus, camStatus, localStreamWidth, localStreamHeight])

    const updateCall = useCallback(() => {
        members.forEach(member => {
            const peerId = member.peerId;
            const call = localStream && peer.call(peerId, localStream);
            call?.on("stream", (userVideoStream) => {
                console.log(localStream);
                console.log(userVideoStream);
                dispatch(participantsActions.updateParticipant({
                    peerId,
                    meetcode: params.meetcode,
                    stream: userVideoStream,
                    audioStatus: userVideoStream.getAudioTracks().length > 0 ? true : false,
                    videoStatus: userVideoStream.getVideoTracks().length > 0 ? true : false,
                }))
            });
        })
    }, [peer, localStream])

    // remove mic/cam tracks when not in use to improve performance
    useEffect(() => {
        updateCall();

        if (!camStatus) {
            // console.log('cam disabled');
            // console.log(localStream?.getVideoTracks());
            localStream?.getVideoTracks()?.forEach(track => track.stop());
        }
        if (!micStatus) {
            // console.log('mic disabled');
            // console.log(localStream?.getAudioTracks());
            localStream?.getAudioTracks()?.forEach(track => track.stop());
        }
    }, [micStatus, camStatus, updateCall]);

    // get the stream with a custom aspect ratio
    useEffect(() => {

        const getStream = async () => {
            if (!micStatus && !camStatus) {
                // return setLocalStream(null);
                return dispatch(streamActions.changeStreamData({ stream: null }));
            }

            // get the stream
            const localMediaStream = await navigator.mediaDevices.getUserMedia(defaultVideoOptions);
            // video.src = URL.createObjectURL(mediaStream);
            // console.log(localMediaStream);
            // setLocalStream(localMediaStream);
            dispatch(streamActions.changeStreamData({ stream: localMediaStream }));
        }
        const id = setTimeout(getStream, 0);
        return () => {
            console.log('CLEANUP!!! from getStream');
            // setLocalStream(null);
            clearTimeout(id);
            dispatch(streamActions.changeStreamData({ stream: null }));
        }
    }, [defaultVideoOptions, defaultVideoOptions.video, defaultVideoOptions.audio]);

    // set the stream to user
    useEffect(() => {
        if (localStream && localStreamRef.current) {
            localStreamRef.current.srcObject = localStream;
            localStreamRef.current.style.transform = 'scaleX(-1)';
        }
        return () => {
            console.log('CLEANUP!!! from setStream');
            localStream?.getTracks()?.forEach(track => track.stop());
        }
    }, [localStream]);

    // useEffect(() => {
    //     // console.log('localStream not activated');
    //     if (localStream != null && joinStatus) {
    //         // console.log('localStream activated');
    //         socket.connect();
    //     }

    //     return () => {
    //         // socket?.disconnect();
    //     }
    // }, [localStream, joinStatus])

    // peer connection open handler
    const handlePeerConnectionOpen = useCallback((myid) => {
        console.log('my peer-id is: ' + myid);
        socket.emit('join-meet', params.meetcode, myid);
    }, [])

    // peer connection call handler
    const handlePeerConnectionCall = useCallback((call) => {
        console.log('someone calling me');
        // console.log(call.peer);
        call.answer(localStream);
        call.on("stream", (userVideoStream) => {
            console.log('(new user) peer on call --> receiving');
            dispatch(participantsActions.updateParticipant({
                peerId: call.peer,
                meetcode: params.meetcode,
                stream: userVideoStream,
                audioStatus: userVideoStream.getAudioTracks().length > 0 ? true : false,
                videoStatus: userVideoStream.getVideoTracks().length > 0 ? true : false,
            }))
            console.log(localStream);
            console.log(userVideoStream);
        });
    }, [localStream])



    // peerjs connection setup
    useEffect(() => {
        // socket connect
        socket.connect();

        // connection opening
        peer.on('open', handlePeerConnectionOpen);

        // on receiving call
        peer.on("call", handlePeerConnectionCall);

        return () => {
            console.log('CLEANUP!!! from peerjs connection');
            peer?.off('open', handlePeerConnectionOpen);
            peer?.off("call", handlePeerConnectionCall);
        }
    }, [handlePeerConnectionOpen, handlePeerConnectionCall])

    // socket connect handler
    const handleSocketConnect = useCallback(() => {
        console.log('connected');
    }, [])

    // joined meet handler
    const handleJoinedMeet = useCallback((peerId) => {
        console.log("joined-meet: ", peerId);
        console.log('adding new member to state');
        console.log('added new member to state');
        console.log('myseld: ' + peer._id);
        console.log('I\'m calling : ' + peerId);
        const call = localStream && peer.call(peerId, localStream);
        call?.on("stream", (userVideoStream) => {
            console.log('(old user) on calling --> streaming');
            console.log(localStream);
            console.log(userVideoStream);
            dispatch(participantsActions.updateParticipant({
                peerId,
                meetcode: params.meetcode,
                stream: userVideoStream,
                audioStatus: userVideoStream.getAudioTracks().length > 0 ? true : false,
                videoStatus: userVideoStream.getVideoTracks().length > 0 ? true : false,
            }))
        });
    }, [peer, localStream]);



    // useEffect to set up socket connection
    useEffect(() => {

        socket.on('connect', handleSocketConnect);

        socket.on('joined-meet', handleJoinedMeet);

        // when i join as a user, i fetch the user list and call them
        socket.on('get-users', (meetUsersList) => {
            console.log(meetUsersList);
            console.log(peer._id);
            const filteredList = meetUsersList.filter(id => id != peer._id).map(id => {
                return {
                    peerId: id,
                    meetcode: params.meetcode,
                    audioStatus: false,
                    videoStatus: true,
                }
            });
            dispatch(participantsActions.addParticipants({ filteredList }));
        })

        socket.on('message', (data) => {
            console.log(data);
        })


        // on some other user disconnect, remove that user
        socket.on('user-disconnected', (peerId) => {
            console.log('user-disconnected: ', peerId);
            dispatch(participantsActions.removeParticipant({
                peerId,
            }))
        })



        return () => {
            console.log('CLEANUP!!! from socket connnect')
            // peer.disconnect();
            socket?.off('connect', handleSocketConnect);

            socket?.off('joined-meet', handleJoinedMeet);
        }
    }, [handleSocketConnect, handleJoinedMeet]);



    return (
        <Box>
            <Flex
                w={{
                    base: '450px',
                    md: '75vw'
                }}
                h={{
                    base: '400px',
                    md: '65vh'
                }}
                border={'2px'}
                borderRadius={'md'}
                borderColor='gray.400'
                background={'blackAlpha.400'}
                direction={'column'}
                alignItems={'center'}
            >
                <Flex direction={'row'} w={'full'}>

                    <Flex
                        w={{
                            base: 'full',
                            md: '60vw'
                        }}
                        h={{
                            base: '250px',
                            md: '50vh'
                        }}
                        justifyContent={'space-around'}
                        border={'1px'}
                        boxShadow="inset 0px 0px 50px rgba(0, 0, 0, 0.5)"
                        ref={localStreamParentRef}
                    >
                        <video
                            ref={localStreamRef} autoPlay={true} muted={true} >
                        </video>
                        <button
                            style={{
                                position: 'absolute',
                                zIndex: 100,
                                bottom: '2%',
                                left: '40%',
                                background: "white",
                                borderRadius: '30%',
                            }}
                            onClick={micOnOffHandler}
                        >
                            {
                                micStatus ? <MdMic size={30} /> : <MdMicOff size={30} />
                            }
                        </button>
                        <button
                            style={{
                                position: 'absolute',
                                zIndex: 100,
                                bottom: '2%',
                                left: '60%',
                                background: "white",
                                borderRadius: '30%',
                            }}
                            onClick={camOnOffHandler}
                        >
                            {
                                camStatus ? <MdVideocam size={30} /> : <MdVideocamOff size={30} />
                            }
                        </button>


                    </Flex>
                    <Box
                        display={{
                            base: 'none',
                            md: 'flex'
                        }}
                        w={{
                            md: '15vw'
                        }}
                        h={{
                            base: '250px',
                            md: '50vh'
                        }}
                        border={'1px'}>
                // extra options
                    </Box>
                </Flex>


                <Flex
                    p='2px'
                    direction='col'
                    h={'full'}
                    gap={'10px'}
                    ref={remoteVideoParentRef}
                >
                    {
                        members.length > 0 ?
                            members && members.map(member => {
                                return (
                                    <VideoPlayer parent={remoteVideoParentRef} key={member.peerId} stream={member.stream} audioStatus={member.audioStatus} videoStatus={member.videoStatus} />
                                )
                            })
                            :
                            <p>No users to display</p>
                    }
                </Flex>
            </Flex>
            <Button onClick={joinStatusHandler}>JOIN CALL</Button>
        </Box>
    )
}

export default VideoChatPanel;