import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import axios from "axios";

import Home from "./components/Home.vue";
import Login from "./components/Login.vue";

const routes = [
	{
		path: "/",
		component: Home,
	},
	{
		path: "/login",
		component: Login,
	},
];
Vue.use(VueRouter);

const router = new VueRouter({
	mode: "history",
	routes,
});

router.beforeEach(async (to, from, next) => {
	console.log("beforeEach to et connected : ", to.name, store.state.connected);
	console.log("to.query", to.query);
	let queryUrl = to.query;
	let fromSite = false;
	if (queryUrl.token) {
		store.commit("set_connected", false);
		fromSite = true;
		localStorage.setItem("token", queryUrl.token);
		axios.defaults.headers.common["x-auth-accesstoken"] = queryUrl.token;
	}

	async function autolog() {
		await axios.get(
			process.env.VUE_APP_SERVER_URL + "/articles/list",
			{ params: {} },
			{
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			}
		);

		if (!localStorage.getItem("token")) return false;
		if (store.state.connected) return true;

		console.log("token", localStorage.getItem("token"));
		let tokenToSend = fromSite ? "?token=" + localStorage.getItem("token") : "";
		let response = await axios.post(process.env.VUE_APP_SERVER_URL + "/autologin" + tokenToSend, {});
		if (response.data.err) {
			localStorage.setItem("token", "");
			return false;
		}

		console.log("response autolog", response.data);

		store.commit("set_user", response.data.data);
		store.commit("set_connected", true);
		return true;
	}

	if (!store.state.connected) await autolog();
	if (to.name !== "login" && !store.state.connected) return next({ path: "/login" });
	if (to.name === "login" && !store.state.connected) return next();
	if (to.name === "login" && store.state.connected) return next({ path: "/" });
	if (!store.state.connected) return next({ path: "/login" });

	return next();
});

export default router;
