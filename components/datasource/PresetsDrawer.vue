<style lang="less" scoped>

.preset-option:hover {
    cursor: pointer;
    background-color: #40a9ff55;
}

.props-header-cont {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
}

</style>

<template>
<a-drawer
    title="Presets"
    placement="right"
    :width="500"
    :closable="true"
    :visible="visible"
    @close="visible = false"
>
    <div class="certain-category-search-wrapper" style="width: 250px">

        <h2>Datasource Presets</h2>

        <a-input
            :style="{'margin-bottom': '10px'}"
            placeholder="Search Presets"
            v-model="search"
        >

            <a-icon slot="suffix" type="search" class="certain-category-icon" />

        </a-input>

    </div>    

    <a-list size="small" item-layout="horizontal" :data-source="filteredPresets">

        <a-list-item slot="renderItem" slot-scope="item">

            <a-list-item-meta>

                <div slot="title" style="color: rgba(0, 0, 0, 0.65);">
                
                    <b>{{ item.name }}</b>
                    
                </div>

                <div slot="description" style="color: rgba(0, 0, 0, 0.65);">
                
                    {{ item.description }}
                    
                    <a-col>

                        <span
                            class="preset-option"
                            v-for="ii, i in item.children"
                            :key="i"
                            @click="presetClicked(item, ii)"
                        >
                        
                            - {{ ii.name }}

                        </span>

                    </a-col>

                </div>

            </a-list-item-meta>

        </a-list-item>

    </a-list>

    <a-drawer
        :title="`${chosenPreset && chosenPreset['name'] ? chosenPreset['name'] :  ''} - ${typeof chosenPreset == 'object' && chosenPreset.preset ? chosenPreset.preset.name : ''}`"
        width="500"
        :closable="true"
        :visible="preSetDetailsVis"
        @close="preSetDetailsVis = false"
    >

        <p>{{ chosenPreset ? chosenPreset.description : '' }}</p>

        <a-divider />

        <div class="props-header-cont">

            <h3>Properties</h3>

            <a-button 
                type="primary" 
                size="small"
                :disabled="chosenPresetProps.length == 0"
                @click="applyPresets"
            >

                Apply to Project

            </a-button>

        </div>

        <a-list
            class="demo-loadmore-list"
            item-layout="horizontal"
            :data-source="chosenPresetProps"
        >
            <a-list-item slot="renderItem" slot-scope="item">

                <a-list-item-meta >

                    <span slot="title">

                        <b>{{ item.key }}</b> 
                        
                        <a-tag :color="keyTypesColors[item.type].color" >

                            {{ keyTypesColors[item.type].label }}

                        </a-tag>

                    </span>

                </a-list-item-meta>

                <a slot="actions">
                    
                    <a-popover placement="leftTop">

                        <template slot="title">

                            <span>Json Schema</span>

                        </template>

                        <a-button size="small">
                            
                            <a-icon type="database" />

                        </a-button>

                        <template slot="content">

                            <div style="width: 250px;">

                                <json-viewer
                                    :value="item"
                                    :expand-depth=5
                                    copyable
                                />

                            </div>

                        </template>

                    </a-popover>

                </a>

            </a-list-item>

        </a-list>

    </a-drawer>

</a-drawer>
</template>

<script>

import {mapState, mapMutations} from 'vuex';

export default {
    computed: {
        filteredPresets() {
            let data = [...this.dataSourcePresets]

            let s = this.search;

            let out = [];

            data.filter(
                (item) => {
                    if (item.key == s) return item;
                    
                    let i = {
                        key: item.key,
                        name: item.name,
                        description: item.description,
                        children: [],
                    };

                    for (let ii of item.children) {
                        if (JSON.stringify(ii).indexOf(s) == -1) continue;

                        i.children.push(ii);
                    }

                    if (i.children.length > 0) {
                        out.push(i);
                    }
                }
            );

            return out;
        },
        chosenPresetProps() {
            if (typeof this.chosenPreset != 'object' || typeof this.chosenPreset.preset != 'object') return [];

            return this.chosenPreset.preset.properties;
        },
        ...mapState('project/data-sources', [
            'chosenPreset', 
            'dataSourcePresets',
            'keyTypesColors'
        ]),
    },
    data() {
        return {
            visible: false,
            preSetDetailsVis: false,
            search: '',
        }
    },
    methods: {
        show() {this.visible = true},
        hide() {this.visible = false},

        presetClicked(mainItem, item) {
            this.setChosenPreset({
                id: mainItem.id,
                name: mainItem.name,
                description: mainItem.description,
                preset: item,
            });
            this.preSetDetailsVis = true;
        },

        closeAfterCreate() {
            this.preSetDetailsVis = false;

            setTimeout(() => this.hide(), 350);

            setTimeout(() => {
                this.setChosenPreset({});

                this.$notification.success(
                    {
                        placement: 'topRight',
                        message: 'Action Success',
                        description: 'Preset was successfully applied',
                    }
                );
            },
            450);
        },

        applyPresets() {
            let preset = this.chosenPreset.preset;

            this.addEntityFromPreset({
                entityObj: {
                    key: generateRandomString(10),
                    type: preset.key,
                    name: preset.name,
                    description: preset.description,
                    keyValueItems: this.chosenPreset.preset.properties,
                },
                completedCb: this.closeAfterCreate
            })
        },

        ...mapMutations({
			setChosenPreset: 'project/data-sources/setChosenPreset',
            addEntityFromPreset: 'project/data-sources/addEntityFromPreset',
		}),
    }
};
</script>