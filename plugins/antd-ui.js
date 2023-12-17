/**
 * Antdv
 * All components
 * Check https://github.com/vueComponent/ant-design-vue/blob/master/components/index.js
 */
require('../classes/globals');

import Vue from 'vue';

import * as endpoints from '../consts/Endpoints';
import JsonViewer from 'vue-json-viewer/ssr';
import mavonEditor from './mavon-editor/dist/mavon-editor';
import vueClickOutsideElement from 'vue-click-outside-element';

import Verte from 'verte';

import 'verte/dist/verte.css';
import 'vue-json-viewer/style.css';
import './mavon-editor/css/index.css';

import JsonEditor from 'vue-json-edit';
import VueResource from 'vue-resource';
import VueFullscreen from 'vue-fullscreen';

Vue.use(JsonViewer);
Vue.use(mavonEditor);
Vue.use(JsonEditor);
Vue.use(vueClickOutsideElement);
Vue.use(VueResource);
Vue.use(VueFullscreen);

import {
  // Affix,
  // Anchor,
  AutoComplete,
  Alert,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Collapse,
  Carousel,
  // Cascader,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
//   FormModel,
  Icon,
  Input,
  InputNumber,
  Layout,
  List,
  // LocaleProvider,
  Menu,
  Mentions,
  Modal,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  // Rate,
  Row,
  Select,
  Slider,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  // Transfer,
  Tree,
  TreeSelect,
  Tabs,
  Tag,
  // TimePicker,
  Timeline,
  Tooltip,
  // Upload,
  Drawer,
  // Skeleton,
  Comment,
  // ColorPicker,
  // ConfigProvider,
  Empty,
  Result,
  Descriptions,
  PageHeader,
  // Space,
  message,
  notification,
} from 'ant-design-vue';

const components = [
  // Affix,
  // Anchor,
  AutoComplete,
  Alert,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Calendar,
  Card,
  Collapse,
  Carousel,
  // Cascader,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
//   FormModel,
  Icon,
  Input,
  InputNumber,
  Layout,
  List,
  // LocaleProvider,
  Menu,
  Mentions,
  Modal,
  Pagination,
  Popconfirm,
  Popover,
  Progress,
  Radio,
  // Rate,
  Row,
  Select,
  Slider,
  Spin,
  Statistic,
  Steps,
  Switch,
  Table,
  // Transfer,
  Tree,
  TreeSelect,
  Tabs,
  Tag,
  // TimePicker,
  Timeline,
  Tooltip,
  // Upload,
  Drawer,
  // Skeleton,
  Comment,
  // ColorPicker,
  // ConfigProvider,
  Empty,
  Result,
  Descriptions,
  PageHeader,
  // Space,
]

components.forEach((component) => Vue.use(component));

Vue.component(Verte.name, Verte);

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$destroyAll = Modal.destroyAll;

Vue.prototype.$eventBus = new Vue();

import { assets } from '~/consts/Endpoints';

