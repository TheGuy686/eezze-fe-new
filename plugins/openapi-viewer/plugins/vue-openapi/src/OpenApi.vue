<style lang="css">
@import "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900";
@import "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css";
@import "https://fonts.googleapis.com/css?family=Material+Icons";

/* .md-primary {
  color: pink;
} */

.openapi {
  position:relative;
  overflow-x:hidden;
  height:100%;
}

.md-theme-default.md-tabs>.md-tabs-navigation {
  background-color: black;
}

.md-theme-default.md-button:not([disabled]).md-accent.md-raised {
  background-color: #f4511e;
  color: rgba(255, 255, 255, .87);
}

.md-theme-default.md-button:not([disabled]).md-primary.md-raised, .md-theme-default.md-button:not([disabled]).md-primary.md-fab {
  background-color: #000;
  color: rgba(255, 255, 255, .87);
}

.md-menu-content .md-theme-default.md-list {
  background-color: #fff;
  color: black;
}

.md-theme-default.md-select-content .md-menu-item.md-selected, .md-theme-default.md-select-content .md-menu-item.md-checked {
  color: black;
}

.md-theme-default.md-icon.md-accent {
  color: #f4511e;
}

.md-theme-default.md-subheader.md-accent {
  color: #f4511e;
}

.md-theme-default a:not(.md-button) {
  color: #f4511e;
}

.md-theme-default.md-chip.md-primary {
  color: rgba(255, 255, 255, .87);
  background-color: #000;
}

.md-theme-default :not(input):not(textarea)::selection {
  background: #f4511e;;
  color: rgba(255, 255, 255, .87);
}

.openapi #request-form {
  padding: 16px;
}

.openapi .md-table .md-table-cell.md-has-action .md-table-cell-container {
  display: inherit;
}

.schema-dialog .md-dialog, .examples-dialog .md-dialog{
  min-width: 800px;
}

.openapi .entry-description {
  margin: 0;
}

body {
	overflow: scroll !important;
	overflow-x: hidden !important;

	/* width */
	&::-webkit-scrollbar {
		width: 5px;
	}

	/* Track */
	&::-webkit-scrollbar-track {
		box-shadow: inset 0 0 5px grey;
		border-radius: 10px;
	}

	/* Handle */
	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
	}
}

.creator-info {
  margin-right: 0%;
  margin-left: 8%;
}

</style>

<template>
<div class="openapi" e-scroll>

  <md-layout md-column>

    <md-layout md-row md-flex="90" md-align="center">

      <!-- <md-layout md-column md-flex="65">
        <h2 class="md-display-2">{{api.info.title}}</h2>
        <div v-if="api.info.description" v-html="marked(api.info.description || '')"></div>
      </md-layout>
      <md-layout md-flex="5"></md-layout> -->

<!-- 
  old creator-info
  
  <md-list-item v-if="api.info.version">
