import Peer from 'peerjs';

const peer = new Peer({
    host: 'localhost',
    port: 6969,
    path: '/peerjs',
    config: {
        'iceServers': [
            // { url: 'stun:stun01.sipphone.com' },
            // { url: 'stun:stun.ekiga.net' },
            // { url: 'stun:stunserver.org' },
            // { url: 'stun:stun.softjoys.com' },
            // { url: 'stun:stun.voiparound.com' },
            // { url: 'stun:stun.voipbuster.com' },
            // { url: 'stun:stun.voipstunt.com' },
            // { url: 'stun:stun.voxgratia.org' },
            // { url: 'stun:stun.xten.com' },
            // {
            //     url: 'turn:192.158.29.39:3478?transport=udp',
            //     credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            //     username: '28224511:1379330808'
            // },
            // {
            //     url: 'turn:192.158.29.39:3478?transport=tcp',
            //     credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
            //     username: '28224511:1379330808'
            // }
            {
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:global.stun.twilio.com:3478",
                  ],
            }
        ]
    },
    debug: 3
});

export default peer;