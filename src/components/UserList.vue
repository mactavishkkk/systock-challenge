<template>
    <v-container>
        <div class="d-flex justify-center mb-6">
            <p class="text-h5">Gerenciamento de Usuários</p>
        </div>

        <v-btn class="ma-2" color="green" @click="goCreate()">
            Criar
            <v-icon icon="mdi-account-multiple-plus" end></v-icon>
        </v-btn>

        <v-data-table :headers="headers" :items="formattedUsers">
            <template v-slot:[`item.actions`]="{ item }">
                <router-link :to="{ name: 'UserEdit', params: { id: item.id } }">
                    <v-btn class="ma-2" color="primary">
                        Editar
                        <v-icon icon="mdi-account-edit" end></v-icon>
                    </v-btn>
                </router-link>
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
                { title: 'ID', key: 'id' },
                { title: 'Nome', key: 'name' },
                { title: 'CPF', key: 'cpf' },
                { title: 'E-mail', key: 'email' },
                { title: 'Ativo', key: 'active' },
                { title: 'Criado', key: 'created' },
                { title: 'Actions', key: 'actions', sortable: false, align: 'center' }
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
        },
        formatCpf(cpf) {
            return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        },
        goCreate() {
            this.$router.push('/create');
        }
    },
    computed: {
        formattedUsers() {
            return this.users.map(user => ({
                ...user,
                cpf: this.formatCpf(user.cpf)
            }));
        }
    }
};
</script>
