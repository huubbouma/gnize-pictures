<template>
  <div class="wrapper">
    <ul class="gallery">
      <li
        :ref="item.id"
        class="gallery-panel"
        :class="{ selected: isSelected(item) }"
        v-for="(item, index) in media"
        :key="item.path"
      >
        <template v-if="!itemId">
          <transition name="fade" appear>
            <div class="image-wrapper" v-show="loadedImages[item.id]">
              <img
                @click="selectOrshowInOverlay(index, item)"
                :src="item.thumb"
                v-loaded-if-complete="loadedImages[item.id]"
                @load="loadedImages[item.id] = true"
              />
              <div class="selection-overlay" @click="selectOrshowInOverlay(index, item)" />
              <i
                @click="selectOrshowInOverlay(index, item)"
                v-if="item.type === 'video' && item.hasThumb"
                class="indicator pi pi-chevron-circle-right"
              ></i>
              <SelectItem :item="item" :keyHandler="false" />
              <DeleteItem :item="item" :keyHandler="false" />
              <NefItem :item="item" :keyHandler="false" />
              <Button
                v-if="item.path in getItemsSelected"
                @click="showInOverlay(index)"
                icon="pi pi-search-plus"
                iconPos="right"
                class="button-show-item p-button-raised p-button-rounded"
              />
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
import SelectItem from './SelectItem.vue';
import NefItem from './NefItem.vue';

export default {
  name: 'Gallery',

  components: { Overlay, DeleteItem, NefItem, SelectItem },

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
    ...mapGetters(['currentItem', 'getItemsSelected', 'getNumberOfItemsSelected']),
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
    isSelected(item) {
      return item.path in this.getItemsSelected;
    },
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

    selectOrshowInOverlay(index, item) {
      if (this.getNumberOfItemsSelected) {
        return this.$store.commit('toggleItemsSelected', item);
      }
      return this.showInOverlay(index);
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
    // toggleSelect(item) {
    //   this.$store.commit('setCurrentItem', this.media[this.currentIndex]);
    //   toggleSelect
    // }
  },
  mounted() {
    this.currentIndex = 0;
  },
};
</script>

<style lang="scss" scoped>
.image-wrapper {
  position: relative;
  transition-duration: 0.5s;
  background-color: #e7f0fe;
}

.gallery-panel {
  position: relative;
}

.delete-item {
  position: absolute;
  top: 0;
  right: 0;
}

.button-show-item {
  position: absolute;
  bottom: 0.3rem;
  right: 0.3rem;
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
  // height: 40vh;
  flex-grow: 0;
  // flex-grow: 1;
  padding: 0.1rem;
  overflow: hidden;
  width: auto;

  &.selected {
    img {
      transform: scale(0.9, 0.9);
    }
  }

  .select-item {
    // display: none;
    visibility: hidden;
    position: absolute;
    left: 2%;
    top: 0;
    color: white;
    font-size: 3rem;
    &.selected {
      visibility: initial;
    }
  }

  .selection-overlay {
    visibility: hidden;
  }

  &:hover {
    cursor: pointer;

    .selection-overlay {
      visibility: initial;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;
      background: rgb(0, 0, 0);
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(255, 255, 255, 0) 30%);
    }

    .select-item {
      visibility: initial;
    }
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
  max-height: auto;
  height: auto;
  width: 100%;
  object-fit: cover;
  vertical-align: bottom;
  // padding: 0.1rem;
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