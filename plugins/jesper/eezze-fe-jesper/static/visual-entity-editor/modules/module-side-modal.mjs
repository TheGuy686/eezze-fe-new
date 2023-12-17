import Module from './module.mjs';

export default class ModuleSideModal extends Module {

	constructor(args) {
		super(args);
	}

	create(args) {
		this.el = document.createElement("div");
		$(this.el).addClass("entity-property-editor");
		if(args.hasOwnProperty("size")) {
			$(this.el).addClass(args.size); // Possible sizes: xs, sm, lg, xl
		}
	}

	set content(html) {
		$(this.el).html(html);
	}

	get content() {
		return $(this.el).html();
	}

	addTab(name, html) {
		let slug = this.VisualEntityEditor.sanitize_title(name);
		let tab = document.createElement("li");
		$(tab).addClass("tab");
		$(tab).text(name);
		$(tab).data("open-tab", slug);

		let tabContent = document.createElement("div");
		$(tabContent).attr("data-tab-id", slug);
		$(tabContent).addClass("tab__content");
		$(tabContent).html(html);

		$(this.el).append(tabContent);

		if(!$(this.el).find('.tabs').length) {
			$(tab).addClass("tab--active");
			$(this.el).prepend(`<ul class="tabs"></ul>`);
			$(this.el).find('[data-tab-id="' + slug + '"]').addClass("tab__content--open");
		}

		$(this.el).find('.tabs').append(tab);

		$(tab).on('click', () => {
			if(!this.VisualEntityEditor.isDraging) {
				this.changeTab(tab);
			}
		});

		return tabContent;
	}

	toggle(showEpe) {

		let outer_wrapper = $(this.parent.el).parents(".entity");

		// Bring to front
		$(this.VisualEntityEditor.content).find('.entity').css("z-index", 1);
		$(outer_wrapper).css("z-index", 2);

		if(showEpe) {
			$(this.el).show();
		} else {
			$(this.el).hide();
		}

		let offset = $(outer_wrapper).offset();
		let left = offset.left;
		let right = $(window).width() - left - $(outer_wrapper).width();

		if($(outer_wrapper).width() + $(this.el).width() > right) {
			$(this.el).css("left", -$(epe).outerWidth() + "px");
		} else {
			$(this.el).css("left", $(outer_wrapper).width() + "px");
		}

	}

	changeTab(tab) {
		$(this.el).find('.tab__content--open').removeClass("tab__content--open");
		$(this.el).find('.tab--active').removeClass("tab--active");
		$(tab).addClass("tab--active");
		$(this.el).find("[data-tab-id='" + $(tab).data('open-tab') + "']").addClass("tab__content--open");
	}

	render() {
		$(this.parent.parent.el).prepend(this.el);
	}

}