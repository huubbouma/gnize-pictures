<template>
  <div class="select-item" :class="{selected: selectItem}" v-if="item && isAdmin && showFileOperations">
    <ToggleButton
      class="select-button p-button-raised p-button-rounded"
      v-model="selectItem"
      onIcon="pi pi-check"
      offIcon="pi pi-check"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SelectItem',
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
    ...mapGetters(['getItemsSelected', 'showFileOperations', 'isAdmin']),

    selectItem: {
      get() {
        return this.item.path in this.getItemsSelected;
      },
      set(value) {
        if (value) {
          this.$store.commit('addItemSelected', this.item);
        } else {
          this.$store.commit('removeItemSelected', this.item);
        }
      },
    },
  },
  methods: {
    handleKeydown(event) {
      if (event.keyCode === 83) {
        // s button
        this.selectItem = !this.selectItem;
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