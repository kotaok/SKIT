import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'
import './registerServiceWorker'

const vuetify = process.env.NODE_ENV === "production"
  ? require('./plugins/vuetify').default
  : require('./plugins/vuetify-dev').default;

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyDscClB0Ixn1Xd3TpG4rPmZJ91JCXmKNfY",
  authDomain: "chat-work-app.firebaseapp.com",
  databaseURL: "https://chat-work-app-default-rtdb.firebaseio.com",
  projectId: "chat-work-app",
  storageBucket: "chat-work-app.appspot.com",
  messagingSenderId: "344447311983",
  appId: "1:344447311983:web:c2cd12f0537ca5313f6d9a",
  measurementId: "G-4W6FPCF7R1"
};

 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
