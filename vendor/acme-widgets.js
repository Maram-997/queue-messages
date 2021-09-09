'use strict';

const faker = require('faker');
const io = require('socket.io-client');
const host = 'http:/localhost:3003';
const connectionFromCaps = io.connect(`${host}/caps`);

const store = 'acme-widgets';

connectionFromCaps.emit('join', store);

connectionFromCaps.emit('getAll', store)

connectionFromCaps.on('message', msg => {
    console.log('messages: ', msg.payload)
    connectionFromCaps.emit('received', msg.payload)
})

connectionFromCaps.on('delivered', payload => {

    console.log(`Thank you for delivering ${payload.orderId}`);
});

connectionFromCaps.on("delivered", msg => {
    connectionFromCaps.emit('received', msg)
})

module.exports = connectionFromCaps