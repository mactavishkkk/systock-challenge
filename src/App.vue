<template>
  <v-app>
    <v-container>
      <user-form></user-form>
      <user-list></user-list>
    </v-container>
  </v-app>
</template>

<script>
import UserList from './components/UserList.vue';
import UserForm from './components/UserForm.vue';

export default {
  components: {
    UserList,
    UserForm
  }
};
</script>
