<template>
  <div
    class="nef-item"
    v-if="item && isAdmin && item.nef && showFileOperations"
  >
    <ToggleButton v-model="deleteItem" onIcon="pi pi-eye" offIcon="pi pi-eye-slash" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NefItem',
  props: {
    item: {
      required: true,
    },
    keyHandler: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['getNefItemsToDelete', 'showFileOperations', 'isAdmin']),

    deleteItem: {
      get() {
        return !(this.item.path in this.getNefItemsToDelete);
      },
      set(value) {
        if (!value) {
          this.$store.commit('addNefItemToDelete', this.item);
        } else {
          this.$store.commit('removeNefItemToDelete', this.item);
        }
      },
    },
  },
  methods: {
    handleKeydown(event) {
      if (event.keyCode === 78) {
        // n button
        this.deleteItem = !this.deleteItem;
      }
    },
  },
  watch: {},
  mounted() {
    if (this.keyHandler) {
      document.addEventListener('keydown', this.handleKeydown);
    }
  },
  unmounted() {
    if (this.keyHandler) {
      document.removeEventListener('keydown', this.handleKeydown);
    }
  },
};
</script>

<style lang="scss" scoped>
.p-button:focus {
  box-shadow: none;
}
</style>