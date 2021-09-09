'use strict';

const faker = require('faker');
const io = require('socket.io-client');
const host = "http:/localhost:3003";
const connectionFromCaps = io.connect(`${host}/caps`);

const store = '1-206-flowers';

connectionFromCaps.emit('join', store);

connectionFromCaps.emit('getAll', store)

connectionFromCaps.on('message', msg => {
    console.log('messages: ', msg.payload.payload)
    connectionFromCaps.emit('received', msg.payload.payload)
})

connectionFromCaps.on('delivered', payload => {

    console.log(`Thank you for delivering ${payload.orderID}`);
});

connectionFromCaps.on("delivered", msg => {
    connectionFromCaps.emit('received', msg)
})

module.exports = connectionFromCaps