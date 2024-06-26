<template>
    <v-container>
        <div class="d-flex justify-center mb-6">
            <p class="text-h5">Editar Usuário</p>
        </div>

        <v-form ref="form" v-model="valid">
            <v-alert v-if="errorMessage" type="error" class="mt-3">{{ errorMessage }}</v-alert>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field variant="outlined" v-model="user.name" label="Nome" required
                        placeholder="Nome e Sobrenome" class="mt-3"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field variant="outlined" v-model="user.cpf" :rules="cpfRules" label="CPF"
                        v-mask="['###.###.###-##']" placeholder="999.999.999-99" required class="mt-3"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field variant="outlined" v-model="user.email" :rules="emailRules" label="Email" required
                        placeholder="exemplo@gmail.com" class="mt-3"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field variant="outlined" v-model="user.password" label="Senha" type="password"
                        placeholder="******" class="mt-3"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select variant="outlined" v-model="user.active" :rules="statusRules" :items="statusOptions"
                        placeholder="Selecione" label="Status" required class="mt-3"></v-select>
                </v-col>
            </v-row>
            <v-btn variant="outlined" color="black" @click="goBack" class="mt-3 mx-3">Voltar</v-btn>
            <v-btn :disabled="!valid" @click="updateUser" class="mt-3">Salvar</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import axios from '../services/axios';
import { mask } from 'vue-the-mask';

export default {
    directives: {
        mask: mask
    },
    props: {
        userId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            valid: false,
            errorMessage: '',
            user: {
                name: '',
                cpf: '',
                email: '',
                password: '',
                active: null
            },
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid'
            ],
            cpfRules: [
                v => !!v || 'CPF is required',
                v => /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/.test(v) || 'CPF must be in the format 999.999.999-99'
            ],
            statusRules: [
                v => v !== null || 'Status is required'
            ],
            statusOptions: [{ title: 'Ativo', value: true }, { title: 'Inativo', value: false }]
        };
    },
    created() {
        this.fetchUser();
    },
    methods: {
        fetchUser() {
            const userId = this.$route.params.id;

            axios.get(`/api/v1/users/${userId}`)
                .then(response => {
                    this.user = response.data.data;
                })
                .catch(error => {
                    console.error(error);
                    this.errorMessage = 'An error occurred while fetching user data.';
                });
        },
        updateUser() {
            this.errorMessage = '';

            const userId = this.$route.params.id;

            const formattedUser = {
                ...this.user,
                cpf: this.user.cpf.replace(/\D/g, '')
            };

            axios.put(`/api/v1/users/${userId}`, formattedUser)
                .then(response => {
                    console.log(response.data.data);
                    alert('Usuário atualizado com sucesso!');
                    this.$router.push('/');
                })
                .catch(error => {
                    if (error.response && error.response.data && error.response.data.errors) {
                        this.errorMessage = Object.values(error.response.data.errors).join(' ');
                    } else {
                        this.errorMessage = 'An error occurred. Please try again.';
                    }
                    console.error(error);
                });
        },
        goBack() {
            this.$router.push('/');
        }
    }
};
</script>
