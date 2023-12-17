import Module from '../module.mjs';

export default class ceditField extends Module {

	text;

	set value(text) {
		this.text = text;
		$(this.el).text(text);
	}

	get value() {
		return this.text;
	}
	
	constructor(args) {
		args.selectable = false;
		super(args);
	}

	beforeCreate(args) {
		super.beforeCreate(args);
		this.value = (args && args.hasOwnProperty("value")) ? args.value : "";
	}

	startEdit() {
     this.el.contentEditable=true;
	   this.VisualEntityEditor.disableDrag = true;
		 setTimeout(() => {
			    this.el.focus();
		 }, 0);
     this.selectText();
	}

	stopEdit() {
	  this.el.blur();
	  this.clearSelectText();
	}

	save() {
		// save
		this.value = $(this.el).text();
		$(this.events).trigger("save", this);
		$(this.VisualEntityEditor.events).trigger("change", { action: "cedit-update", entity: this.parent, field: this });
	}

	create() {
		this.el = document.createElement("span");
		$(this.el).addClass("cedit");
		$(this.el).text(this.value);

	  $(this.el).on("keypress keyup", (evt) => {
	    if (evt.keyCode == 13 || evt.keyCode == 27) {
        evt.preventDefault();
        this.stopEdit();
	    }
	  });

	  $(this.el).on("dblclick", () => {
	  	this.startEdit();
	  });

	  $(this.el).on("blur", () => {
	  	this.VisualEntityEditor.disableDrag = false;
	     this.el.contentEditable=false;
	     this.save();
	  });

	}

	selectText() {

    const node = this.el;

    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    }

	}

	clearSelectText() {
		if (window.getSelection) {
		  if (window.getSelection().empty) {  // Chrome
		    window.getSelection().empty();
		  } else if (window.getSelection().removeAllRanges) {  // Firefox
		    window.getSelection().removeAllRanges();
		  }
		} else if (document.selection) {  // IE?
		  document.selection.empty();
		}
	}
	
}