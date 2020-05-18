import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from '../providers/StateProvider';
import { hangup } from '../providers/state/actions';
import { useSocket } from '../providers/SocketProvider';

const config = {
    iceServers: [
        {
            urls: ['stun:stun.l.google.com:19302'],
        },
    ],
};

const { RTCPeerConnection } = window;

const peerConnection = new RTCPeerConnection(config);

const CallScreen: React.FunctionComponent<{}> = () => {
    // Enable transistion
    const [classes, setClasses] = useState(
        'absolute top-0 right-0 w-full h-full z-20 transition ease-in-out duration-700'
    );

    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    const socket = useSocket();

    const [state, dispatch] = useAppState();

    const initWebRTC = async () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
            // Add streams to peerConnection
            for (const track of stream.getTracks()) {
                peerConnection.addTrack(track, stream);
            }
        });

        peerConnection.addEventListener('track', (event) => {
            // set received stream
            setRemoteStream(event.streams[0]);
        });

        peerConnection.addEventListener('icecandidate', event => {
            if (!event.candidate) {
                return;
            }

            socket.emit('webrtc_ice_candidate', {
                caller: state.activeCall?.caller,
                recipient: state.activeCall?.recipient,
            });
        });

        if (state.activeCall?.caller.sessionId === state.sessionId) {
            socket.emit('start_call', {
                caller: state.activeCall?.caller,
                recipient: state.activeCall?.recipient,
            });
        } else {
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);

            socket.emit('webrtc_offer', {
                offer,
                caller: state.activeCall?.caller,
                recipient: state.activeCall?.recipient,
            });
        }

        socket.on('webrtc_offer', async (data: any) => {
            console.log('received webrtc offer');

            await peerConnection.setRemoteDescription(data.offer);

            const answer = await peerConnection.createAnswer();
            await peerConnection.setLocalDescription(answer);

            socket.emit('webrtc_answer', {
                answer,
                caller: state.activeCall?.caller,
                recipient: state.activeCall?.recipient,
            });
        });

        socket.on('webrtc_answer', async (data: any) => {
            // done by Bob: use Alice's webrtc answer
            console.log('received webrtc answer');
            await peerConnection.setRemoteDescription(data.answer);
        });

        socket.on('webrtc_ice_candidate', async (data: any) => {
            // done by both Alice and Bob: add the other one's
            // ice candidates
            console.log('received ice candidate from', data);
            // we could also "revive" this as a new RTCIceCandidate
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        });
    };

    useEffect(() => {
        setClasses(classes + ' bg-gray-800');

        initWebRTC();

        return () => {
            remoteStream?.getTracks().forEach((track) => track.stop());
            localStream?.getTracks().forEach((track) => track.stop());
        };
    }, []);

    useEffect(() => {
        if (remoteVideoRef.current && remoteStream) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    useEffect(() => {
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
