<template>
  <div class="delete-item" v-if="item && isAdmin && showFileOperations">
    <ToggleButton
      v-model="deleteItem"
      onIcon="pi pi-trash"
      offIcon="pi pi-trash"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DeleteItem',
  // emits: ['delete'],
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
    ...mapGetters(['getItemsToDelete', 'showFileOperations', 'isAdmin']),

    deleteItem: {
      get() {
        // console.log(this.item.path);
        // console.log(this.getItemsToDelete);

        return this.item.path in this.getItemsToDelete;
      },
      set(value) {
        if (value) {
          this.$store.commit('addItemToDelete', this.item);
        } else {
          this.$store.commit('removeItemToDelete', this.item);
        }
      },
    },
  },
  methods: {
    handleKeydown(event) {
      if (event.keyCode === 68) {
        // d button
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