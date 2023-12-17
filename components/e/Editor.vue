<style lang="less" scoped>
.editor-root {
	position: relative;

	/* required class */
	.my-editor {
		min-width: 100% !important;
		background: #2d2d2d;
		color: #ccc;

		/* you must provide font-family font-size line-height. Example: */
		font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
		font-size: 14px;
		line-height: 1.5;
		padding: 5px;
	}

	.prism-editor__textarea:focus {outline: none; }

	.round-plus-btn {
		position: absolute;
		top: 8px;
		right: 10px;
		width: 17px;
		height: 17px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		border-radius: 50%;
		border: solid 1px rgba(0, 0, 0, 0.2);

		&:hover {
			background-color: #40a9ff;
			color: white;
			cursor: pointer;
		}
	}
}
</style>

<template>
<e-row class="editor-root" :center="true" :fillParent="true" :stle="`width: ${!condense ? 50 : 100}% !important; max-width: ${!condense ? 50 : 100}% !important;`">

	<fullscreen v-model="fullscreen">

		<e-col :center="true">

			<prism-editor
				ref="editor"
				:tabSize="tabSize"
				:insertSpaces="false"
				:style="stle"
				class="my-editor"
				:highlight="highlighter"
				line-numbers
				:value="value"
				@input="$emit('input', $event)"
				:w-100="fillParent"
				e-scroll
			/>

		</e-col>

	</fullscreen>

	<div>

		<a-dropdown placement="bottomRight" class="round-plus-btn">

			<a-button shape="circle" size="small">
				
				<GeneralIcon type="spot-list-menu-db" />

			</a-button>
	
			<template #overlay>
	
				<a-menu>
	
					<a-menu-item v-if="showNewBtn" @click="$emit('add-btn-clicked')">
	
						{{ tr('add-variable') }}
	
					</a-menu-item>
	
					<a-menu-item @click="fullscreen = true">
	
						{{ tr('full-screen') }}
	
					</a-menu-item>
	
				</a-menu>
	
			</template>
	
		</a-dropdown>

	</div>

</e-row>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

export default {
    components: { PrismEditor },
	props: {
		width: {
			type: String | Number,
			default: '30vw',
		},
		height: {
			type: String | Number,
			default: 'auto',
		},
		tabSize: {
			type: Number,
			default: 4,
		},
		condense: {
			type: Boolean,
			default: false,
		},
		value: {
			type: String,
			require: true,
		},
		minLines: {
			type: Number,
			default: 15,
		},
		showNewBtn: {
			type: Boolean,
			default: true,
		},
		fillParent: {
			type: Boolean,
			default: false,
		}
	},
	computed: {
		stle() {
			let stle = '';

			if (this.fullscreen) {
				return `height: 95vh; widht: 95vw; max-height: 95vh;`;
			}

			if (this.height == 'auto') {
				stle += `height: auto; `;
			}
			else stle += `height: ${this.height}px; `;

			if (typeof this.width == 'number') {
				stle += `width: ${this.width}px; `;
			}
			else if (typeof this.width == 'string') {
				stle += `width: ${this.width}; `;
			}

			return stle;
		},
	},
	data() {
		return {
			fullscreen: false,
			btnHovered: false,
			teleport: true,
        	pageOnly: false,
		}
	},
	beforeMount() {

		if (this.value == '' || !this.value) {
			let out = '';

			for (let i = 0; i < this.minLines - 1; i++) {
				out += `
`;
			}

			this.$emit('input', out);
		}
	},
    methods: {
		highlighter(code) {
			return highlight(code, languages.js);
		},
		addNewLine() {
			this.$emit('input', `${this.value}
`);
		},
    },
};
</script>