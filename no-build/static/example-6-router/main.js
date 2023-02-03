

import {reactive,createApp} from "vue"
import {createRouter,createWebHashHistory} from "vuerouter"

export default function main(){
    console.log("hello from vue router test.");

    const template = `
    <div id="app">
        <h1>Hello App!</h1>
        <p>
            <router-link to="/">go-home</router-link>
            <router-link to="/about">go-about</router-link>
            <router-link to="/info">go-info</router-link>
        </p>
        <!-- route outlet -->
        <!-- component matched by the route will render here -->
        <router-view></router-view>
    </div>`;

    // 1. Define route components.
    // These can be imported from other files
    const Home = {
        template: '<div>Home</div>'
    }
    const About = {
        template: '<div>About</div>'
    }
    const Info = {
        template: '<div>Info</div>'
    }

    // 2. Define some routes
    // Each route should map to a component.
    // We'll talk about nested routes later.
    const routes = [
        { path: '/', component: Home },
        { path: '/about', component: About },
        { path: '/info', component: Info }
    ]

    // 3. Create the router instance and pass the `routes` option
    // You can pass in additional options here, but let's
    // keep it simple for now.
    const router = createRouter({
        // 4. Provide the history implementation to use.
        // We are using the hash history for simplicity here.
        history: createWebHashHistory(),
        routes, // short for `routes: routes`
    })

    // 5. Create and mount the root instance.
    const app = createApp({
        template
    })
    // Make sure to _use_ the router instance to make the
    // whole app router-aware.
    app.use(router)

    app.mount('#mount')
}


