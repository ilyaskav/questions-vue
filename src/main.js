import Vue from 'vue';
import App from './app.vue';
import router from './router';

import { ValidationProvider, ValidationObserver, extend, configure } from 'vee-validate';

import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import '@/toastui-content-style.css';

Vue.use(BootstrapVue);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

extend('required', {
  validate (value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1,
      message: 'This field is required'
    };
  },
  computesRequired: true
});

configure({
  classes: {
    invalid: 'is-invalid'
  }
});
