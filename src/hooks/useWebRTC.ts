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

export const useWebRTC = () => {
    const socket = useSocket();
    const [state, dispatch] = useAppState();

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    const createOffer = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        // Add streams to peerConnection
        for (const track of stream.getTracks()) {
            peerConnection.addTrack(track, stream);
        }

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.emit('offer', {
            offer,
            caller: state.activeCall?.caller,
            recipient: state.activeCall?.recipient,
        });

        console.log('created offer');
    };

    const receiveOfferAndCreateAnswer = async (data: any) => {
        console.log('incoming offer:', data.offer);

        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

        // Add streams to peerConnection
        for (const track of stream.getTracks()) {
            peerConnection.addTrack(track, stream);
        }

        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

        socket.emit('answer', {
            answer,
            caller: state.activeCall?.caller,
            recipient: state.activeCall?.recipient,
        });

        console.log('recevied offer and created answer');
    };

    const receiveAnswer = async (data: any) => {
        console.log('incoming answer:', data.answer);

        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
    };

    const receiveIcecandidate = async (data: any) => {
        console.log('recevied icecandidate', data);

        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    };

    const sendIcecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (!event.candidate) {
            return;
        }

        console.log(event.candidate);

        socket.emit('icecandidate', {
            candidate: event.candidate,
            caller: state.activeCall?.caller,
            recipient: state.activeCall?.recipient,
        });
    };

    const initWebRTC = async () => {
        peerConnection.addEventListener('track', (event: RTCTrackEvent) => {
            console.log('received remote stream');
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
        socket.on('answer', receiveAnswer);
        socket.on('icecandidate', receiveIcecandidate);
    };

    useEffect(() => {
        initWebRTC();

        return () => {
            remoteStream?.getTracks().forEach((track) => track.stop());
            localStream?.getTracks().forEach((track) => track.stop());
        };
    }, []);

    return [localStream, remoteStream];
};