<md-icon>label</md-icon> <span>{{api.info.version}}</span>
</md-list-item>
<md-list-item v-if="api.info.termsOfService">
<md-icon>description</md-icon> <span><a :href="api.info.termsOfService">Terms of Service</a></span>
</md-list-item> -->

      <!-- <md-layout class="creator-info" md-column md-flex="20">

        <md-layout md-flex="true"></md-layout>

        <md-card v-if="api.info">

          <md-list>

            <md-list-item v-if="api.info.contact && api.info.contact.url">

              <md-icon>home</md-icon> <span><a :href="api.info.contact.url">{{api.info.contact.name || api.info.contact.url}}</a></span>
            
            </md-list-item>

            <md-list-item v-if="api.info.contact && api.info.contact.email">

              <md-icon>email</md-icon> <span><a :href="'mailto:'+api.info.contact.email">{{api.info.contact.email}}</a></span>
            
            </md-list-item>



          </md-list>

        </md-card>

        <md-layout md-flex="true"></md-layout>

      </md-layout>-->

    </md-layout> 

    <md-layout md-row style="flex-wrap: nowrap;">

      <md-list class="md-dense" ref="menu">

        <md-list-item v-for="(entries, tag) in tags" :key="tag" ref="li-item" md-expand-multiple>

          <span class="md-title">{{tag}}</span>

          <md-list-expand>

            <md-list>
              
              <md-list-item v-for="(entry, i) in entries" :key="i" @click.native="select(entry)" style="cursor:pointer">
                
                <md-subheader class="md-title" :class="{'md-accent':selectedEntry === entry}" v-html="entry.path.replace(/\//g,'<b>/</b>')"></md-subheader>
                
                <md-subheader :md-theme="entry.method" class="md-primary">{{entry.method}}</md-subheader>
              
              </md-list-item>

            </md-list>

          </md-list-expand>

        </md-list-item>

      </md-list>

      <md-layout md-flex-offset="5" md-flex="true" v-if="!selectedEntry">

        <p>Select an entry on the left to see detailed information...</p>

      </md-layout>

      <md-layout md-column md-flex-offset="5" md-flex="true" v-if="selectedEntry">
        
        <h2 class="md-title">{{selectedEntry.title || selectedEntry.summary}}</h2>
        
        <p class="entry-description" v-if="selectedEntry.description" v-html="marked(selectedEntry.description || '')"></p>
        
        <h3 class="md-subheading">
          
          {{ selectedEntry.method.toUpperCase()}} {{ (api.servers && api.servers.length ? api.servers[0].url : '') + selectedEntry.path }}
        
        </h3>
        
        <md-tabs md-right class="md-transparent" style="margin-top:-54px">
          
          <md-tab md-label="Documentation">
            
            <h4 v-if="(selectedEntry.parameters && selectedEntry.parameters.length) || selectedEntry.requestBody">Parameters</h4>
            
            <parameters-table :selectedEntry="selectedEntry" :openSchemaDialog="openSchemaDialog" :openExamplesDialog="openExamplesDialog" />
            
            <h4>Responses</h4>
            
            <responses-table :selectedEntry="selectedEntry" :openSchemaDialog="openSchemaDialog" :openExamplesDialog="openExamplesDialog" :openFieldsDialog="openFieldsDialog" />
          
          </md-tab>

          <md-tab v-if="api.servers && api.servers.length" md-label="Make request">

            <md-layout md-row>

              <md-layout md-column md-flex="40">

                <h2>Request</h2>

                <request-form :selectedEntry="selectedEntry" :currentRequest="currentRequest"></request-form>
                
                <div>

                  <md-button class="md-raised md-accent" @click.native="request">Execute</md-button>
                
                </div>

              </md-layout>

              <md-layout md-column md-flex="60">

                <h2>Response</h2>

                <response-display v-if="currentResponse" :entry="selectedEntry" :response="currentResponse"></response-display>
              
              </md-layout>

            </md-layout>

          </md-tab>

        </md-tabs>

      </md-layout>

    </md-layout>

  </md-layout>

  <md-dialog ref="schemaDialog" class="schema-dialog">

    <md-dialog-title>Schema</md-dialog-title>

    <md-dialog-content>

      <md-tabs>

        <md-tab id="tree" md-label="Tree">

          <schema-view :schema="currentSchema"></schema-view>

        </md-tab>

        <md-tab id="raw" md-label="Raw">

          <pre>{{ stringify(currentSchema, null, 2)}}</pre>

        </md-tab>

      </md-tabs>

    </md-dialog-content>

    <md-dialog-actions>

      <md-button @click.native="$refs.schemaDialog.close()">ok</md-button>

    </md-dialog-actions>

  </md-dialog>

  <md-dialog ref="examplesDialog" class="examples-dialog">

    <md-dialog-title>Examples</md-dialog-title>


    <md-dialog-content>

      <md-tabs>

        <md-tab v-for="(example, label) in currentExamples" :md-label="label">

          <h5>{{example.summary}}</h5>

          <pre>{{ stringify(example.value, null, 2)}}</pre>

        </md-tab>

      </md-tabs>

    </md-dialog-content>

    <md-dialog-actions>

      <md-button @click.native="$refs.examplesDialog.close()">ok</md-button>

    </md-dialog-actions>

  </md-dialog>

  <md-dialog ref="fieldsDialog" class="fields-dialog">

    <md-dialog-title>Fields</md-dialog-title>

    <md-dialog-content>

       <md-table>

         <md-table-header>

           <md-table-row>

             <md-table-head>Name</md-table-head>

             <md-table-head>Description</md-table-head>

             <md-table-head>Type</md-table-head>

             <md-table-head>Values</md-table-head>

           </md-table-row>

         </md-table-header>

         <md-table-body>

           <md-table-row v-for="(field, name) in currentFields" :key="name">
              
            <md-table-cell>{{name}}</md-table-cell>
              
              <md-table-cell v-html="marked(field.description || '')"></md-table-cell>
              
              <md-table-cell v-if="field.schema.type !== 'array'">{{field.schema.type}}</md-table-cell>
              
              <md-table-cell v-if="field.schema.type === 'array'">{{field.schema.items.type}} array</md-table-cell>
              
              <md-table-cell v-if="field.schema.type !== 'array' && field.schema.enum">{{field.schema.enum.join(', ')}}</md-table-cell>
              
              <md-table-cell v-if="field.schema.type === 'array'">
                
                <div style="overflow-y:scroll;max-height:200px;">{{(field.schema.items.enum || []).join(', ')}}</div>
              
              </md-table-cell>

             <md-table-cell v-else />

           </md-table-row>

         </md-table-body>

       </md-table>

    </md-dialog-content>

    <md-dialog-actions>

      <md-button @click.native="$refs.fieldsDialog.close()">ok</md-button>

    </md-dialog-actions>

  </md-dialog>

