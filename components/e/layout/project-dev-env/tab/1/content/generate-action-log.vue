<style lang="less">
@import "~/assets/styles/custom/main.less";

.main-list-action-logs-cont {

    .ant-timeline {
        max-height: 37vh !important;
        overflow-y: scroll;

        &::-webkit-scrollbar {
            width: 10px;
            cursor: pointer;
        }

        &::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        &::-webkit-scrollbar-thumb {
            background: rgb(177, 175, 175);
            border-radius: 20px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #555;
            border-radius: 20px;
            cursor: pointer;
        }
    }

    .logs-cont {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        
        .header {
            padding: 8px 16px;
            border-bottom: 1px solid #e8e8e8;

            b {
                font-size: 11px;
            } 
        }

        .tl-content {
            padding: 10px;
        }
    }

    .gen-log-item {
        font-size: 11px;
        letter-spacing: 0.055rem;
        display: flex;
        vertical-align: middle;

        .cmd-title {
            padding-top: 4px;
            margin-bottom: 8px;
            font-weight: bold;
        }

        .icn-success {
            color: green;
            font-weight: bold;
            font-size: 13px;
        }

        .icn-error {
            color: red;
            font-weight: bold;
            font-size: 13px;
        }
    }
}
</style>

<template>
<div class="main-list-action-logs-cont">

    <div class="logs-cont" v-if="Object.keys(genCmdLogs).length > 0">

        <a-row class="header">

            <b>Generation Actions Log</b>

        </a-row>

        <a-timeline class="tl-content">

            <a-timeline-item
                class="gen-log-item"
                color="green"
                :key="key"
                v-for="(logs, key) in genCmdLogs"
            >
                <h3 class="cmd-title">GENERATING: {{ key.toUpperCase() }}</h3>

                <p :key="ii" v-for="(log, ii) in logs">
                    
                    <span v-html="formatItemMessage(log.message)" />

                    <a-icon 
                        :type="log.success ? 'check-circle' : 'close-circle'"
                        :class="log.success ? 'icn-success' : 'icn-error'"
                        v-if="shouldShowIcon(log)"
                    />
                    
                </p>

            </a-timeline-item>

        </a-timeline>

    </div>

    <div v-else>

        <a-empty />

        <div style="height: 30px;" />

    </div>

</div>
</template>

<script lang="ts">
import {mapState} from 'vuex';

let self: any;

function objToString(obj: any) {
	var stack = '';

	for (let property in obj) {
		if (obj.hasOwnProperty(property)) {
			if (typeof obj[property] == "object") {
				stack = stack + objToString(obj[property]);
			}
			else {
				stack = stack + obj[property] + ' ';
			}
		}
	}

	return String(stack);
}

export default {
    beforeCreate() {self = this},
    computed: {
        ...mapState('dev/servers/gen-ws', ['genCmdLogs']),
    },
    data() {
        return {
            search: '',
            searchColumns: [],
            searchColumnFormatter: undefined,
        }
    },
    methods: {
        shouldShowIcon(cmd: any) {
            if (typeof cmd['success'] == 'undefined') return false;
            return true;
        },
        formatItemMessage(message: string) {
            if (!/^(.*?:)/.test(message)) return `<b><i>${message}</i></b>`;
            return message.replace(/^(.*?:)/, '<b><i>$1</i></b>');
        },
        formatTime(d: number) {
            let dte = new Date(d);

            return `${dte.getUTCHours()}:${dte.getMinutes()}`;
        },
        searchData(data: Array<Object>) {
			let search = String(self.search).toLowerCase();

			let matches: Array<Object> = [];

			let key, propVal;

			data.forEach((obj: any) =>
				{
					if (typeof obj == 'object')
					{
						let column: any;
						let searchItem: any = {};

						if (typeof self.searchColumns === 'object' && self.searchColumns.length > 0)
						{
							for (key in self.searchColumns)
							{
								column = self.searchColumns[key];

								if (column in obj) searchItem[column] = obj[column];
							}

							if (typeof self.searchColumnFormatter === 'function')
							{
								propVal = objToString(self.searchColumnFormatter(searchItem)).toLowerCase();
							}
							else
							{
								propVal = objToString(searchItem).toLowerCase();
							}
						}
						else
						{
							if (typeof self.searchColumnFormatter === 'function')
							{
								propVal = objToString(self.searchColumnFormatter(searchItem)).toLowerCase();
							}
							else
							{
								propVal = objToString(obj).toLowerCase();
							}
						}

						if (propVal && (propVal.indexOf(search) >= 0))
						{
							matches.push(obj);
						}
					}
				}
			);

            matches.sort((a: any, b: any) => {
                return parseFloat(b.createdAt) - parseFloat(a.createdAt);
            });

			return matches;
		},
    }
};
</script>
