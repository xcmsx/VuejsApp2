if (window.location.href.indexOf("http://options-flow.herokuapp") != -1) {
    window.location.href = "https://options-flow.herokuapp.com";
}

import Vue from "vue";
import App from "./App.vue";
//import socketio from "socket.io-client";
import VueSocketIO from "vue-socket.io";


Vue.use(
    new VueSocketIO({
        debug: true,
        connection: "https://moneything.herokuapp.com"
    })
);

new Vue({
    render: h => h(App)
}).$mount("#app");
