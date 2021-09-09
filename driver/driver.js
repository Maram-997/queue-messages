'use strict';

const io = require('socket.io-client');
const host = 'http:/localhost:3003/caps';
const connectionFromCaps = io.connect(host);

connectionFromCaps.on('pickup', (payload)=>{
    console.log('packages delivered');
    connectionFromCaps.emit('delivered', (payload))
})
connectionFromCaps.on('in-transit',(payload)=>{
    console.log(`Delieverd ${payload.orderId}`);
    connectionFromCaps.emit('delivered',(payload))
})

