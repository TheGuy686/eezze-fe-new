<style scoped>
.open-api-root {
	padding: 5px;
}
</style>

<template>
<div class="open-api-root">

    <div v-if="hasData">

        <open-api
            md-theme="dark"
            :api="openApiSpec"
            :query-params="queryParams"
            :headers="headers"
        ></open-api>

    </div>

    <div v-else>

        Loading

    </div>

</div>
</template>

<script>
import OpenApi from '../plugins/vue-openapi';

function emitEvent(event, data) {
	window.parent.postMessage(JSON.stringify({ event: event, data }), '*');
}

export default {
	components: { OpenApi },
    computed: {
        hasData() {
            return typeof this.openApiSpec == 'object' && Object.keys(this.openApiSpec).length > 0;
        }
    },
    data() {
        return {
            openApiSpec: {},
            queryParams: {
                projectId: this.$route.query?.currentProject,
            },
            headers: {
                api_key: 'my_api_key'
            }
        }
    },
    mounted() {
        const self = this;

        window.addEventListener('message', function (event) {
			try {
                if (typeof event.data == 'object') {
                    console.log('skipped message because recieved object: ', event.data);
                    return;
                }

				const data = JSON.parse(event.data);

				switch (data.event) {
					case 'reload-page':
						window.location.reload();
						break;

                case 'load-ds-data':   
                    self.loadDsData(data.data);

					break;
				}
			}
			catch (err) {
				console.log('Error parsing event: ', err);
			}
		});
    },
    methods: {
        async loadDsData(dsId) {
            this.openApiSpec = {};
            
            const url = `${this.$route.query.prUrl}&dsFilter=${dsId}`;

            const res = await this.$axios.get(url, {
                headers: {
                    authorization: this.$route.query.token,
                }
            });

            this.openApiSpec = res.data;
        },
    },
}
</script>
