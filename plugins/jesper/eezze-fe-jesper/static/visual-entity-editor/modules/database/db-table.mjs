import Module from '../module.mjs';
import ceditField from '../generic/cedit-field.mjs';
import dbColumn from '../database/db-column.mjs';

export default class dbTable extends Module {

	name;

	constructor(args) {
		super(args);
		if(this.position) {
			$(this.el).css("left", this.position.x + "px");
			$(this.el).css("top", this.position.y + "px");
		}
	}

	beforeCreate(args) {
		super.beforeCreate(args);
		this.name = (args && args.hasOwnProperty("name")) ? args.name : "";
	}

	create() {
		this.el = document.createElement("div");
		$(this.el).addClass("entity");
		$(this.el).html(`
			<div class="label">
				<span class="remove-entity hover-zoom material-symbols-outlined">
					cancel
				</span>
			</div>
			<div class="properties"></div>
			<div class="footer-toolbar">
				<span class="add-column hover-zoom material-symbols-outlined">add_circle</span>
			</div>
		`);

	  this.data.label = new ceditField({ 
			value: this.name,
			parent: this
		});
		
		this.data.label.render($(this.el).find('.label'));

		$(this.data.label.events).on('save', (event, text) => {
			this.name = text;
		});

		this.childWrapper = $(this.el).find(".properties");
	}

	afterCreate(args) {
		super.afterCreate(args);
		$(this.el).find('.add-column').on('click', () => {
			if(!this.VisualEntityEditor.isDraging) {
				this.VisualEntityEditor.addEntity("dbColumn", this);
			}
		});

		$(this.el).find('.remove-entity').on('click', () => {
			if(!this.VisualEntityEditor.isDraging) {
				this.VisualEntityEditor.removeEntity(this.id);
			}
		});
		
	}

	hasKeyColumn() {
		$(this.el).find('> .properties').removeClass("has-keys");
		if($(this.el).find('.key__symbol--primary, .key__symbol--key, .key__symbol--unique, .key__symbol--fulltext, .key__symbol--spatial').length > 0) {
			$(this.el).find('> .properties').addClass("has-keys");
		}
	}

}