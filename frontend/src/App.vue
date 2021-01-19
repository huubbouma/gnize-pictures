<template>
  <div id="gnize-pictures">
    <Toast />
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

  mounted() {
    const castScript = document.createElement('script');
    castScript.setAttribute(
      'src',
      'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1',
    );
    document.head.appendChild(castScript);
  },

  created() {
    window.__onGCastApiAvailable = (isAvailable) => {
      if (isAvailable) {
        this.initializeCastApi();
      }
    };

    this.$http.interceptors.response.use(
      undefined,
      (err) =>
        new Promise(() => {
          /* eslint no-underscore-dangle: 0 */
          if (
            // err.response &&
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            this.$store.dispatch('AUTH_LOGOUT');
          }
          throw err;
        }),
    );
  },
  methods: {
    initializeCastApi() {
      window.cast.framework.CastContext.getInstance().setOptions({
        // receiverApplicationId: process.env.VUE_APP_CAST_APP_ID,
        receiverApplicationId: window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
        autoJoinPolicy: window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
      });
    },
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
