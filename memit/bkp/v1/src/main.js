import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueI18n from 'vue-i18n'
import messages from './localization/messages.js'

import User from './application/user.js'
import Axioswr from './application/axioswr.js'
import Api from './application/api'
import GlobalEvents from 'vue-global-events'
 

///////////Components

import preloader from '@/components/assets/preloader/index.vue'
import linepreloader from '@/components/assets/linepreloader/index.vue'
import userpic from '@/components/assets/userpic/index.vue'
import modal from '@/components/assets/modal/index.vue'
import fileuploader from '@/components/assets/fileuploader/index.vue'

Vue.config.productionTip = false

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en-US',
  messages : messages
})

var user = null,
    axios = null, 
    api = null;

Vue.component('preloader', preloader)
Vue.component('linepreloader', linepreloader)
Vue.component('userpic', userpic)
Vue.component('modal', modal)
Vue.component('fileuploader', fileuploader)
Vue.component('GlobalEvents', GlobalEvents)

Object.defineProperty(Vue.prototype, '$tracking', { value: tracking });

var vm = new Vue({

  i18n,
  router,
  store,

  data : {

    servers : {
      main : "https://www.larkspurweb.com/PS2/AJAXPS.aspx",
      rx : 'https://rixtrema.net/RixtremaWS401k/AJAXFCT.aspx',
      eve : 'https://rixtrema.net:8889/',
      api : 'https://rixtrema.net:8808',
      fb : 'https://rixtrema.net:8808',
      ws  : 'wss://rixtrema.net:9999',
    },

    systems : {
      main : "LEXE",
    },

    prefix : {
      main : 'PS'
    },

  },

  computed : {
      user : () => user,
      axios : () => axios,
      api : () => api
  },

  created : function(){


    api = new Api({ vm : this })

    user = new User({ vm : this, api })

    axios = new Axioswr({
      user,
      vm : this,
      api : api
    })

    user.setFingerPrint().then(() => {

      return user.state.is()

    }).then(state => {
      console.log("State", state)
    })

    

  },

  render: h => h(App),

  
  
}).$mount('#app')

