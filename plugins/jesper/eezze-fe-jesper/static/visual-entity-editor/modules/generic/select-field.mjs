import Module from '../module.mjs';

export default class selectField extends Module {

	name;
	placeholder;
	class;
	readonly;
	disabled;
	required;
	label;
	options;
	
	set value(value) {
		$(this.data.select).val(value);
	}

	get value() {
		return $(this.data.select).val();
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
		this.options = (args && args.hasOwnProperty("options")) ? args.options : [];
	}

	afterCreate(args) {
		super.afterCreate(args);
		this.value = (args && args.hasOwnProperty("value")) ? args.value : "";
	}

	change() {
		$(this.events).trigger("change", this);
		$(this.VisualEntityEditor.events).trigger("change", { action: "select-update", entity: this.parent, field: this });
	}

	create() {
		this.el = document.createElement("div");

		this.data.select = document.createElement("select");
		
		$(this.data.select).attr("name", this.name);
		$(this.data.select).attr("placeholder", this.placeholder);

		if(this.label) {
			$(this.el).append("<label>" + this.label + "</label>");
		}
console.log(this);
		if(Object.keys(this.options).length) {
			for (const [key, value] of Object.entries(this.options)) {
			  if(typeof value === 'object' && value !== null) {
			  	$(this.data.select).append("<option value='' class='category' disabled>" + key + "</option>");
			  	let category_slug = this.VisualEntityEditor.sanitize_title(key);
			  	for (const [innerKey, innerValue] of Object.entries(value)) {
			  		$(this.data.select).append("<option value='" + innerKey + "' class='"+category_slug+"'>" + innerValue + "</option>");
			  	}
			  } else {
			  	$(this.data.select).append("<option value='" + key + "'>" + value + "</option>");
			  }
			}
		}

		/*
		this.options.forEach((option) => {
			let slug = this.VisualEntityEditor.sanitize_title(option);
			$(this.data.select).append("<option value='" + slug + "'>" + option + "</option>");
		});
		*/

		$(this.el).append(this.data.select);

		let delayedSave;

	  $(this.data.select).on("change", (evt) => {
	  	this.change();
	  });

	  $(this.data.select).on("focus", (evt) => {
	  	this.VisualEntityEditor.disableDrag = true;
	  });

	  $(this.data.select).on("blur", (evt) => {
	  	this.VisualEntityEditor.disableDrag = false;
	  });

	}

}