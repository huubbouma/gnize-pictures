<template>
  <div class="wrapper">
    <ul class="gallery">
      <li
        :ref="item.id"
        class="gallery-panel"
        v-for="(item, index) in media"
        :key="item.path"
      >
        <template v-if="!itemId">
          <img @click="showInOverlay(index)" :src="item.thumb" loading="lazy" />
          <i v-if="item.type === 'video' && item.hasThumb" class="indicator pi pi-chevron-circle-right"></i>
          <DeleteItem :item="item" :keyHandler="false" />
          <NefItem :item="item" :keyHandler="false" />
        </template>
      </li>
    </ul>
    <Overlay
      v-if="showOverlay"
      :item="currentItem"
      v-on:close="closeOverlay()"
      v-on:previous="showPrevious()"
      v-on:next="showNext()"
    />
    <ScrollTop :threshold="400" v-if="!showOverlay" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { nextTick } from 'vue';
import Overlay from './Overlay.vue';
import DeleteItem from './DeleteItem.vue';
import NefItem from './NefItem.vue';

export default {
  name: 'Gallery',

  components: { Overlay, DeleteItem, NefItem },

  props: {
    media: {
      required: true,
      type: Array,
    },
    itemId: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      showPictures: true,
      showVideos: true,
      showOverlay: false,
      currentIndex: 0,
      lastItemSelected: null,
    };
  },
  computed: {
    ...mapGetters(['currentItem', 'getItemsToDelete']),
  },
  watch: {
    currentItem(newValue) {
      if (newValue) {
        this.showOverlay = true;
        this.lastItemSelected = newValue;
      } else {
        this.showOverlay = false;
        if (this.lastItemSelected) {
          const ref = this.$refs[this.lastItemSelected.id];
          if (ref) {
            // await nextTick();
            window.setTimeout(() => {
              ref.scrollIntoView();
            }, 1);
          }
        }
      }
    },
  },
  methods: {
    showPrevious() {
      this.currentIndex = this.currentIndex === 0 ? this.media.length - 1 : this.currentIndex - 1;
      this.$store.commit('setCurrentItem', this.media[this.currentIndex]);
    },
    showNext() {
      this.currentIndex = this.currentIndex === this.media.length - 1 ? 0 : this.currentIndex + 1;
      this.$store.commit('setCurrentItem', this.media[this.currentIndex]);
    },

    showInOverlay(index) {
      this.currentIndex = index;
      this.$store.commit('setCurrentItem', this.media[this.currentIndex]);
    },
    closeOverlay() {
      // const folderPath = `/${this.currentItem.folderUri}`;
      // console.log(folderPath);
      // window.history.replaceState({}, null, folderPath);
      // this.$store.commit('setCurrentItem', null);
      this.$router.go(-1);
    },
  },
  mounted() {
    this.currentIndex = 0;
  },
};
</script>

<style lang="scss" scoped>
.gallery-panel {
  position: relative;
}

.delete-item {
  position: absolute;
  top: 0;
  right: 0;
}

.nef-item {
  position: absolute;
  top: 3em;
  right: 0;
}

.wrapper {
  user-select: none;
}

ul {
  user-select: none;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  user-select: none;
  height: 40vh;
  flex-grow: 0;
  // flex-grow: 1;

  &:hover {
    cursor: pointer;
  }

  .indicator {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate( -50%, -50% );
    padding: 3px 15px 3px 25px;
    color: white;
    font-size: 2rem;  
    border-radius: 5px 5px 5px 5px;
  }
  
}

img {
  user-select: none;
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