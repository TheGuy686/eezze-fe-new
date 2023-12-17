import VisualEntityEditor from '../VisualEntityEditor';

export default class Module {

	id = null;
	data = {};
	parent;
	output = {};
	input = {};
	validInput = {
		"types": [],
		"limit": 0
	}
	VisualEntityEditor = VisualEntityEditor
	el;
	position;
	modules = {};
	childWrapper;
	events = {};
	selectable;
	
	constructor(args) {
		this.beforeCreate(args);
		this.create(args);
		this.afterCreate(args);
		this.globalEvents();
	}

	beforeCreate(args) {
		this.selectable = (args && args.hasOwnProperty("selectable")) ? args.selectable : true;
		this.id = (args && args.hasOwnProperty("id")) ? args.id : null;
		this.data = (args && args.hasOwnProperty("data")) ? args.data : {};
		this.parent = (args && args.hasOwnProperty("parent") && args.parent) ? args.parent : { el: VisualEntityEditor.content };
		this.modules = (args && args.hasOwnProperty("modules")) ? args.modules : {};
		this.output = (args && args.hasOwnProperty("output")) ? args.output : {};
		this.input = (args && args.hasOwnProperty("input")) ? args.input : {};
		this.position = (args && args.hasOwnProperty("position")) ? args.position : null;
	}

	afterCreate(args) {
		$(this.el).attr("data-id", this.id);
	}

	create(create = null) {

	}

	globalEvents() {
		if(this.selectable) {
			$(this.el).mouseover((e) => {
			   e.stopPropagation();
			   this.VisualEntityEditor.mouseOverModule = this;
			});
			$(this.el).mouseleave((e) => {
				e.stopPropagation();
				 this.VisualEntityEditor.mouseOverModule = null;
			});
			$(this.el).on('click', (e) => {
				e.stopPropagation();
				if(this.VisualEntityEditor.isConnecting && this.id && this.VisualEntityEditor.connectingFrom.id != this.id) {
					console.log('conn1');
					if(this.validInput.types.includes(this.VisualEntityEditor.connectingFrom.constructor.name)) {
						console.log('conn2');
						let from = this.VisualEntityEditor.connectingFrom;
						let data = this.VisualEntityEditor.connectionData;
						let to = this;
						console.log(from, to, this);
						this.VisualEntityEditor.connect(from, to, data);
						this.stopSelect();
					}
				}
			});
		}
	}

	render(at = null, prepend = false) {
		let method = 'append';
		if(prepend) method = 'prepend';
		if(at) {
			$(at)[method](this.el);
		} else if(this.parent.childWrapper) {
			$(this.parent.childWrapper)[method](this.el);
		} else {
			$(this.parent.el)[method](this.el);
		}
	}

	draw() {
		this.position = { x: $(this.el).position().left, y: $(this.el).position().top };
		if(Object.keys(this.output).length > 0) {
			$(this.el).addClass("has-output");
			for (const [index, entity] of Object.entries(this.output)) {
				let source = this;
				let target = null;

				if(entity.entity_id == null && !this.VisualEntityEditor.isConnecting) {
					delete this.output['tmp'];
					return;
				}

				if(this.VisualEntityEditor.entities.hasOwnProperty(entity.entity_id)) {
					target = this.VisualEntityEditor.entities[entity.entity_id];
				}

				this.VisualEntityEditor.drawConnection(source, target);
			};
		} else {
			$(this.el).removeClass("has-output");
		}

		if(Object.keys(this.input).length > 0) {
			$(this.el).addClass("has-input");
		} else {
			$(this.el).removeClass("has-input");
		}
	}

	selectInput(data = null) {
		this.VisualEntityEditor.isConnecting = true;
		this.VisualEntityEditor.connectingFrom = this;
		this.VisualEntityEditor.connectionData = data;
 		this.output['tmp'] = {
			entity_id: null,
			data: data
		};
	}

	addInput(entity, data = null) {
		if(this.input.hasOwnProperty(entity.id)) {
			this.VisualEntityEditor.disconnect(entity, this);
		} else {
			$(this.VisualEntityEditor.events).trigger("change", { action: "addInput", entity: this, input: entity });
			this.input[entity.id] = { entity_id: entity.id, data: data };
		}
	}

	delInput(entity) {
		$(this.VisualEntityEditor.events).trigger("change", { action: "delInput", entity: this, input: entity });
		delete this.input[entity.id];
	}

	addOutput(entity, data = null) {
		$(this.VisualEntityEditor.events).trigger("change", { action: "addOuput", entity: this, output: entity });
		this.output[entity.id] = { entity_id: entity.id, data: data };
	}

	delOutput(entity) {
		$(this.VisualEntityEditor.events).trigger("change", { action: "delOutput", entity: this, output: entity });
		delete this.output[entity.id];
	}

	stopSelect() {
		this.VisualEntityEditor.isConnecting = false;
		this.VisualEntityEditor.connectingFrom = null;
	}

}