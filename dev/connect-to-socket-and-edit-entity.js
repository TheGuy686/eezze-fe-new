#!/usr/bin/env node

console.clear();

const { WS_STATS_HOST } = require('../consts/Endpoints');

const token = `eyJzaWciOiIzYTc3OWY5NjU1MGZiNWZiYTg0NWY2ODgxZmEyMTE5YjYzZDExODdiODdhN2YyMzAxNWVhNTNkYTE4MTg5YThhIiwiYWxnIjoiSFMyNTYiLCJ0eXAiOiJKV1QiLCJ0eXBlIjoiOWZkOTliNTBhNmE5OThiNWFmMzMyOTUwYzlkY2Q3NGY5YTYyY2IwMWQ3ZTRjZmE4MGU2NGIwMWY2MTdlMmY3MyJ9.eyJwYXlsb2FkIjp7ImlkIjozLCJlbWFpbCI6InJ5YW5qY29va2UzQGhvdG1haWwuY29tIiwidXNlcm5hbWUiOiJIZU1hbiIsImZpcnN0TmFtZSI6IkplcnJ5IiwibGFzdE5hbWUiOiJSb2RnZXJzIiwiZW1haWxWZXJpZmllZCI6MSwicm9sZXMiOiJbXCJST0xFX1VTRVJcIl0iLCJhY3RpdmUiOjF9LCJzaWduYXR1cmUiOiIzYTc3OWY5NjU1MGZiNWZiYTg0NWY2ODgxZmEyMTE5YjYzZDExODdiODdhN2YyMzAxNWVhNTNkYTE4MTg5YThhIiwiaXNzIjoidW5kZWZpbmVkdW5kZWZpbmVkOjMwMDAiLCJpYXQiOjE2ODU5NjcyMzMxNDQsImV4cCI6MTY5MzE2NzIzMzE0NCwiZXhwQXQiOjE2OTMxNjcyMzMxNDR9.CbuCxDMUe7BDZM8Waf3wn40rxq8jGSlDtbT8dzVq9pw`;

const url = `${WS_STATS_HOST}?token=${token}`;

var W3CWebSocket = require('websocket').w3cwebsocket;

var client = new W3CWebSocket(url);

client.onerror = function() {
    console.log('Connection Error');
};

const editingProjectPl = {
    event: 'project-channel-subscription',
    data: { projectId: 1 }
}

const editingEntitiesPl = {
    event: 'editing-entities',
    data: {
        projectId: 1,
        sessionId: 'RYANS-SCRIPT-again'
    }
}

client.onopen = function() {
    console.log('WebSocket Client Connected');

    client.send(JSON.stringify(editingProjectPl, null, 4));

    setTimeout(() => {
        client.send(JSON.stringify(editingEntitiesPl, null, 4));
    }, 500);
};

client.onclose = function() {
    console.log('echo-protocol Client Closed');
};

client.onmessage = function(e) {
    if (typeof e.data === 'string') {
        //console.log("Received: '" + e.data + "'");
    }
};

console.log(`connection to "${url}"`);

// nodemon --exec 'node dev/connect-to-socket-and-edit-entity.js'