</div>
</template>

<script>
import Vue from 'vue'
import marked from 'marked'
import RequestForm from './RequestForm.vue'
import ResponseDisplay from './ResponseDisplay.vue'
import ResponsesTable from './ResponsesTable.vue'
import ParametersTable from './ParametersTable.vue'
import SchemaView from './SchemaView.vue'
import VueMaterial from 'vue-material'
import deref from 'json-schema-ref-parser'
import stringify from 'json-stringify-pretty-compact'

Vue.use(VueMaterial)

export default {
  name: 'open-api',
  components: {
    RequestForm,
    ResponseDisplay,
    ResponsesTable,
    ParametersTable,
    SchemaView
  },
  props: ['api', 'headers', 'queryParams'],
  data: () => ({
    selectedEntry: null,
    currentSchema: ' ',
    currentExamples: {},
    currentFields: {},
    currentRequest: {
      contentType: '',
      body: '',
      params: {}
    },
    currentResponse: null,
    tags: {}
  }),
  mounted: function() {
    if (this.$refs.menu.$children.length) this.$refs.menu.$children[0].toggleExpandList()

    setTimeout(() => {
      try {
        const keys = Object.keys(this.tags);

        if (keys.length > 0) {
          const paths = this.tags[keys[0]];

          if (paths.length > 0) {
            this.select(paths[0]);
          }
        }
      }
      catch (err) {}

    }, 200);
  },
  created() {
    getTags(this.api).then(tags => {
      this.tags = tags
    })
  },
  methods: {
    marked,
    stringify,
    reset(entry) {
      const newParams = {};
      (entry.parameters || []).forEach(p => {
        newParams[p.name] = (p.in === 'query' && this.queryParams && this.queryParams[p.name]) || (p.in === 'header' && this.headers && this.headers[p.name]) || null
        if (!newParams[p.name]) {
          if (p.schema && p.schema.enum) {
            newParams[p.name] = p.schema.enum[0]
          }
          if (p.schema && p.schema.type === 'array') {
            newParams[p.name] = []
          }
          if (p.example) {
            newParams[p.name] = p.example
          }
        }
      })
      this.currentRequest.params = newParams
      if (entry.requestBody) {
        this.currentRequest.contentType = entry.requestBody.selectedType
        const example = entry.requestBody.content[this.currentRequest.contentType].example
        this.currentRequest.body = typeof example === 'string' ? example : stringify(example, null, 2)
      }
    },
    select(entry) {
      this.reset(entry)
      this.selectedEntry = entry
    },
    openSchemaDialog(schema) {
      this.currentSchema = schema
      this.$refs.schemaDialog.open()
    },
    openExamplesDialog(examples) {
      this.currentExamples = examples
      this.$refs.examplesDialog.open()
    },
    openFieldsDialog(fields) {
      this.currentFields = fields
      this.$refs.fieldsDialog.open()
    },
    request() {
      this.currentResponse = null
      fetch(this.currentRequest, this.selectedEntry, this.api).then(res => {
        this.currentResponse = res
      }, res => {
        this.currentResponse = res
      })
    }
  }
}

