import { useEffect, useRef } from "react";

const VideoPlayer = ({ stream, remoteVideoParentRef, audioStatus, videoStatus }) => {
    const videoRef = useRef(null);
    const height = remoteVideoParentRef?.current?.offsetHeight ?
        remoteVideoParentRef?.current?.offsetHeight
        :
        '100px';
    console.log(audioStatus);
    console.log(videoStatus);

    useEffect(() => {
        if (videoRef?.current && stream) {
            // console.log(videoRef)
            videoRef.current.srcObject = stream;
            // videoRef.current.addEventListener("loadedmetadata", () => {
            //     videoRef.current.play();
            // });
            console.log(stream);
        }
    }, [stream, videoRef]);
    return (
        <>
            <div style={{
                height: '100px',
                width: '100px',
                backgroundColor: 'black',
            }}>

                {
                    <video height={'100px'} width={"100px"} ref={videoRef} autoPlay={true} muted={!audioStatus} />
                }
            </div>
        </>
    );
};

export default VideoPlayer;
