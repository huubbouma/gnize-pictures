<template>
  <div v-if="item" ref="lightbox" class="lightbox" @click.self="closeLightbox()" tabindex="0">
    <img v-if="item.type === 'image'" :src="item.src" />
    <video ref="video" controls autoplay v-if="item.type === 'video'">
      <source
        v-for="(src, index) of item.sources"
        :src="src.src"
        :type="src.type"
        :key="`${item.id}-${index}`"
      />
      Your browser does not support the video tag.
    </video>
    <div class="arrow" id="left-arrow" v-on:click="previous">
      <i class="pi pi-arrow-circle-left" style="font-size: 3em"></i>
    </div>
    <div class="arrow" id="right-arrow" v-on:click="next">
      <i class="pi pi-arrow-circle-right" style="font-size: 3em"></i>
    </div>
    <DeleteItem :item="item" :keyHandler="true" />
    <NefItem :item="item" :keyHandler="true" />
  </div>
</template>

<script>
import DeleteItem from './DeleteItem.vue';
import NefItem from './NefItem.vue';

export default {
  name: 'Overlay',
  components: { DeleteItem, NefItem },

  emits: ['close', 'previous', 'next'],
  props: {
    item: {
      required: true,
    },
  },
  data() {
    return {
      startTouch: null,
    };
  },
  methods: {
    closeLightbox() {
      this.$emit('close');
    },
    previous() {
      this.$emit('previous');
    },
    next() {
      this.$emit('next');
    },
    handleKeydown(event) {
      if (event.keyCode === 37) {
        // arrow left
        this.previous();
      }
      if (event.keyCode === 39) {
        this.next();
      }
      if (event.keyCode === 27) {
        // escape button
        this.closeLightbox();
      }
    },
    fixRoute() {
      const { folderUri } = this.item;
      const newPath = `/${folderUri}/!${encodeURIComponent(this.item.id)}`;
      // window.history.pushState({}, null, newPath);
      window.history.pushState(window.history.state, '', newPath);
      // this.$route.next({path: newPath, replace: true});
    },
    handleTouchStart(event) {
      // note: don't mess with the 2 finger event to allow zooming in
      if (event.touches.length === 1) {
        // just one finger touched
        this.startTouch = event.touches.item(0).clientX;
      } else if (event.touches.length === 3) {
        // 3 fingers hit the screen, abort the touch
        this.startTouch = null;
        this.$emit('close');
      }
    },
    handleTouchEnd(event) {
      const offset = 100; // at least 100px are a swipe
      if (this.startTouch) {
        // the only finger that hit the screen left it
        const end = event.changedTouches.item(0).clientX;

        if (end > this.startTouch + offset) {
          // a left -> right swipe
          this.$emit('previous');
        }
        if (end < this.startTouch - offset) {
          // a right -> left swipe
          this.$emit('next');
        }
      }
    },
  },
  watch: {
    item() {
      this.fixRoute();
      const { video } = this.$refs;
      if (video) {
        video.load();
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeydown);
    document.body.classList.add('modal-open');
    this.fixRoute();

    const { lightbox } = this.$refs;
    lightbox.addEventListener('touchstart', this.handleTouchStart);
    lightbox.addEventListener('touchend', this.handleTouchEnd);
  },
  unmounted() {
    document.removeEventListener('keydown', this.handleKeydown);
    const { lightbox } = this.$refs;
    if (lightbox) {
      lightbox.removeEventListener('touchstart', this.handleSwipe);
      lightbox.removeEventListener('touchend', this.handleTouchEnd);
    }
    document.body.classList.remove('modal-open');
  },
};
</script>

<style lang="scss" scoped>
.delete-item {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
}

.nef-item {
  position: fixed;
  z-index: 1000;  
  top: 3em;
  right: 0;
}

*:focus {
  outline: none;
}

img,
video {
  user-select: none;
}

video {
  z-index: 999;
}

.lightbox {
  user-select: none;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 1);

  img,
  video {
    max-width: 100%;
    max-height: 100%;
    bottom: 0;
    left: 0;
    margin: auto;
    overflow: auto;
    position: fixed;
    right: 0;
    top: 0;
    -o-object-fit: contain;
    object-fit: contain;
  }

  .arrow {
    width: 35%;
    height: 100%;
    position: absolute;
    top: 0;
    opacity: 0;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        cursor: pointer;
        opacity: 0.5;
      }
    }

    &:active {
      cursor: pointer;
      opacity: 0.5;
    }

    i {
      top: 40%;
      position: absolute;
      color: white;
    }

    &#left-arrow {
      left: 0;
      i {
        left: 20px;
      }
    }

    &#right-arrow {
      right: 0;
      i {
        right: 20px;
      }
    }
  }
}
</style>