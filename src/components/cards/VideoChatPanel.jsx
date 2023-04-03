import {Box, Flex} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import {MdMic, MdMicOff, MdVideocam, MdVideocamOff} from "react-icons/md";

const VideoChatPanel = () => {
    const localStreamRef = useRef();
    const localStreamParentRef = useRef();
    const [localStream, setLocalStream] = useState(new MediaStream());
    const [localStreamWidth, setLocalStreamWidth] = useState(1.7777777777777777);
    const [localStreamHeight, setLocalStreamHeight] = useState(1);
    const [defaultVideoOptions, setDefaultVideoOptions] = useState({
        video: {
            aspectRatio: localStreamWidth / localStreamHeight,
        },
        audio: true
    })
    const [micStatus, setMicStatus] = useState(true);
    const [camStatus, setCamStatus] = useState(true);
    const micOnOffHandler = (e) => {
        e.preventDefault();
        setMicStatus(prev => !prev);
    }
    const camOnOffHandler = (e) => {
        e.preventDefault();
        setCamStatus(prev => !prev);
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

    // listen to changes in mic/cam status
    useEffect(()=>{
        setDefaultVideoOptions({
            video: camStatus ?
                { aspectRatio: parseFloat(localStreamWidth / localStreamHeight).toFixed(6) }
                : false,
            audio: micStatus,
        })

        return () => {
            console.log('CLEANUP!!! from mic/cam listening changes');
            if(!camStatus){
                localStream.getVideoTracks()?.forEach(track => track.stop());
            }
            if(!micStatus){
                localStream.getAudioTracks()?.forEach(track => track.stop());
            }
        }
    }, [micStatus, camStatus, localStreamWidth, localStreamHeight])

    // get the stream with a custom aspect ratio
    useEffect(()=>{
        const getStream = async () => {
            if(!micStatus && !camStatus) return setLocalStream(null);
            const localMediaStream = await navigator.mediaDevices.getUserMedia(defaultVideoOptions)
            // video.src = URL.createObjectURL(mediaStream);
            setLocalStream(localMediaStream);
        }
        getStream();
        return () => {
            console.log('CLEANUP!!! from getStream');
        }
    }, [defaultVideoOptions]);

    // set the stream to user
    useEffect(() => {
        if (localStream && localStreamRef.current) {
            localStreamRef.current.srcObject = localStream;
            localStreamRef.current.style.transform = 'scaleX(-1)';
        }
        return () => {
            console.log('CLEANUP!!! from setStream');
            localStream.getTracks()?.forEach(track => track.stop());
        }
    }, [localStream]);

    return <Flex
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
                        micStatus ? <MdMic size={30}/> : <MdMicOff size={30}/>
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
                        camStatus ? <MdVideocam size={30}/> : <MdVideocamOff size={30}/>
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
        <Box>
            // others video
        </Box>
    </Flex>
}

export default  VideoChatPanel;