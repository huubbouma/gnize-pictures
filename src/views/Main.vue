<template>
  <div>
    <FolderNavigator :path="path" />
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
      type: String,
    },
  },
};
</script>