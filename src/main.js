import Vue from "vue";
import App from "./App.vue";

import VueYouTubeEmbed from "vue-youtube-embed";

import "@/assets/bootstrap-grid.min.css";

Vue.use(VueYouTubeEmbed);

Vue.config.productionTip = false;

new Vue({
	render: h => h(App)
}).$mount("#app");
