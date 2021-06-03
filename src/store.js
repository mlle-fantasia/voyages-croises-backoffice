import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// utilisé pour formater les types des contacts dans filter.formatvalue()
let items_users_type = [
	{
		value: "admin",
		text: "Administrateur",
	},
	{
		value: "superadmin",
		text: "Super administrateur",
	},
];

export default new Vuex.Store({
	state: {
		items_users_type: items_users_type,
		dialogErr: false,
		dialogErrTxt: "",
		user: {},
		connected: false,
	},
	mutations: {
		set_dialog_error(state, what) {
			// console.log("what", what);
			state.dialogErr = what.dialogErr;
			state.dialogErrTxt = what.dialogErrTxt;
		},
		set_user(state, user) {
			state.user = user;
		},
		set_connected(state, isConnected) {
			state.connected = isConnected;
		},
		set_connexion(state, data) {
			console.log("data.connect", data.connect);
			if (data.connect) {
				if (data.token) localStorage.setItem("token", data.token);
				if (data.refreshtoken) localStorage.setItem("refreshtoken", data.refreshtoken);
				localStorage.setItem("user", JSON.stringify(data.user));
				state.user = data.user;
				state.connected = true;
			} else {
				localStorage.setItem("token", "");
				localStorage.setItem("refreshtoken", "");
				localStorage.setItem("user", JSON.stringify({}));
				state.user = {};
				state.connected = false;
			}
		},
	},
	actions: {
		showDialogError(ctx, err) {
			ctx.commit("set_dialog_error", {
				dialogErr: err ? true : false,
				dialogErrTxt: err ? err : "",
			});
		},
	},
	modules: {},
	getters: {
		get_dialogErr(state) {
			return state.dialogErr;
		},
	},
});
