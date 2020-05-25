import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from '../providers/StateProvider';
import { hangup } from '../providers/state/actions';
import { useSocket } from '../providers/SocketProvider';
import { useWebRTC } from '../hooks/useWebRTC';

const CallScreen: React.FunctionComponent<{}> = () => {
    // Enable transistion
    const [classes, setClasses] = useState(
        'absolute top-0 right-0 w-full h-full z-20 transition ease-in-out duration-700'
    );

    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);

    const [state, dispatch] = useAppState();

    const [localStream, remoteStream] = useWebRTC();

    useEffect(() => {
        setClasses(classes + ' bg-gray-800');
    }, []);

    useEffect(() => {
        console.log(remoteStream);

        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    useEffect(() => {
        console.log(localStream);

        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    return (
        <div className={classes}>
            <div className="bg-white">
                Caller: <pre>{JSON.stringify(state.activeCall?.caller)}</pre>
                Recipient: <pre>{JSON.stringify(state.activeCall?.recipient)}</pre>
            </div>

            <video className="w-full h-full" ref={remoteVideoRef} controls={false} autoPlay id="remote-video"></video>
            <video
                className="absolute w-40 h-auto bottom-x right-x"
                ref={localVideoRef}
                controls={false}
                autoPlay
                muted
                id="local-video"
            ></video>

            <button
                className="bg-blue-300 rounded-full text-white px-2 py-1 absolute bottom-0 right-0 left-0 mx-auto mb-5"
                onClick={() => dispatch(hangup())}
            >
                Hang-up
            </button>
        </div>
    );
};

export default CallScreen;
