import Vue from 'vue'
import moment from 'moment'
import _ from 'lodash'

//
// Mixins
//
Vue.mixin({
  methods: {
    /**
     * Metadata
     */
    getHead() {
      let title = this.getRealRouteName()

      if (title === 'index') {
        title = 'dashboard'
      }

      return {
        title: _.startCase(title),
      }
    },

    /**
     * Get route name without locale and params
     */
    getRealRouteName() {
      const routeName = this.$route.name || ''
      return routeName.replace(/___(en|th)/, '').replace(/-(id)/g, '')
    },

    /**
     * Catch error message
     *
     * @param {Object} err
     */
    catchError(err) {
      // display error in console & message
      // eslint-disable-next-line no-console
      console.error(err)
      const msg =
        err.response?.data?.message || err.response?.statusText || err.message
      this.$message.error(msg)
    },
  },
})

Vue.filter('date', (str, format) => {
  if (!str) return '-- -- ----'
  const dateFormat = format || 'DD MMM YYYY'
  const d = moment(str)
  if (!d.isValid()) return ''
  return d.format(dateFormat)
})

Vue.filter('time', (str, format) => {
  if (!str) return '--:--'
  const dateFormat = format || 'HH:mm'
  return moment(str).format(dateFormat)
})

Vue.filter('price', (str, digit = 2) => {
  if (!str) return ''
  if (isNaN(str)) return ''

  const float = parseFloat(str).toFixed(digit)
  return float.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})