Vue.mixin({
  components: { Verte },

  computed: {
    profileImg() {
      return function (user) {
          if (!user?.avatar) return '';
          return `${assets.avatars}/${user?.avatar}`;
      }
    },
  },

  data: () => {
    return {
      API_HOST: endpoints.API_HOST,
      endpoints: endpoints,
      socket: null,
      events: global.events,
      isDoingRefreshToken: false,
      refreshTmr: null,
    };
  },

  methods: {
    cloneObj(obj) {
      try {
        return JSON.parse(JSON.stringify({...obj}));
      }
      catch (err) {
        console.log(`Error cloning object: `, err, obj);

        return {};
      }
    },

    cloneArr(obj) {
      try {
        return JSON.parse(JSON.stringify([...obj]));
      }
      catch (err) {
        console.log(`Error cloning object: `, err, obj);

        return [];
      }
    },

    logout() {
      this.$auth.logout('local');
      this.$router.push({ name: 'login' });
    },

    tr(key, options = {}, doDebug = false) {return tr(key, options, doDebug)},

    l() {console.log.apply(arguments)},

    formatDate(dte, format) {return formatDate(dte, format)},

    imageExists(url) {return imageExists(url)},

    replaceBetween(start, end, src, what) {return replaceBetween(start, end, src, what)},

    pascalCaseWithSpaces(str) {return pascalCaseWithSpaces(str)},

    camelCase(str) {return camelCase(str)},

    titleCase(str) {return titleCase(str)},

    pascalCase(str) {return pascalCase(str)},

    formatBytes(bytes, decimals = 2) {return formatBytes(bytes, decimals)},

    kebabCase(str) {return kebabCase(str)},

    arraySames(arr1, arr2) { return arraySames(arr1, arr2) },

    objectSames(obj1, obj2) { return objectSames(obj1, obj2) },

    maskValue(val) {return mask(val)},

    urlify(text) {return urlify(text)},

    convertToUrl(str) {return convertToUrl(str)},

    upperUnderscoreCase(str) {return upperUnderscoreCase(str)},

    lcUnderscoreCase(str) {return lcUnderscoreCase(str).toLowerCase()},

    replaceObjectKey(key, obj) {return replaceObjectKey(key, obj)},

    maxLen(str, mexLen) {return maxLen(str, mexLen)},

    timeSince(dte) {return timeSince(dte)},

    findDuplicates(arr) {return findDuplicates(arr)},

    generateRandomString(maxLen = 10) {return generateRandomString(maxLen)},

    // oneShot
    os(cb, delay = 300) {setTimeout(cb, delay)},

    randColor() {return randColor()},

    keyify(dataset, key) {return keyify(dataset, key)},

    randDarkColor() {return randDarkColor()},

    percentage(partialValue, maxValue, parseToInt = false) {
      return percentage(partialValue, maxValue, parseToInt);
    },

    showBgOverlay() {
      document.getElementById('bg-overlay').style.display = 'block';
      document.getElementById('bg-overlay').style.opacity = '1';
    },

    getCookie(key) {return getCookie(key)},

    convertImgToBase64(file) {return convertImgToBase64(file)},

    imageExists(imageUrl) {return imageExists(imageUrl)},

    hideBgOverlay() {
      document.getElementById('bg-overlay').style.opacity = '0';
      setTimeout(
        () => document.getElementById('bg-overlay').style.display = 'none',
        450
      );
    },

    nameInitials(n) {
      try {
        const name = n.split(' ');
        return `${name[0].charAt(0)}${name[1] ? name[1].charAt(0) : ''}`;
      }
      catch (err) { return '' }
    },

    initCheckLoginStateTmr() {
      if (this.refreshTmr) clearInterval(this.refreshTmr);
      this.refreshTmr = setInterval(() => this.checkLoginExpTime(), 2000);
    },

    checkLoginExpTime() {
      if (this.$auth.loggedIn) {
        const [ headers, payload ] = this.$auth.strategy.token.get().split('.');

        const decodedPayload = JSON.parse(Buffer.from(payload, 'base64'));

        // Get the token expiration timestamp in milliseconds
        const tokenExpiration = decodedPayload.expAt / 1000;

        if (tokenExpiration) {
          // Calculate the time left in seconds
          const currentTime = Date.now() / 1000;
          const timeLeftInSeconds = tokenExpiration - currentTime;

          // Convert seconds to a human-readable format (e.g., minutes or hours)
          // const minutesLeft = Math.floor(timeLeftInSeconds / 60);
          // const hoursLeft = Math.floor(minutesLeft / 60);
  
          if (timeLeftInSeconds <= 0) {
            this.logout();
          }
          else if (timeLeftInSeconds <= 10 && !this.isDoingRefreshToken) {
            this.refreshToken();
          }
          // else if (!this.isDoingRefreshToken) {
          //   console.clear();
          //   console.log('Time left before token expiration (seconds):', timeLeftInSeconds);
          //   console.log('Time left before token expiration (minutes):', minutesLeft);
          //   console.log('Time left before token expiration (hours):', hoursLeft);
          // }
        }
      }
    },

    async refreshToken() {
      if (this.isDoingRefreshToken) return;

      console.log('Refreshing the login token');

      this.isDoingRefreshToken = true;

      const res = await this.$auth.refreshTokens();

      const idToken = res.data.idToken;

      this.$auth.strategy.token.set(idToken);
      this.$auth.strategy.refreshToken.set(res.data.refreshToken);

      global['AUTH_TOKEN'] = `${idToken}`;

      await this.$auth.fetchUser();

      this.isDoingRefreshToken = false;
    }
  },
});
