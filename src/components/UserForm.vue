<template>
    <v-container>
        <v-form ref="form" v-model="valid">
            <v-text-field v-model="user.name" :rules="nameRules" label="Name" required></v-text-field>
            <v-text-field v-model="user.email" :rules="emailRules" label="Email" required></v-text-field>
            <v-btn :disabled="!valid" @click="saveUser">Save</v-btn>
        </v-form>
    </v-container>
</template>

<script>
import axios from '../services/axios';

export default {
    data() {
        return {
            valid: false,
            user: {
                name: '',
                email: ''
            },
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 20) || 'Name must be less than 20 characters'
            ],
            emailRules: [
                v => !!v || 'Email is required',
                v => /.+@.+\..+/.test(v) || 'Email must be valid'
            ]
        };
    },
    methods: {
        saveUser() {
            axios.post('/users', this.user)
                .then(response => {
                    console.log(response.data);
                    this.$refs.form.reset();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
};
</script>