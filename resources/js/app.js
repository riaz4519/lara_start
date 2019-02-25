
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

/*v form*/

import { Form, HasError, AlertError } from 'vform'

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

window.Form = Form;

/*end vform*/


import Profile from './components/Profile.vue'
import DashBoard from './components/Dashboard.vue'
import Users from './components/Users.vue'


let  routes = [

    { path:'/profile',component:Profile },
    { path:'/dashboard',component:DashBoard },
    { path:'/users',component:Users }

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

})



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

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({


    router:router,

    el: '#app'
});
