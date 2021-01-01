<template>
  <div v-if="item" class="lightbox" @click.self="closeLightbox()" tabindex="0">
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
  </div>
</template>

<script>
export default {
  name: 'Overlay',
  emits: ['close', 'previous', 'next'],
  props: {
    item: {
      required: true,
    },
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
    // handlePopstate() {
    //   // console.log(`location: ${document.location}, state: ${JSON.stringify(event.state)}`);
    //   // don't go back, but close modal
    //   console.log("yo");
    //   // event.preventDefault();
    //   // event.stopImmediatePropagation()
    //   window.history.go(1);
    //   this.closeLightbox();

    // },
  },
  watch: {
    item() {
      const { video } = this.$refs;
      if (video) {
        video.load();
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeydown);
    document.body.classList.add('modal-open');
    // window.onpopstate = this.handlePopstate;
  },
  unmounted() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.body.classList.remove('modal-open');
    // window.onpopstate = () => {}
  },
};
</script>

<style lang="scss" scoped>
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