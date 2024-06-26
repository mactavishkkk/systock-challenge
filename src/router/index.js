import { createRouter, createWebHistory } from 'vue-router';
import UserList from '../components/UserList.vue';
import UserForm from '../components/UserForm.vue';
import UserEdit from '../components/UserEdit.vue';

const routes = [
    {
        path: '/',
        name: 'UserList',
        component: UserList
    },
    {
        path: '/create',
        name: 'UserForm',
        component: UserForm
    },
    {
        path: '/edit/:id',
        name: 'UserEdit',
        component: UserEdit,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
