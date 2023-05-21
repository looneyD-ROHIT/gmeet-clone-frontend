import { useEffect, useRef } from "react";

const VideoPlayer = ({ stream, remoteVideoParentRef }) => {
    const videoRef = useRef(null);
    const height = remoteVideoParentRef?.current?.offsetHeight ?
        remoteVideoParentRef?.current?.offsetHeight
        :
        '100px';

    useEffect(() => {
        if (videoRef?.current && stream) {
            // console.log(videoRef)
            videoRef.current.srcObject = stream;
            videoRef.current.addEventListener("loadedmetadata", () => {
                videoRef.current.play();
            });
            console.log(stream);
        }
    }, [stream]);
    return (
        <>
            {
                <video height={height} width={"100px"} ref={videoRef} autoPlay={true} muted={true} />
            }
        </>
    );
};

export default VideoPlayer;
