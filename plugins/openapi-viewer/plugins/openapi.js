import Vue from "vue";
import VueMaterial from 'vue-material';
import VueResource from 'vue-resource';

import './vue-openapi/md.css';

Vue.use(VueMaterial);
Vue.use(VueResource);

Vue.material = {
    ...Vue.material,
    theming: {

    },
};

Vue.material.registerTheme({
    get: {
      primary: 'blue'
    },
    post: {
      primary: 'green'
    },
    put: {
      primary: 'orange'
    },
    patch: {
      primary: 'orange'
    },
    delete: {
      primary: 'red'
    }
});