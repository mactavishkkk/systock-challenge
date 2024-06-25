<template>
    <v-container>
        <v-data-table :headers="headers" :items="users">
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn class="ma-2" color="primary">
                    Editar
                    <v-icon icon="mdi-account-edit" end></v-icon>
                </v-btn>
                <v-btn class="ma-2" color="red" @click="deleteUser(item.id)">
                    Deletar
                    <v-icon icon="mdi-delete" end></v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
import axios from '../services/axios';

export default {
    data() {
        return {
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'CPF', value: 'cpf' },
                { text: 'Email', value: 'email' },
                { text: 'Status', value: 'active' },
                { text: 'Criado em:', value: 'created' },
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            users: []
        };
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        fetchUsers() {
            axios.get('/api/v1/users')
                .then(response => {
                    this.users = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        deleteUser(userId) {
            if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
                axios.delete(`/api/v1/users/${userId}`)
                    .then(() => {
                        this.users = this.users.filter(user => user.id !== userId);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    }
};
</script>
