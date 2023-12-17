
var W3CWebSocket = require('websocket').w3cwebsocket;

const WSocket = require('../classes/WSocket');
const { WS_STATS_HOST } =  require('../consts/Endpoints');

(() => {
    return new Promise((resolve, reject) => {
        console.clear();

        console.log(`Connecting to: ${WS_STATS_HOST}?token=${AUTH_TOKEN}`);

        const socket = new W3CWebSocket(`${WS_STATS_HOST}?token=${AUTH_TOKEN}`);

        setTimeout(() => resolve(socket), 300);
    });
})();