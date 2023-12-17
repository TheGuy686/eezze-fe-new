import Module from '../module.mjs';

export default class inputField extends Module {

	name;
	placeholder;
	class;
	readonly;
	required;
	label;
	inlineLabel;
	focused = false;

	set type(value) {
		this.data.type = value;
	}

	get type() {
		return this.data.type;
	}

	set disabled(disable) {
		if(disable) {
			$(this.data.input).attr("disabled", "disabled");
		} else {
			$(this.data.input).removeAttr("disabled", "");
		}
	}
	
	set value(value) {
		$(this.data.input).val(value);
	}

	get value() {
		return $(this.data.input).val();
	}

	set checked(bool) {
		if(this.type == 'checkbox') {
			$(this.data.input).prop('checked', bool);
		}
	}

	get checked() {
		if(this.type == 'checkbox') {
			return this.data.input.checked;
		}
	}

	constructor(args) {
		args.selectable = false;
		super(args);
	}

	beforeCreate(args) {
		super.beforeCreate(args);
		this.label = (args && args.hasOwnProperty("label")) ? args.label : "";
		this.name = (args && args.hasOwnProperty("name")) ? args.name : "";
		this.placeholder = (args && args.hasOwnProperty("placeholder")) ? args.placeholder : "";
		this.type = (args && args.hasOwnProperty("type")) ? args.type : "";
		this.inlineLabel = (args && args.hasOwnProperty("inlineLabel")) ? args.inlineLabel : false;
	}

	afterCreate(args) {
		super.afterCreate(args);
		if(args && args.hasOwnProperty("value")) {
			this.value = args.value;
		}
		if(args && args.hasOwnProperty("checked")) {
			this.checked =  args.checked;
		}
	}

	change() {
		if(this.type == 'checkbox') {
			if(this.checked) {
				this.checked = true;
			} else {
				this.checked = false;
			}
		}
		$(this.events).trigger("change", this);
		$(this.VisualEntityEditor.events).trigger("change", { action: "input-update", entity: this.parent, field: this });
	}

	create() {
		this.el = document.createElement("div");

		if(this.inlineLabel) {
			$(this.el).addClass("inlineLabel");
		}

		this.data.input = document.createElement("input");
		
		$(this.data.input).attr("name", this.name);
		$(this.data.input).attr("type", this.type);

		if(this.placeholder) {
			$(this.data.input).attr("placeholder", this.placeholder);
		}

		if(this.label) {
			let label = document.createElement("label");
			if(this.type == 'checkbox' || this.type == 'radio') {
				$(label).addClass("clickable");
			}
			$(label).html(this.label);
			$(label).attr("for", this.name);
			$(label).click(() => {
				if(this.type == 'checkbox' || this.type == 'radio') {
					this.checked = this.checked ? false : true;
				}
			});
			$(this.el).append(label);
		}

		$(this.el).append(this.data.input);

		if(this.type == 'checkbox' || this.type == 'radio') {
		  $(this.data.input).on("change", (evt) => {
				this.change();
		  });
		} else {
			let delayedSave;
		  $(this.data.input).on("keyup", (evt) => {
		  	clearTimeout(delayedSave);
	      delayedSave = setTimeout(() => { this.change() }, 250);
		  });
		}

	  $(this.data.input).on("focus", (evt) => {
	  	this.focused = true;
	  	this.VisualEntityEditor.disableDrag = true;
	  });

	  $(this.data.input).on("blur", (evt) => {
	  	this.focused = false;
	  	this.VisualEntityEditor.disableDrag = false;
	  });


	}

}