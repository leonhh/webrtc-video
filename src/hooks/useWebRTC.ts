import { useSocket } from '../providers/SocketProvider';
import { useState, useEffect } from 'react';
import { useAppState } from '../providers/StateProvider';

const config = {
    iceServers: [
        {
            urls: ['stun:stun.l.google.com:19302'],
        },
    ],
};

const peerConnection = new RTCPeerConnection(config);

export const useWebRTC = (
    localVideoRef: React.RefObject<HTMLVideoElement>,
    remoteVideoRef: React.RefObject<HTMLVideoElement>
) => {
    const socket = useSocket();
    const [state, dispatch] = useAppState();

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    const createOffer = async () => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then(function (stream) {
            // Add streams to peerConnection
            for (const track of stream.getTracks()) {
                peerConnection.addTrack(track, stream);
            }
        });

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.emit('offer', {
            offer,
            caller: state.activeCall?.caller,
            recipient: state.activeCall?.recipient,
        });
    };

    const receiveOfferAndCreateAnswer = async (data: any) => {
        await peerConnection.setRemoteDescription(data.offer);

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        socket.emit('answer', {
            answer,
            caller: state.activeCall?.caller,
            recipient: state.activeCall?.recipient,
        });
    };

    const recieveAnswer = async (data: any) => {
        await peerConnection.setRemoteDescription(data.answer);
    };

    const receiveIcecandidate = async (data: any) => {
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    };

    const sendIcecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (!event.candidate) {
            return;
        }

        socket.emit('icecandidate', {
            caller: state.activeCall?.caller,
            recipient: state.activeCall?.recipient,
        });
    };

    const initWebRTC = async () => {
        peerConnection.addEventListener('track', (event: RTCTrackEvent) => {
            // set received stream
            setRemoteStream(event.streams[0]);
        });

        peerConnection.addEventListener('icecandidate', sendIcecandidate);

        if (state.activeCall?.caller.sessionId === state.sessionId) {
            socket.emit('start_call', {
                caller: state.activeCall?.caller,
                recipient: state.activeCall?.recipient,
            });
        } else {
            createOffer();
        }

        socket.on('offer', receiveOfferAndCreateAnswer);
        socket.on('aswer', recieveAnswer);
        socket.on('icecandidate', receiveIcecandidate);
    };

    useEffect(() => {
        initWebRTC();

        return () => {
            remoteStream?.getTracks().forEach(track => track.stop());
            localStream?.getTracks().forEach(track => track.stop());
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
};
