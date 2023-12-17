import Vue from "vue";
import VueInteractJs from "vue-interactjs";
import jQuery from 'jquery';

Vue.use(VueInteractJs);

Vue.prototype.$jQuery = jQuery;