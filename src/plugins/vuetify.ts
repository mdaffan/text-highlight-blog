import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#34c0be',
        secondary: '#5d409f',
      },
    },
  },
})
Vue.use(Vuetify)

export default new Vuetify({})
