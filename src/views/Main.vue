<template>
  <div>
    <FolderNavigator :path="fixedPath" :itemId="itemId" />
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
    itemId: {
      required: false,
      type: String,
    },
  },

  computed: {
    fixedPath() {
      return this.path || [];
    },
  },
  watch: {},
};
</script>