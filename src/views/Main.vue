<template>
  <div>
    <FolderNavigator :path="fixedPath" />
  </div>
</template>

<script>
import FolderNavigator from '@/components/FolderNavigator.vue';

export default {
  name: 'Main',

  components: { FolderNavigator },
  props: {
    path: {
      required: false,
      type: [Array, String],
    },
  },
  computed: {
    fixedPath() {
      return this.path || [];
    },
  },
  watch: {
    // $route(to, from) {
    //   console.log(to);
    //   console.log(from);
    // },
  },
};
</script>