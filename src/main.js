import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";
import "./filters";
//import axios from "axios";
import store from "./store";
import "./registerServiceWorker";
require("dotenv").config();

Vue.use(VueRouter);

import Vuex from "vuex";
Vue.use(Vuex);

import Notifications from "vue-notification";
Vue.use(Notifications);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
