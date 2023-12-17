<style lang="less" scoped>

.item-row{
    height: 35px;
    padding: 15px;
	border-top: 1px solid #e0e0e0;
	display: flex;
	align-items: center;
    justify-content: space-evenly;
}

.item-add-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.item-input {
    width: 10vw;
    margin-left: 5px;
}

.index {
    flex: 2;
}

.inputs-cont {
    flex: 22; 
    display: flex;
}

@media screen and (min-width: 1300px) {
    .item-input {
        width: 6vw !important;
        margin-left: 5px;
    }
}

</style>

<template>

    <div>

        <a-row class="item-row">

            <div class="index">

                {{ index + 1 }}.

            </div>

            <div class="inputs-cont">

                <EUiInput
                    :eStyle="(item.type == 'object' ? 'width: 90px;' : '')"
                    :name="tr('key')"
                    :placeholder="tr('input-a-key')"
                    clss="item-input"
                    size="small"
                    :value="item.key"
                    v-cases.camelCase
                    @input="setEntryItemKeyValue({index, key: 'key', value: $event})"
                />

                <EUiInput
                    name="Value"
                    placeholder="Input a value"
                    clss="item-input"
                    size="small"
                    :disabled="item.type == 'object'"
                    :value="item.value"
                    @input="setEntryItemKeyValue({index, key: 'value', value: $event})"
                />

                <EUiSelect
                    name="type"
                    eStyle="width: 150px; margin-left: 4px;"
                    placeholder="Please select a type"
                    :value="item.type"
                    :options="keyTypes"
                    size="small"
                    keyProp="key"
                    valueProp="name"
                    defaultValue="string"
                    @input="handleTypeChange($event)"
                />

                <a-button
                    style="margin-left: 4px;"
                    type="primary"
                    size="small" 
                    shape="circle" 
                    icon="plus" 
                    @click="addEmptyEntityKeyValue({index})"
                    v-if="item.type == 'object'"
                />

            </div>

        </a-row>

        <a-col :style="'align-items: flex-end; margin-top: -12px; ' + subitemContStyle" v-if="item.keyValueItems.length > 0">

            <a-row style="width: 90%; height: 35px;" :key="ii" v-for="(i, ii) in item.keyValueItems">

                <EUiInput
                    :name="tr('key')"
                    placeholder="Input a Key"
                    clss="item-input"
                    size="small"
                    :value="i.key"
                    v-cases.camelCase
                    @input="setEntryItemKeyValue({index, subitemIndex: ii, key: 'key', value: $event})"
                />

                <EUiInput
                    :name="tr('value')"
                    placeholder="Input a value"
                    clss="item-input"
                    size="small"
                    :value="i.value"
                    @input="setEntryItemKeyValue({index, subitemIndex: ii, key: 'value', value: $event})"
                />

                <EUiSelect
                    :name="tr('type')"
                    eStyle="width: 150px; margin-left: 5px;"
                    :placeholder="tr('please-select-a-type')"
                    :value="i.type"
                    :options="keyTypes"
                    :ignoreKeys="[ 'object' ]"
                    size="small"
                    keyProp="key"
                    valueProp="name"
                    defaultValue="string"
                    @input="setEntryItemKeyValue({index, subitemIndex: ii, key: 'type', value: $event})"
                />

                <a-button
                    style="margin-left: 4px;"
                    type="primary"
                    size="small" 
                    shape="circle" 
                    icon="minus" 
                    @click="deleteKeyValueItem({index, subitemIndex: ii})"
                />

            </a-row>

        </a-col>

    </div>

</template>

<script>

import {mapState, mapMutations} from 'vuex';

export default {
    props: {
        index: {type: Number},
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        typeOptionsP() {
            let out = [];

            this.typeOptions.forEach(
                i => {
                    // here we ignore the option if it shouldn't / does pass the "showIf" show 
                    if (typeof i['showIf'] == 'function' && !i['showIf']()) return;

                    out.push(i);
                }
            );  

            return out;
        },
        subitemContStyle() {
			let itemHeight;

            if (this.item.keyValueItems.length == 1) itemHeight = 55;
            else if(this.item.keyValueItems.length < 5) {
                itemHeight = 43.5;
            }
            else if(this.item.keyValueItems.length > 5 && this.item.keyValueItems.length < 10) {
                itemHeight = 40;
            }
            else {
                itemHeight = 37;
            }

			let totHeight = itemHeight * this.item.keyValueItems.length;

			return `height: ${totHeight}px;`;
		},
        ...mapState('project/data-sources', ['keyTypes']),
    },
    methods: {
        handleTypeChange(value) {
            if (value == 'object') {
                this.setEntryItemKeyValue({index: this.index, key: 'value', value: ''})
            }
            this.setEntryItemKeyValue({index: this.index, key: 'type', value: value})
        },
        ...mapMutations({
			setEntryItemKeyValue: 'project/data-sources/setEntryItemKeyValue',
            addEmptyEntityKeyValue: 'project/data-sources/addEmptyEntityKeyValue',
            deleteKeyValueItem: 'project/data-sources/deleteKeyValueItem',
		}),
    }
};
</script>