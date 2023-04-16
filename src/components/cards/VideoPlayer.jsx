import { useEffect, useRef } from "react";

const VideoPlayer = ({ stream }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef?.current && stream) {
            // console.log(videoRef)
            videoRef.current.srcObject = stream;
            console.log(stream);
        }
    }, [stream]);
    return (
        <video ref={videoRef} autoPlay={true} muted={true} />
    );
};

export default VideoPlayer;
