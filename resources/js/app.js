
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');




import moment from 'moment'


import VueRouter from  'vue-router';

Vue.use(VueRouter);

/*Vue-progressbar*/

import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    height: '3px'
})


/*v form*/

import { Form, HasError, AlertError } from 'vform'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

window.Form = Form;

/*end vform*/

/*sweet alert*/
// ES6 Modules or TypeScript

import Swal from 'sweetalert2';

window.swal = Swal;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

window.toast = Toast;



import Profile from './components/Profile.vue'
import DashBoard from './components/Dashboard.vue'
import Users from './components/Users.vue'
import Developer from './components/Developer.vue'


let  routes = [

    { path:'/profile',component:Profile },
    { path:'/dashboard',component:DashBoard },
    { path:'/users',component:Users },
    { path:'/developer',component: Developer}

];

const router = new VueRouter({

    mode:'history',
    routes : routes,

});

Vue.filter('upText',function (text) {

    return text.charAt(0).toUpperCase() + text.slice(1);
});
Vue.filter('myDate',function (created) {

    return moment(created).format('MMMM DD YYYY')

});

window.Fire = new Vue();





/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('example-component', require('./components/ExampleComponent.vue').default);

//passport
Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue').default
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue').default
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue').default
);

/*end of passport*/

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({


    router:router,

    el: '#app'
});
