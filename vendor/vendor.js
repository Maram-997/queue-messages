'use strict';
const faker = require('faker');
const io = require('socket.io-client');
const host = 'http:/localhost:3003/caps';
const connectionFromCaps = io.connect(host);

const store = process.argv.splice(2)[0]

connectionFromCaps.emit('join', store);

connectionFromCaps.emit('getAll')

connectionFromCaps.on('message', msg => {
    console.log('messages: ', msg.payload)
    connectionFromCaps.emit('received', msg)
})

connectionFromCaps.on('delivered', payload => {

    console.log(`Thank you for delivering ${payload.orderId}`);
});

