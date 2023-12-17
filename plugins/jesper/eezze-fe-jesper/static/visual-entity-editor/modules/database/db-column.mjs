import Module from '../module.mjs';
import ModuleSideModal from '../module-side-modal.mjs';
import ceditField from '../generic/cedit-field.mjs';
import inputField from '../generic/input-field.mjs';
import selectField from '../generic/select-field.mjs';

export default class dbColumn extends Module {

	propertySettingsModal;
	addConnectionModal;
	label;

	set name(name) {
		this.data.name = name;
		this.data.label.value = name;
		this.data.nameField.value = name;
	}

	get name() {
		return this.data.name;
	}

	set dataType(type) {
		this.data.dataType = type;
		this.data.datatypeField.value = type;
		this.conditionalFields();
	}

	get dataType() {
		return this.data.dataType;
	}

	set length(length) {
		this.data.length = length;
		this.data.lengthField.value = length;
	}

	get length() {
		return this.data.length;
	}

	set unsigned(bool) {
		this.data.unsigned = bool;
		this.data.unsignedField.checked = bool;
	}

	get unsigned() {
		return this.data.unsigned;
	}

	set allow_null(bool) {
		this.data.allow_null = bool;
		this.data.allowNullField.checked = bool;
	}

	get allow_null() {
		return this.data.allow_null;
	}

	set zerofill(bool) {
		this.data.zerofill = bool;
		this.data.zeroFillField.checked = bool;
	}

	get zerofill() {
		return this.data.zerofill;
	}

	set key_primary(bool) {
		this.data.key_primary = bool;
		this.data.keyPrimaryField.checked = bool;
		this.updateKeySymbol();
	}

	get key_primary() {
		return this.data.key_primary;
	}

	set key_key(bool) {
		this.data.key_key = bool;
		this.data.keyKeyField.checked = bool;
		this.updateKeySymbol();
	}

	get key_key() {
		return this.data.key_key;
	}

	set key_unique(bool) {
		this.data.key_unique = bool;
		this.data.keyUniqueField.checked = bool;
		this.updateKeySymbol();
	}

	get key_unique() {
		return this.data.key_unique;
	}

	set key_fulltext(bool) {
		this.data.key_fulltext = bool;
		this.data.keyFullTextField.checked = bool;
		this.updateKeySymbol();
	}

	get key_fulltext() {
		return this.data.key_fulltext;
	}

	set key_spatial(bool) {
		this.data.key_spatial = bool;
		this.data.keySpatialField.checked = bool;
		this.updateKeySymbol();
	}

	get key_spatial() {
		return this.data.key_spatial;
	}

	set model_required(bool) {
		this.data.model_required = bool;
		this.data.modelRequiredField.checked = bool;
	}

	get model_required() {
		return this.data.model_required;
	}

	set model_ignore(bool) {
		this.data.model_ignore = bool;
		this.data.modelIgnoreField.checked = bool;
	}

	get model_ignore() {
		return this.data.model_ignore;
	}

	validInput = {
		"types": ["dbColumn"],
		"limit": 0
	}

	dataTypes;
	keys;
	
	constructor(args) {
		super(args);
	}

