<template>
  <div>
    <h1>Login</h1>
    <LoginComponent />
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  props: {
    nextUrl: {
      required: false,
      type: String,
    },
  },
  components: { LoginComponent },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  watch: {
    isAuthenticated(newValue) {
      if (newValue) {
        const url = this.nextUrl || '/';
        this.$router.push(url);
      }
    }
  }
};
</script>