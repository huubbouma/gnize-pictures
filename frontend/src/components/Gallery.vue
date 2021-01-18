<template>
  <div class="wrapper">
    <ul class="gallery">
      <li :ref="item.id" class="gallery-panel" v-for="(item, index) in media" :key="item.path">
        <template v-if="!itemId">
          <transition name="fade" appear>
            <div class="image-wrapper" v-show="loadedImages[item.id]">
              <img
                @click="showInOverlay(index)"
                :src="item.thumb"
                v-loaded-if-complete="loadedImages[item.id]"
                @load="loadedImages[item.id] = true"
              />
              <i
                @click="showInOverlay(index)"
                v-if="item.type === 'video' && item.hasThumb"
                class="indicator pi pi-chevron-circle-right"
              ></i>
              <DeleteItem :item="item" :keyHandler="false" />
              <NefItem :item="item" :keyHandler="false" />
            </div>
          </transition>
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
      showOverlay: false,
      currentIndex: 0,
      lastItemSelected: null,
      loadedImages: {},
    };
  },
  computed: {
    ...mapGetters(['currentItem', 'getItemsToDelete']),
  },
  watch: {
    media(newValue) {
      newValue.forEach((element) => {
        if (element.type === 'image') {
          this.loadedImages[element.id] = false;
        }
      });
    },
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
    loadImage(item) {
      console.log('loaded: loadImage');
      this.loadedImages[item.id] = true;
    },
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
.image-wrapper {
  transition-duration: 0.5s;
}

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
    transform: translate(-50%, -50%);
    color: white;
    font-size: 3rem;    
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