	beforeCreate(args) {
		super.beforeCreate(args);
		let value = (args && args.hasOwnProperty("name")) ? args.name : "";
		let dataType = (args && args.hasOwnProperty("dataType")) ? args.dataType : "CHAR";
		let length = (args && args.hasOwnProperty("length")) ? args.length : "";
		let unsigned = (args && args.hasOwnProperty("unsigned")) ? args.unsigned : false;
		let allow_null = (args && args.hasOwnProperty("allow_null")) ? args.allow_null : false;
		let zerofill = (args && args.hasOwnProperty("zerofill")) ? args.zerofill : false;
		let key_primary = (args && args.hasOwnProperty("key_primary")) ? args.key_primary : false;
		let key_key = (args && args.hasOwnProperty("key_key")) ? args.key_key : false;
		let key_unique = (args && args.hasOwnProperty("key_unique")) ? args.key_unique : false;
		let key_fulltext = (args && args.hasOwnProperty("key_fulltext")) ? args.key_fulltext : false;
		let key_spatial = (args && args.hasOwnProperty("key_primary")) ? args.key_spatial : false;
		let model_required = (args && args.hasOwnProperty("model_required")) ? args.model_required : false;
		let model_ignore = (args && args.hasOwnProperty("model_ignore")) ? args.model_ignore : false;
		this.dataTypes = {
			'String Data Types': {
				CHAR: 'CHAR',
				VARCHAR: 'VARCHAR',
				BINARY: 'BINARY',
				TINYBLOB: 'TINYBLOB',
				TINYTEXT: 'TINYTEXT',
				TEXT: 'TEXT',
				BLOB: 'BLOB',
				MEDIUMTEXT: 'MEDIUMTEXT',
				MEDIUMBLOB: 'MEDIUMBLOB',
				LONGTEXT: 'LONGTEXT',
				LONGBLOB: 'LONGBLOB',
				ENUM: 'ENUM',
				SET: 'SET'
			},
			'Numeric Data Types': {
				BIT: 'BIT',
				TINYINT: 'TINYINT',
				BOOL: 'BOOL',
				SMALLINT: 'SMALLINT',
				MEDIUMINT: 'MEDIUMINT',
				INT: 'INT',
				BIGINT: 'BIGINT',
				MEDIUMBLOB: 'MEDIUMBLOB',
				FLOAT: 'FLOAT',
				'DOUBLE': 'DOUBLE',
				DECIMAL: 'DECIMAL'
			},
			'Date and Time Data Types': {
				DATE: 'DATE',
				DATETIME: 'DATETIME',
				TIMESTAMP: 'TIMESTAMP',
				TIME: 'TIME',
				YEAR: 'YEAR'
			}
		};
		this.keys = [
			'PRIMARY',
			'KEY',
			'UNIQUE',
			'FULLTEXT',
			'SPATIAL'
		]
		this.data.label = new ceditField({ value: value, parent: this });
		this.data.nameField = new inputField({ name: "name", type: "text", label: "Name", value: value, parent: this });
		this.data.datatypeField = new selectField({ 
			name: "type", 
			label: "Type", 
			value: dataType, 
			parent: this,
			options: this.dataTypes
		});
		this.data.lengthField = new inputField({ name: "length", type: "text", label: "Length", value: length, parent: this });
		this.data.unsignedField = new inputField({ name: "unsigned", type: "checkbox", label: "Unsigned", checked: unsigned, parent: this });
		this.data.allowNullField = new inputField({ name: "allow_null", type: "checkbox", label: "Allow NULL", checked: allow_null, parent: this });
		this.data.zeroFillField = new inputField({ name: "zerofill", type: "checkbox", label: "Zerofill", checked: zerofill, parent: this });
		this.data.keyPrimaryField = new inputField({ name: "key_primary", type: "checkbox", label: "PRIMARY", inlineLabel: true, checked: key_primary, parent: this });
		this.data.keyKeyField = new inputField({ name: "key_key", type: "checkbox", label: "KEY", inlineLabel: true, checked: key_key, parent: this });
		this.data.keyUniqueField = new inputField({ name: "key_unique", type: "checkbox", label: "UNIQUE", inlineLabel: true, checked: key_unique, parent: this });
		this.data.keyFullTextField = new inputField({ name: "key_fulltext", type: "checkbox", label: "FULLTEXT", inlineLabel: true, checked: key_fulltext, parent: this });
		this.data.keySpatialField = new inputField({ name: "key_spatial", type: "checkbox", label: "SPATIAL", inlineLabel: true, checked: key_spatial, parent: this });
		this.data.modelRequiredField = new inputField({ name: "model_required", type: "checkbox", label: "Required", inlineLabel: true, checked: model_required, parent: this });
		this.data.modelIgnoreField = new inputField({ name: "model_ignore", type: "checkbox", label: "Ignore in Model", inlineLabel: true, checked: model_ignore, parent: this });

		this.name = value;
		this.dataType = dataType;
		this.length = length;
		this.unsigned = unsigned;
		this.allow_null = allow_null;
		this.zerofill = zerofill;
		this.key_primary = key_primary;
		this.key_key = key_key;
		this.key_unique = key_unique;
		this.key_fulltext = key_fulltext;
		this.key_spatial = key_spatial;
		this.model_required = model_required;
		this.model_ignore = model_ignore;
	}

