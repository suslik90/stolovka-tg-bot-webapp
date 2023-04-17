import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import { vMaska } from "maska"

import '@/assets/main.scss'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { CUSTOM_THEMES } from './utils/constants'


const customLightTheme = {
  dark: false,
  colors: {
    background: '#ffffff',
    'background-white': '#f1f1ff',
    primary: '#f15a5a',
    secondary: '#f15a5a',
    error: '#B00020',
    'menu-item-color': '#252c39',
    'placeholder-color': '#252c3980',
    'font-color-over-primary': '#f1f1ff',
    'head-title-color': '#252c39',
    white: '#ffffff',
    'btn-minus-background': '#f15a5a',
    'btn-minus-color': '#ffffff'    
  }
};

const customDarkTheme = {
  dark: true,
  colors: {
    background: '#252C39',
    'background-white': '#f1f1ff',
    primary: '#f15a5a',
    secondary: '#f15a5a',
    error: '#B00020',
    'menu-item-color': '#252c39',
    'placeholder-color': '#252c3980',
    'font-color-over-primary': '#f1f1ff',
    'head-title-color': '#f1f1ff',
    white: '#ffffff',
    'btn-minus-background': '#f1f1ff',
    'btn-minus-color': '#f15a5a'
  }
};

const vuetify = createVuetify({
  theme: {
    options: { customProperties: true },
    defaultTheme: CUSTOM_THEMES.LIGHT,
    themes: {
      'customLightTheme': customLightTheme,
      'customDarkTheme': customDarkTheme
    }
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

const app = createApp(App)

app.config.globalProperties.$filters = {
  numberFormat(_number, args) {
    const toFixedFix = function (n, prec) {
      const k = Math.pow(10, prec);
      return '' + (Math.round(n * k) / k).toFixed(prec);
    }

    let number = _number.toString();
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    const n = !isFinite(+number) ? 0 : +number;
    const prec = !isFinite(+Number(args[0])) ? 0 : Math.abs(Number(args[0]));
    const sep = (typeof args[1] === 'undefined') ? ',' : args[1];
    const dec = (typeof args[2] === 'undefined') ? '.' : args[2];
    let s = [];

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec)
  }
}



app.use(createPinia())
app.use(router)
app.use(VueAxios, axios)
app.directive("maska", vMaska)

app.provide('axios', app.config.globalProperties.axios)

app.use(vuetify).mount('#app')
