import Peer from "peerjs";
import { v4 as uuidv4 } from 'uuid';

// generate new peer instance
const peer = new Peer(uuidv4());

// make peer connection
peer.on('open', (id) => {
    console.log('successfully connected to peerjs server: ' + id)
})

export default peer;