/*
 * HTTP requests utils
 */

function fetch(request, entry, api) {
  let params = Object.assign({}, ...(entry.parameters || [])
    .filter(p => p.in === 'query' && (p.schema.type === 'array' ? request.params[p.name].length : request.params[p.name]))
    .map(p => ({
      // TODO : join character for array should depend of p.style
      [p.name]: p.schema.type === 'array' ? request.params[p.name].join(',') : request.params[p.name]
    }))
  )
  let headers = Object.assign({}, ...(entry.parameters || [])
    .filter(p => p.in === 'header' && (p.schema.type === 'array' ? request.params[p.name].length : request.params[p.name]))
    .map(p => ({
      // TODO : join character for array should depend of p.style
      [p.name]: p.schema.type === 'array' ? request.params[p.name].join(',') : request.params[p.name]
    }))
  )
  const httpRequest = {
    method: entry.method,
    url: api.servers.length && (api.servers[0].url + entry.path.replace(/{(\w*)}/g, (m, key) => {
      return request.params[key]
    })),
    params,
    headers
  }
  if (entry.requestBody) {
    httpRequest.headers['Content-type'] = entry.requestBody.selectedType
    httpRequest.body = request.body
  }
  return Vue.http(httpRequest)
}

/*
 * Tags management utils
 */

const defaultStyle = {
  query: 'form',
  path: 'simple',
  header: 'simple',
  cookie: 'form'
}

function processContent(contentType, api) {
  // Spec allow examples as an item or an array. In the API or in the schema
  // we always fall back on an array
  if (contentType.schema) {
    contentType.examples = contentType.examples || contentType.schema.examples
    contentType.example = contentType.example || contentType.schema.example
  }

  if (contentType.example) {
    contentType.examples = [contentType.example]
  }
}

async function getTags(api) {
  const derefAPI = await deref.dereference(api)
  const tags = {}
  Object.keys(derefAPI.paths).forEach(path => {
    Object.keys(derefAPI.paths[path])
    .filter(method => ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'].indexOf(method.toLowerCase()) !== -1)
    .forEach(method => {
      const entry = derefAPI.paths[path][method]
      entry.method = method
      entry.path = path
      // Filling tags entries
      entry.tags = entry.tags || []
      if (!entry.tags.length) {
        entry.tags.push('No category')
      }
      entry.tags.forEach(tag => {
        tags[tag] = tags[tag] || []
        tags[tag].push(entry)
      })

      entry.parameters = entry.parameters || []
      if (derefAPI.paths[path].parameters) {
        entry.parameters = derefAPI.paths[path].parameters.concat(entry.parameters)
      }
      if (entry.parameters) {
        entry.parameters.forEach(p => {
          p.style = p.style || defaultStyle[p.in]
          p.explode = p.explode || (p.style === 'form')
          p.schema = p.schema || { type: 'string' }
        })
      }
      if (entry.requestBody) {
        if (entry.requestBody.content) {
          Vue.set(entry.requestBody, 'selectedType', Object.keys(entry.requestBody.content)[0])
          entry.requestBody.required = true
          Object.values(entry.requestBody.content).forEach(contentType => processContent(contentType, api))
        }
      }

      // Some preprocessing with responses
      entry.responses = entry.responses || {}
      Object.values(entry.responses).forEach(response => {
        if (response.content) {
          // preselecting responses mime-type
          Vue.set(response, 'selectedType', Object.keys(response.content)[0])
          Object.values(response.content).forEach(contentType => processContent(contentType, api))
        }
      })
    })
  })
  return tags
}

</script>