	create() {
		this.el = document.createElement("div");
		$(this.el).addClass("property");
		$(this.el).html(`
			<div class="connection connection--input">
				<span class="unlink material-symbols-outlined">cancel</span>
			</div>
			<div class="connection connection--output">
				<span class="unlink material-symbols-outlined">cancel</span>
			</div>
  		<div class="key">
  			<span class="key__symbol material-symbols-outlined">vpn_key</span>		
  		</div>
  		<div class="name">
  			<span class="settings hover-zoom material-symbols-outlined">build</span>
  			<span class="connect hover-zoom material-symbols-outlined">power</span>
  		</div>
		`);

		this.data.label.render($(this.el).find('.name'), 'prepend');

		if(!this.data.label.value) {
			this.data.label.startEdit();
		}

		$(this.data.label.events).on('save', (event, field) => {
			if(field.value) {
				this.name = field.value;
			} else {
				this.VisualEntityEditor.removeEntity(this.id);
			}
		});

		this.propertySettingsModal = new ModuleSideModal({ parent: this });
		this.propertySettingsModal.render();
		this.propertySettingsModal.addTab("Column", this.columnSettingsModal());
		this.propertySettingsModal.addTab("Keys", this.keysSettingsModal());
		this.propertySettingsModal.addTab("Model", this.modelSettingsModal());

		$(this.el).find('.settings').data("modal", this.propertySettingsModal);

		this.addConnectionModal = new ModuleSideModal({ parent: this, size: 'sm' });
		this.addConnectionModal.render();
		this.addConnectionModal.content = this.addConnectionModalContent();
		$(this.el).find('.connect').data("modal", this.addConnectionModal);

		let el = this.el;

		$(this.el).find(".settings, .connect").click((event) => {

			let btn = event.target;
 
			if(!this.VisualEntityEditor.isDraging) {

				let toggle = $(btn).hasClass("active") ? false : true;

				$(el).parents(".entity").find(".active").removeClass("active");
				$(el).parents(".entity").find(".entity-property-editor").hide();

				if(toggle) {
					$(btn).parent().addClass("active");
					$(btn).addClass("active");
				}

				$(btn).data("modal").toggle(toggle);

			}

		});

		$(this.addConnectionModal.el).find('button.connect').on('click', (button) => {
			if(!this.VisualEntityEditor.isDraging) {
				$(this.el).parents(".entity").find(".entity-property-editor").hide();
				$(this.el).parents(".entity").find(".active").removeClass("active");
				let type = $(button.currentTarget).data("connection-type");
				this.selectInput({ type: type });
			}
		});

		$(this.el).find('.connection--input .unlink').on('click', (button) => {
			if(!this.VisualEntityEditor.isDraging) {
				if(this.hasOwnProperty("input") && Object.keys(this.input).length > 0) {
					for (const [index, entity] of Object.entries(this.input)) {
						let e1 = this.VisualEntityEditor.entities[entity.entity_id];
						let e2 = this;
						this.VisualEntityEditor.disconnect(e1, e2);
					}
				}
			}
		});

		$(this.el).find('.connection--output .unlink').on('click', (button) => {
			if(!this.VisualEntityEditor.isDraging) {
				if(this.hasOwnProperty("output") && Object.keys(this.output).length > 0) {
					for (const [index, entity] of Object.entries(this.output)) {
						let e1 = this;
						let e2 = this.VisualEntityEditor.entities[entity.entity_id];
						this.VisualEntityEditor.disconnect(e1, e2);
					}
				}
			}
		});

	}

	afterCreate(args) {
		super.afterCreate();
		this.updateKeySymbol();
	}

	columnSettingsModal() {
		
		var form = $.parseHTML(`
		<form class="form">
			<div class="form__field">
				<div class="form__field__wrapper field--name"></div>
			</div>
			<div class="form__field">
				<div class="form__field__wrapper form__field--select field--datatype"></div>
			</div>
			<div class="form__field">
				<div class="form__field__wrapper field--length"></div>
			</div>
			<div class="form__field form__field--multiple">
				<div class="form__field__wrapper field--unsigned"></div>
				<div class="form__field__wrapper field--allow-null"></div>
				<div class="form__field__wrapper field--zerofill"></div>
			</div>
		</form>
		`)

		$(form).find('.field--name').append(this.data.nameField.el);
		$(form).find('.field--datatype').append(this.data.datatypeField.el);
		$(form).find('.field--length').append(this.data.lengthField.el);
		$(form).find('.field--unsigned').append(this.data.unsignedField.el);
		$(form).find('.field--allow-null').append(this.data.allowNullField.el);
		$(form).find('.field--zerofill').append(this.data.zeroFillField.el);

		$(this.data.nameField.events).on('change', (event, field) => {
			this.name = field.value;
		});

		$(this.data.datatypeField.events).on('change', (event, field) => {
			this.dataType = field.value;
		});

		$(this.data.unsignedField.events).on('change', (event, field) => {
			this.unsigned = field.checked;
		});

		$(this.data.allowNullField.events).on('change', (event, field) => {
			this.allow_null = field.checked;
		});

		$(this.data.zeroFillField.events).on('change', (event, field) => {
			this.zerofill = field.checked;
		});

		this.conditionalFields();

		return form;
	}

keysSettingsModal() {
		
		var form = $.parseHTML(`
		<form class="form">
			<div class="form__field form__field">
				<div class="form__field__wrapper field--keys">
					<label>Keys</label>
				</div>
			</div>
		</form>
		`)

		$(form).find('.field--keys').append(this.data.keyPrimaryField.el);
		$(form).find('.field--keys').append(this.data.keyKeyField.el);
		$(form).find('.field--keys').append(this.data.keyUniqueField.el);
		$(form).find('.field--keys').append(this.data.keyFullTextField.el);
		$(form).find('.field--keys').append(this.data.keySpatialField.el);

		$(this.data.keyPrimaryField.events).on('change', (event, field) => {
			this.key_primary = field.checked;
		});

		$(this.data.keyKeyField.events).on('change', (event, field) => {
			this.key_key = field.checked;
		});

		$(this.data.keyUniqueField.events).on('change', (event, field) => {
			this.key_unique = field.checked;
		});

		$(this.data.keyFullTextField.events).on('change', (event, field) => {
			this.key_fulltext = field.checked;
		});

		$(this.data.keySpatialField.events).on('change', (event, field) => {
			this.key_spatial = field.checked;
		});

		this.conditionalFields();

		return form;
	}

