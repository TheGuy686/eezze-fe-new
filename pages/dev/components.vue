<style>
#components-a-tooltip-demo-color .ant-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>

<template>
  <div>
    <a-page-header title="Eezze Components" />
    
    <!-- <TablePaginated
      :data="entities"
      :columns="columns"
      :showNewButton="true"
      :loading="isDoingRequest"
      :isDoingDeleteRequest="isDoingDeleteRequest"
      @action-new-clicked="$refs['mdl'].show()"
      @action-edit-clicked="$refs['mdl'].show($event)"
      @action-delete-clicked="$store.commit('cms/datasources/type/setDeleteEntity', $event)"
      @action-delete-confirmed="$store.dispatch('cms/datasources/type/deleteEntity', $event)"
    /> -->

    <e-row>

      <e-col w-40>

        contextMenuMdl: {{ contextMenuMdl }}

        <!-- <d :d="tmpData" /> -->

        <br>

        <d :d="entI?.metadata" />

      </e-col>

      <e-col w-60>

        <EFormContextMenu
          name="Dev Test"
          src="components"
          :actionInput="actionInput"
          :actionChain="actionChain"
          v-model="contextMenuMdl"
        />

        <EFormVariableLogic
          clss="pl-2.5"
          src="connection-overrides"
          :hideInput="false"
          mdlKey="connectionId"
          :obj="entI?.metadata"
          @model-changed="entI.metadata = $event"
          @item-deleted="entI.metadata = $event"
        />

      <e-col>

        <a-button @click="openActionChain">OPEN MENU</a-button>

        <EFormBlActionChain 
          ref="action-chain"
          prop="filename"
          type="string"
          :src="innerActionChain"
          :filteredItem="tmpData"
        />

      </e-col>

    </e-col>

    <!-- <div id="components-a-tooltip-demo-color">
      <a-divider orientation="left">Presets</a-divider>
      <div>
        <a-tooltip v-for="color in colors" :key="color" title="prompt text" :color="color">
          <a-button>{{ color }}</a-button>
        </a-tooltip>
      </div>
      <a-divider orientation="left">Custom</a-divider>
      <div>
        <a-tooltip v-for="color in customColors" :key="color" title="prompt text" :color="color">
          <a-button>{{ color }}</a-button>
        </a-tooltip>
      </div>
    </div> -->

  </e-row>

  </div>
</template>

<script>
const data = require('./dev-data');
const actionChain = require('./dev-action-chain');

export default {
  name: 'EezzeComponents',
  // middleware: 'auth',
  layout: 'plain',

  data() {  
    return {
      entI: {
        metadata: {
          "logger": 17,
          "port": 2002,
          "authenticator": 8,
          "protocol": "http",
          "secureProtocol": "https",
          "host": "0.0.0.0",
          "localhost": "localhost",
          "path": "/some-path",
          "connectionId": {
            "example": "",
            "id": "r2dW4dJKof",
            "filterId": "G5WKnXjfdP",
            "property": "",
            "name": "New Item Default",
            "desc": "New Item Default Desc",
            "baseType": "logic-chain",
            "type": "string",
            "raw": {},
            "actions": [
              {
                "id": "nsrC6D0hdL",
                "filterId": "5xipdiWxET",
                "name": "Action 1",
                "type": "string",
                "actions": [
                  {
                    "id": "367kwvxNhM",
                    "filterId": "1PiBFz0G4s",
                    "type": "custom",
                    "name": "Logic item \"0\"",
                    "logic": {
                      "raw": "return 'ryan';",
                      "formula": "",
                      "source": "",
                      "prop": "",
                      "type": "",
                      "subtype": "",
                      "variables": [],
                      "opArgs": []
                    },
                    "returns": "text",
                    "actions": []
                  }
                ]
              }
            ]
          }
        }
    },
    
      filteredInnerActionChainMdl: 'action-0',
      innerActionChain: [ ...data ],
      actionChain: [...actionChain],
      entities: [],
      colors: [
        'pink',
        'red',
        'yellow',
        'orange',
        'cyan',
        'green',
        'blue',
        'purple',
        'geekblue',
        'magenta',
        'volcano',
        'gold',
        'lime',
      ],
      customColors: ['#f50', '#2db7f5', '#87d068', '#108ee9'],
      tmpData: {
        "id": "action-0",
        "property": "filename",
        "name": "New Item Default",
        "desc": "New Item Default Desc",
        "type": "string",
        "actions": []
      },
      isDoingRequest: false, 
      isDoingDeleteRequest: false,
      actionInput: [
        {
          groupId: "eezze",
          id: "ndx2FKc1J1",
          isDynamicItem: true,
          dlKey: "adm.request.requestHeaders",
          key: "adm.request.requestHeaders.authorization",
          title: "authorization"
        },
        {
          groupId: "eezze",
          id: "Yv5O6QKWLo",
          isDynamicItem: true,
          dlKey: "adm.request.requestHeaders",
          key: "adm.request.requestHeaders.anotherHeader",
          title: "anotherHeader",
        }
      ],
      contextMenuMdl: 'adm.request.requestHeaders.authorization',
      columns: [
				{
					title: 'Index',
					dataIndex: 'index',
					sorter: true,
				},
				{
					title: 'Fact',
					dataIndex: 'fact',
					sorter: true,
          format: (val) => {
            return `${val.substr(3)}...`
          }
				},
				{
					title: 'Length',
					dataIndex: 'length',
					sorter: true
				},
			]
    }
  },

  mounted() {
    // this.populateDataTble1();

    // this.os(() => {
    //   console.clear();
    //   console.log(JSON.stringify(this.innerActionChain[0], null, 4));
    // }, 5000);

    // this.openActionChain();
  },

  methods: {
    async populateDataTble1() {
      const res = await this.$axios.get('https://catfact.ninja/fact')

      const arr = [];

      for (let i = 0; i < 20; i++) {
        arr.push({
          index: i,
          ...res.data
        })
      }

      this.entities = arr;
    },
    groupSelected(id) {
      this.selectedKeys.push(id)
    },

    openActionChain() {
      try {
        this.$refs['action-chain'].show(['state', 'stash']);
      }
      catch (err) {
        console.log('Error: ', err);
      }
    }
  }
}
</script>
