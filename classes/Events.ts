export default class EventsClass {

	private events: any = {}

	on (eventName: string, func: Function) {
		this.events[eventName] = this.events[eventName] || [];
		this.events[eventName].push({func});

		return this;
	}

	off (eventName: string, func: Function)
	{
		if (this.events[eventName])
		{
			if (func == undefined)
			{
				delete this.events[eventName];
				return;
			}

			for (var i = 0; i < this.events[eventName].length; i++)
			{
				if (this.events[eventName][i] === func)
				{
					this.events[eventName].splice(i, 1);
					break;
				}
			};
		}

		return this;
	}

	emit (eventName: string, data: any) {
		if (this.events[eventName])
		{
			if (this.events[eventName].length === undefined)
			{
				console.log('There was a problem with the event name : ' + eventName);
				return;
			}

			for (var i = 0; i < this.events[eventName].length; i++)
			{
				var item = this.events[eventName][i];

				if (this._isFunction(item['func']))
				{
					item['func'](data);
					continue;
				}
			}
		}
	}

	_isFunction (functionToCheck: any) {
		var getType = {};

		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	eventsCount () {
		return Object.keys(this.events).length;
	}

	listEvents (eventName: any)
	{
		if (eventName === undefined)
		{
			for (var key in this.events)
			{
				console.log('Key : ' + key + ' : ' + this.events[key]);
			}
		}

		if (this.events[eventName] === undefined) {
			console.log('Your event doesn\'t exist');
			return;
		}

		console.log(' ------------------------------------------------------ CURRENT EVENTS LIST -----------------------------------------------------------------------------');

		for (var key in this.events[eventName])
		{
			console.log('Key : ' + key + ' : ' + this.events[eventName][key]);
		}
	}
}