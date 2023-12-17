<style lang="less">
@import "~/assets/styles/custom/main.less";

.main-list-logs-cont {
    padding-top: 40px;

    .color-path-cont {
        justify-content: space-between;
        display: flex;
        flex: auto !important;

        .color-patch {
            padding: 0.01px;
            align-items: center;
            border-radius: 5px;
            border: 1px solid white;

            &:hover {cursor: pointer;}
        }

        .color-patch-active {
            padding: 0.01px;
            align-items: center;
            border-radius: 5px;
            border: 1px solid #012840;

            &:hover {cursor: pointer;}
        }
    }
    
    .list-logs {
        .ant-list-items {
            max-height: 63vh !important;
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

            .ant-list-item {
                padding-top: 4px;
                padding-bottom: 4px;

                &:hover {
                    background-color: #efefef;
                }
            }
        }

        .li-col-cont {
            font-size: 11px;

            .tool-tip-cont {
                display: flex; 
                flex-direction: row; 
                align-items: center;
            }
        }
    }

    .li-cus-badge {
        font-size: 10px;
        background-color: red;
        color: white;
        margin-left: 5px;
        border-radius: 4px;
        height: 8px;
        width: 8px;
        margin-right: 5px;
    }

    .badge-txt-debug {background-color: #13c2c2;}
    .badge-txt-info {background-color: #2f54eb;}
    .badge-txt-warn {background-color: #fa8c16;}
    .badge-txt-error {background-color: #eb2f96;}
    .badge-txt-critical {background-color: #f5222d;}
    .badge-txt-success {background-color: #52c41a;}
}
</style>

<template>
<div class="main-list-logs-cont">

    <EFormInput
        :allowClear="true"
        v-model="search"
    />

    <a-row class="color-path-cont mt-5 mb-2">

        <a-row :class="filteredType == 'DEBUG' ? 'color-patch-active' : 'color-patch'">

            <div class="li-cus-badge badge-txt-debug" />

            <span @click="filteredType = 'DEBUG'">{{ tr('debug', { toUpper: true }) }}</span>

            <div style="width: 20px;"></div>

        </a-row>

        <a-row :class=" 'pr-1 ' + (filteredType == 'INFO' ? 'color-patch-active' : 'color-patch')">

            <div class="li-cus-badge badge-txt-info" />

            <span @click="filteredType = 'INFO'">{{ tr('info', { toUpper: true }) }}</span>

        </a-row>

        <a-row :class="filteredType == 'WARN' ? 'color-patch-active' : 'color-patch'">

            <div class="li-cus-badge badge-txt-warn" />

            <span @click="filteredType = 'WARN'">{{ tr('warn', { toUpper: true }) }}</span>

            <div style="width: 10px;"></div>

        </a-row>

        <a-row :class="filteredType == 'ERROR' ? 'color-patch-active' : 'color-patch'">

            <div class="li-cus-badge badge-txt-error" />

            <span @click="filteredType = 'ERROR'">{{ tr('error', { toUpper: true }) }}</span>

            <div style="width: 10px;"></div>

        </a-row>

        <a-row :class="filteredType == 'CRITICAL' ? 'color-patch-active' : 'color-patch'">

            <div class="li-cus-badge badge-txt-critical" />

            <span @click="filteredType = 'CRITICAL'">{{ tr('critical', { toUpper: true }) }}</span>

            <div style="width: 10px;"></div>

        </a-row>

        <a-row :class="'pr-1 ' + (filteredType == 'SUCCESS' ? 'color-patch-active' : 'color-patch')">

            <div class="li-cus-badge badge-txt-success" />

            <span @click="filteredType = 'SUCCESS'">{{ tr('success', { toUpper: true }) }}</span>

        </a-row>

    </a-row>

    <div v-if="logsDesc.length > 0">

        <a-list class="list-logs" size="small" bordered :data-source="logsDesc">

            <a-row slot="header" no-padding>

                <a-col :span="8" no-padding class="li-col-cont">

                    <b>{{ tr('path') }}</b>

                </a-col>

                <a-col :span="16" no-padding class="li-col-cont">

                    <b>{{ tr('message') }}</b>

                </a-col>

            </a-row>

            <a-list-item size="small" slot="renderItem" slot-scope="item">

                <a-col :span="8" no-padding class="li-col-cont">

                    <a-row no-padding ver-center>

                        <a-tooltip placement="right">

                            <template slot="title">

                                {{ item.level }}: {{ item.urlPath }}

                            </template>

                            <div class="tool-tip-cont">

                                {{ item.urlPath }}

                                <div :class="'li-cus-badge badge-txt-' + item.level.toLowerCase()" />

                            </div>

                        </a-tooltip>

                    </a-row>

                </a-col>

                <a-col :span="16" no-padding class="li-col-cont">

                    {{ formatTime(item.createdAt) }}: {{ item.message }}

                </a-col>

            </a-list-item>

        </a-list>

    </div>

    <div v-else>

        <a-empty class="mt-5"/>

        <div style="height: 30px;" />

    </div>

</div>
</template>

<script>
import {mapState} from 'vuex';

function objToString(obj) {
	var stack = '';

	for (let property in obj) {
		if (obj.hasOwnProperty(property)) {
			if (typeof obj[property] == "object") {
				stack = stack + objToString(obj[property]);
			}
			else stack = stack + obj[property] + ' ';
		}
	}

	return String(stack);
}

export default {
    computed: {
        logsDesc() {
            return this.searchData([...this.logs.filter((l) => {
                return !/unit-test/.test(l?.callSrc ?? '');
            })]);
        },
        ...mapState('dev/servers/gen-ws', [ 'logs' ]),
    },
    data() {
        return {
            filteredType: 'INFO',
            search: '',
            searchColumns: [],
            searchColumnFormatter: undefined,
        };
    },
    methods: {
        formatTime(d) {
            let dte = new Date(d);

            const hrs = dte.getUTCHours(), mins = dte.getMinutes();

            return `${hrs < 10 ? '0' + hrs : hrs}:${mins < 10 ? '0' + mins : mins}`;
        },
        searchData(data) {
			let search = String(this.search).toLowerCase();

			let matches = [];

			let key, propVal;

			data.forEach((obj) =>
				{
                    if (this.filteredType != '' && obj?.['level'] != this.filteredType) return;

					if (typeof obj == 'object')
					{
						let column, searchItem = {};

						if (typeof this.searchColumns === 'object' && this.searchColumns.length > 0)
						{
							for (key in this.searchColumns)
							{
								column = this.searchColumns[key];

								if (column in obj) searchItem[column] = obj[column];
							}

							if (typeof this.searchColumnFormatter === 'function')
							{
								propVal = objToString(this.searchColumnFormatter(searchItem)).toLowerCase();
							}
							else
							{
								propVal = objToString(searchItem).toLowerCase();
							}
						}
						else
						{
							if (typeof this.searchColumnFormatter === 'function')
							{
								propVal = objToString(this.searchColumnFormatter(searchItem)).toLowerCase();
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

            matches.sort((a, b) => parseFloat(b.createdAt) - parseFloat(a.createdAt));

			return matches;
		},
    }
};
</script>
