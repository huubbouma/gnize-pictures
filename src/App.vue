<template>
  <div id="gnize-pictures">
    <Toast/>
    <router-view />
  </div>


</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',

  data() {
    return {
      rootPath: '/',
    };
  },
  components: {},
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  created() {
    this.$http.interceptors.response.use(
      undefined,
      (err) =>
        new Promise(() => {
          /* eslint no-underscore-dangle: 0 */
          if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch('AUTH_LOGOUT');
          }
          throw err;
        }),
    );
  },
  methods: {
    greet() {
      this.$toast.add({
        severity: 'info',
        summary: 'Hello',
        detail: this.text,
      });
    },
  },
};
</script>

<style>

body.modal-open {
  overflow: hidden;
}

body {
  background-color: rgba(0, 0, 0, 1);  
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.app-container {
  text-align: center;
}

</style>
