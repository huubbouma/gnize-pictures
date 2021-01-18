<template>
  <div>
    <Breadcrumb v-if="isAuthenticated" :home="home" :model="breadcrumbs" />
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
  data() {
    return {
      home: { icon: 'pi pi-home', to: '/' },
      breadcrumbs: [],
    };
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