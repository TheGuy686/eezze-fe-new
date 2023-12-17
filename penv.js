// require('dotenv').config();

const { exec } = require('node:child_process');

const fs = require('fs');

// let out = {
//     WS_HOST: process.env.WS_HOST,
//     WS_STATS_HOST: process.env.WS_STATS_HOST,
//     API_HOST: process.env.API_HOST,
//     FE_HOST: process.env.FE_HOST,
//     FE_PORT: process.env.FE_PORT,
//     FE_PORT_J: process.env.FE_PORT_J,
//     ASSETS_HOST: process.env.ASSETS_HOST,
//     FE_PORT_OPENAPI: process.env.FE_PORT_OPENAPI,
// };

let out = {
    WS_HOST: process.env.WS_HOST ?? 'ws://localhost:3002/v1',
    WS_STATS_HOST: process.env.WS_STATS_HOST ?? 'ws://localhost:3001/v1',
    API_HOST: process.env.API_HOST ?? 'http://localhost:2002',
    FE_HOST: process.env.FE_HOST ?? 'localhost',
    FE_PORT: process.env.FE_PORT ?? 2000,
    FE_PORT_J: process.env.FE_PORT_J ?? 2100,
    FE_PORT_VEE: process.env.FE_PORT_VEE ?? 2200,
    FE_PORT_REGEX: process.env.FE_PORT_REGEX ?? 2010,
    FE_PORT_OPENAPI: process.env.FE_PORT_VEE ?? 2001,
    DEFAULT_WS_LOGGING_SERVER_PORT: process.env.DEFAULT_WS_LOGGING_SERVER_PORT ?? 3100,
    HOST_IP: process.env.HOST_IP ?? 'localhost',
    AI_CHAT_TIMEOUT: 1,
};

console.log('Setting ENV vars to: ', out);

const output = `module.exports = ${JSON.stringify(out, null, 4)}`;

exec(`touch env.js`);

fs.writeFileSync('env.js', output);

console.log('Env file processing success\n');