// var W3CWebSocket = require('websocket').w3cwebsocket;

const WebSocket = require('ws');

export default class WSocket {
	private autoReconnect: boolean = true;
	private autoReconnectDelay: number = 4000;
	private socket: any = null; 
	private isConnected: Boolean = false;
	private events: any = {};
	private commit: Function = () => {};
	private tmr: any;

	constructor(socket: any) {
		this.socket = socket;
		this.connect();
	}

	setCommit(commit: Function) {
		this.commit = commit;
	}

	connect () {
		if (this.isConnected) return;

		try {
			this.socket.onopen = () => {
				this.isConnected = false;

				this.initSocket();
				
				this.emit('connected');
			};

			this.socket.onerror = () => {
				console.log('Connection Error');

				this.isConnected = false;
			};

			this.socket.onclose = () => {
				this.isConnected = false;
				this.emit('disconnected');
			};
		}
		catch (e: any) {
			console.log('Error: ', e.message);
		}
	}

	initSocket() {
		this.socket.onmessage = (e: any) =>
		{
			if (typeof e.data === 'string')
			{
				let evt;

				try
				{
					evt = JSON.parse(e.data);
// console.log('Socket pl: ', evt);
					let eventName, data;

					if (typeof evt['event'] != 'undefined') eventName = evt['event'];
					if (typeof evt['data']  != 'undefined') data      = evt['data'];

					try {
						this.emit(eventName, data);
					}
					catch (er: any) {
						console.log(`WWebSocket->Error: There was an error handling the call back for event: `, er.message);
						console.log('Event data: ', evt);
					}
				}
				catch (err: any)
				{
					console.log('Error: ', err.message, e.data);
				}
			}
		};
 	}

	on (eventName: any, cb: Function) {
		this.events[eventName] = this.events[eventName] || [];

		this.events[eventName][String(cb)] = cb;
	}

	off (eventName: string, cb: Function) {
		if (this.events[eventName][String(cb)]) {
			delete this.events[eventName][String(cb)];
		}
	}

	emit (eventName: string, data: any = {}) {
// console.clear();
// console.log('Event Name: ', eventName);
// console.log('this.events: ', this.events);

		if (typeof this.events[eventName] != 'undefined') {

			let k;

			for (k in this.events[eventName]) {
				if (this.commit) {
					this.events[eventName][k](data, this.commit);
				}
				else {
					this.events[eventName][k](data);
				}
			}
		}
	}

	emitToServer (eventName: string, data: any = {}) {
		if (this.isConnected) return;
		
		// console.log('WS PAYLOAD TO SERVER: ', JSON.stringify({eventName, data}));

		this.socket.send(JSON.stringify({event: eventName, data}));
	}

	close() { 
		try {
			this.socket.close();
		}
		catch (err) {
			console.log(`There was an error disconnecting from the server: `, err);
		}
	}
}