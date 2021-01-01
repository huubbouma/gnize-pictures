<template>
  <div>
    <Overlay
      :item="currentItem"
      v-on:close="closeOverlay()"
      v-on:previous="showPrevious()"
      v-on:next="showNext()"
    />
  </div>
</template>

<script>
export default {
  name: 'Detail',

  components: {},
  props: {
    item: {
      required: true,
    },
  },
  watch: {},
  methods: {
    showPrevious() {
      this.currentIndex = this.currentIndex === 0 ? this.media.length - 1 : this.currentIndex - 1;
      this.$store.commit('setCurrentItem', this.media[this.currentIndex]);
    },
    showNext() {
      this.currentIndex = this.currentIndex === this.media.length - 1 ? 0 : this.currentIndex + 1;
      this.$store.commit('setCurrentItem', this.media[this.currentIndex]);
    },
    closeOverlay() {
      this.$store.commit('setCurrentItem', null);
    },
  },

};
</script>