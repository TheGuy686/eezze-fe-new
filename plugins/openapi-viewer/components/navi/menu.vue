<style scoped>

.item {
    border-bottom: solid 1px grey;
    margin-bottom: 10px;
}

.item:hover {
    cursor: pointer;
    background: blue;
    color: white;
}
</style>

<template>
<div>

    <a href=":2000/home" @click.prevent="menuItemClicked({ isNew: false, key: 'home' })">

        Back to site

    </a>

    <hr />


    <div class="item" :key="r.key" v-for="r in routes" @click="menuItemClicked(r)">

        {{ r.label }}

    </div>

</div>
</template>

<script>
import routes from '~/assets/js/routes';

export default {
    computed: {
        routes() {
			return routes.ADMIN_USER_ROLE;
		},
    },
    data() {
        return {

        }
    },
    methods: {
        menuItemClicked(route) {
            if (!route.isNew) {
                const wl = window.location,
                      add = `${wl.protocol}//${wl.hostname}:2000/${route.key}`;

                window.location = add;
            }
            else {
                this.$router.push({ name: route.oKey });
            }
        }
    }
}
</script>