	modelSettingsModal() {
		
		var form = $.parseHTML(`
		<form class="form">
			<div class="form__field form__field">
				<div class="form__field__wrapper field--keys">
					<label>Model settings</label>
				</div>
			</div>
		</form>
		`)

		$(form).find('.field--keys').append(this.data.modelRequiredField.el);
		$(form).find('.field--keys').append(this.data.modelIgnoreField.el);

		$(this.data.modelRequiredField.events).on('change', (event, field) => {
			this.model_required = field.checked;
		});

		$(this.data.modelIgnoreField.events).on('change', (event, field) => {
			this.model_ignore = field.checked;
		});

		this.conditionalFields();

		return form;
	}

	// Hide or show length depending on column type
	conditionalFields() {
		let supportLengthField = ["CHAR", "VARCHAR", "BINARY", "TEXT", "BLOB", "ENUM", "SET", "BIT", "INT", "FLOAT", "DOUBLE", "DECIMAL", "TIME", "DATETIME", "TIMESTAMP"];
		if(supportLengthField.includes(this.dataType)) {
			$(this.data.lengthField.el).parents(".form__field").show();
		} else {
			$(this.data.lengthField.el).parents(".form__field").hide();
			this.length = "";
		}

		let supportUnsignedField = ["TINYINT", "SMALLINT", "MEDIUMINT", "INT", "BIGINT", "FLOAT", "DOUBLE", "DECIMAL"];
		if(supportUnsignedField.includes(this.dataType)) {
			this.data.unsignedField.disabled = false;
		} else {
			this.data.unsignedField.disabled = true;
			this.unsigned = false;
		}

		let supportZeroFillField = ["TINYINT", "SMALLINT", "MEDIUMINT", "INT", "BIGINT", "FLOAT", "DOUBLE", "DECIMAL"];
		if(supportZeroFillField.includes(this.dataType)) {
			this.data.zeroFillField.disabled = false;
		} else {
			this.data.zeroFillField.disabled = true;
			this.zerofill = false;
		}
	}

	addConnectionModalContent() {
		return `
			<div class="form__field">
				<div class="form__field__wrapper">
					<button data-connection-type="m:n" class="button button--green button--has-icon connect w-100">
						Many to Many 
						<span class="connect material-symbols-outlined">chevron_right</span>
					</button>
					<button data-connection-type="n:1" class="button button--green button--has-icon connect w-100">
						Many to One 
						<span class="connect material-symbols-outlined">chevron_right</span>
					</button>
					<button data-connection-type="1:n" class="button button--green button--has-icon connect w-100">
						One to Many
						<span class="connect material-symbols-outlined">chevron_right</span>
					</button>
					<button data-connection-type="1:1" class="button button--green button--has-icon connect w-100">
						One to One
						<span class="connect material-symbols-outlined">chevron_right</span>
					</button>
				</div>
			</div>
		`
	}

	updateKeySymbol() {
		$(this.el).find(".key__symbol").removeClass("key__symbol--primary key__symbol--key key__symbol--unique key__symbol--fulltext key__symbol--spatial");

		if(this.key_primary) {
			$(this.el).find(".key__symbol").addClass("key__symbol--primary");
		} else if(this.key_key) {
			$(this.el).find(".key__symbol").addClass("key__symbol--key");
		} else if(this.key_unique) {
			$(this.el).find(".key__symbol").addClass("key__symbol--unique");
		} else if(this.key_fulltext) {
			$(this.el).find(".key__symbol").addClass("key__symbol--fulltext");
		} else if(this.key_spatial) {
			$(this.el).find(".key__symbol").addClass("key__symbol--spatial");
		}

		this.parent.hasKeyColumn();
	}

}