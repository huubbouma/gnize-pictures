<template>
  <div id="gnize-pictures">
    <h1>Hello World of pain!</h1>
    <p>app id: {{ app_id }}</p>

    <cast-media-player></cast-media-player>
  </div>
</template>

<script>
const context = window.cast.framework.CastReceiverContext.getInstance();
// const playerManager = context.getPlayerManager();

context.start();

export default {
  name: 'App',

  data() {
    return {
      rootPath: '/',
    };
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {
    app_id() {
      return process.env.VUE_APP_CAST_APP_ID;
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
