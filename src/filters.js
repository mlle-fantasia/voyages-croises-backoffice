import Vue from "vue";
//import store from "./store";
// import axios from "axios";

Vue.filter("lowerCase", function(val) {
	return val.toLowerCase();
});
Vue.filter("formatContactName", function(contact) {
	if (!contact) return;
	return contact.co_name.toUpperCase() + " " + contact.co_firstname.charAt(0).toUpperCase() + contact.co_firstname.substr(1);
});
