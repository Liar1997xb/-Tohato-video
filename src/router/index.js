import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () =>
    import ( /* webpackChunkName: "Index" */ '../views/Index.vue')
const Mine = () =>
    import ( /* webpackChunkName: "Mine" */ '../views/Mine.vue')
const Play = () =>
    import ( /* webpackChunkName: "Play" */ '../components/Play/Index.vue')

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        name: 'Index',
        component: Index
    },
    {
        path: '/mine',
        name: 'Mine',
        component: Mine
    },
    {
        path: '/play',
        name: 'Play',
        component: Play
    }
]

const router = new VueRouter({
    routes
})

export default router