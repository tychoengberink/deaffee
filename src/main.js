import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { store } from './store';
import { ApiService } from "./services/api.service";
import { TokenService } from "./services/token.service";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { IonicVue } from '@ionic/vue';
import VueVirtualScroller from 'vue-virtual-scroller';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import './theme/global.css';


const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(VueVirtualScroller)
  .use(store);

ApiService.init(process.env.VUE_APP_ROOT_API);

if (TokenService.getToken()) {
  ApiService.setHeader();
  ApiService.mountRequestInterceptor();
  ApiService.mount401Interceptor();
}

router.isReady().then(() => {
  app.mount('#app');
});

//Set portrait mode only
ScreenOrientation.lock(ScreenOrientation.ORIENTATIONS.PORTRAIT).catch((error) => {
  console.log(error);
});