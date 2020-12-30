<template>
  <div>
    <ul class="gallery">
      <li class="gallery-panel" v-for="(item, index) in media" :key="item.id">
        <img @click="showInOverlay(index)" :src="item.thumb" />
      </li>
    </ul>
    <Overlay
      v-if="showOverlay"
      :item="currentItem"
      v-on:close="closeOverlay()"
      v-on:previous="showPrevious()"
      v-on:next="showNext()"
    />
  </div>
</template>

<script>
import Overlay from './Overlay.vue';

export default {
  name: 'Gallery',

  components: { Overlay },

  props: {
    media: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      showOverlay: false,
      currentIndex: 0,
    };
  },
  computed: {
    currentItem() {
      return this.media[this.currentIndex];
    },
  },
  methods: {
    showPrevious() {
      this.currentIndex = this.currentIndex === 0 ? this.media.length - 1 : this.currentIndex - 1;
    },
    showNext() {
      this.currentIndex = this.currentIndex === this.media.length - 1 ? 0 : this.currentIndex + 1;
    },

    showInOverlay(index) {
      this.currentIndex = index;
      this.showOverlay = true;
    },
    closeOverlay() {
      this.showOverlay = false;
    },
  },
};
</script>

<style lang="scss" scoped>
// BASIC

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  height: 30vh;
  flex-grow: 0;
  // flex-grow: 1;
}

img {
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
  padding: 0.1rem;
}

// ADVANCED

// Portrait

@media (max-aspect-ratio: 1/1) {
  li {
    height: 20vh;
  }
}

// Short screens

@media (max-height: 480px) {
  li {
    height: 80vh;
  }
}

// Smaller screens in portrait

@media (max-aspect-ratio: 1/1) and (max-width: 480px) {
  ul {
    flex-direction: row;
  }

  li {
    height: auto;
    width: 100%;
  }
  img {
    width: 100%;
    max-height: 75vh;
    min-width: 0;
  }
}
</style>