import React, { useState, useEffect, useRef } from 'react';

const CallScreen: React.FunctionComponent<{}> = () => {
    // Enable transistion
    const [classes, setClasses] = useState(
        'absolute top-0 right-0 w-full h-full z-20 transition ease-in-out duration-700'
    );

    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        setClasses(classes + ' bg-gray-800');

        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
            if (localVideoRef.current !== null) {
                localVideoRef.current.srcObject = stream;
            }
        });
    }, []);

    return (
        <div className={classes}>
            <video ref={remoteVideoRef} controls={false} autoPlay id="remote-video"></video>
            <video ref={localVideoRef} controls={false} autoPlay muted id="local-video"></video>
        </div>
    );
};

export default CallScreen;
