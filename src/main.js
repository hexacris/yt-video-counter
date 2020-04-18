import Vue from "vue";
import App from "./App.vue";

import VueYouTubeEmbed from "vue-youtube-embed";

Vue.use(VueYouTubeEmbed);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
