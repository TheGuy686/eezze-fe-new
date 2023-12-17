<template>
<open-api
    :api="jsonApi"
    md-theme="default"
    :query-params="queryParams"
    :headers="headers"
></open-api>
</template>

<script>
import jsonApi from '../../plugins/swagger.json';
import OpenApi from 'vue-openapi';

export default {
    components: { OpenApi },
    data() {
        return {
            jsonApi: jsonApi,
            queryParams: {
                userId: 'john_doe'
            },
            headers: {
                api_key: 'my_api_key'
            }
        }
    },
}
</script>
