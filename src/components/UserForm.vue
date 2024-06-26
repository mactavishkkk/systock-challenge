<template>
    <v-container>
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
                    <v-text-field variant="outlined" v-model="user.password" :rules="passwordRules" label="Senha" type="password" required
                        placeholder="******" class="mt-3"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select variant="outlined" v-model="user.active" :rules="statusRules" :items="statusOptions"
                        placeholder="Selecione" label="Status" required class="mt-3"></v-select>
                </v-col>
            </v-row>
            <v-btn variant="outlined" color="black" @click="goBack" class="mt-3 mx-3">Voltar</v-btn>
            <v-btn :disabled="!valid" @click="saveUser" class="mt-3">Criar</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import axios from '../services/axios';
import { mask } from 'vue-the-mask'

export default {
    directives: {
        mask: mask
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
            passwordRules: [
                v => !!v || 'Password is required',
            ],
            cpfRules: [
                v => !!v || 'CPF is required',
            ],
            statusRules: [
                v => v !== null || 'Status is required'
            ],
            statusOptions: [{ title: 'Ativo', value: true }, { title: 'Inativo', value: false }]
        };
    },
    methods: {
        saveUser() {
            this.errorMessage = '';

            const formattedUser = {
                ...this.user,
                cpf: this.user.cpf.replace(/\D/g, '')
            };

            axios.post('/api/v1/users', formattedUser)
                .then(response => {
                    alert('Usuário criado com Sucesso!')
                    console.log(response.data);
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
