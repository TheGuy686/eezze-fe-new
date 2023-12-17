const { endpoints } = require ('../consts/Endpoints');

import WSocket from '~/classes/WSocket';

var W3CWebSocket = require('websocket').w3cwebsocket;

const { WS_STATS_HOST } =  require('../consts/Endpoints');

const g: any = global;

const url = `${WS_STATS_HOST}?token=${g['AUTH_TOKEN']}`;

// console.log('To URL: ', url);

const socket = new W3CWebSocket(url);

g['$eezzeSocket'] = new WSocket(socket);