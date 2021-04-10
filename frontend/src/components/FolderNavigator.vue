<template>
  <div class="wrapper">
    <div id="sticky-nav" :class="{ sticky: stickyActive }">
      <Breadcrumb :home="home" :model="breadcrumItems" />
    </div>

    <ProgressSpinner v-if="loading" />

    <div class="listing" v-if="listing">
      <ul>
        <li v-for="folder in listing.folders" :key="folder.id">
          <router-link :to="{ name: 'Main', params: { path: getPath(folder.id) } }">
            <Button>
              {{ folder.name }}
            </Button>
          </router-link>
        </li>
        <li class="new-folder-item" v-if="isAdmin && showFileOperations">
          <Inplace :active="showNewMapInplace" :closable="true" @open="showNewMapInplace = true">
            <template #display>Nieuwe map..</template>
            <template #content>
              <InputText v-model="newFolderName" autoFocus />
              <Button :disabled="!newFolderName" @click="createNewFolder" icon="pi pi-check" />
            </template>
          </Inplace>
        </li>
      </ul>

      <div class="filter" v-if="listing.media && listing.media.length > 0">
        <div class="filteritem">
          <label>Toon Foto's</label>
          <InputSwitch v-model="showPictures" />
        </div>
        <div class="filteritem">
          <label>Toon Filmpjes</label>
          <InputSwitch v-model="showVideos" />
        </div>
      </div>

      <Gallery :media="media" :itemId="itemId" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Gallery from './Gallery.vue';
import MediaService from '../services/MediaService';

const videoIcon = require('@/assets/video-icon.png');

export default {
  name: 'FolderNavigator',
  props: {
    path: {
      required: true,
      type: Array,
    },
    itemId: {
      required: false,
      type: String,
    },
    reload: {
      required: false,
      type: Number,
    },
  },

  data() {
    return {
      home: { icon: 'pi pi-home', to: '/' },
      listing: {},
      // showPictures: true,
      // showVideos: true,
      loading: true,
      error: false,
      stickyActive: false,
      newFolderName: null,
      showNewMapInplace: false,
    };
  },
  components: { Gallery },
  methods: {
    createNewFolder() {
      this.showNewMapInplace = false;
      const newPath = this.getPath(this.newFolderName);
      const folderPath = encodeURIComponent(newPath.join('/'));
      MediaService.createFolder(folderPath).then(() => {
        this.newFolderName = '';
        this.getListing();
      });
    },
    getPath(item) {
      const newPath = this.path.map((it) => {
        const decodedItem = decodeURIComponent(decodeURIComponent(it));
        return decodedItem;
      });

      newPath.push(decodeURIComponent(item));
      return newPath;
    },
    getListing() {
      this.loading = true;
      const filePath = encodeURIComponent(this.path.join('/'));

      return this.$http
        .get(`${process.env.VUE_APP_MEDIASERVER_URL}/folder/list/?path=${filePath}`)
        .then(
          (response) => {
            this.listing = response.data;
            this.loading = false;
            this.error = false;
          },
          (err) => {
            this.error = true;
            this.loading = false;

            this.$toast.add({
              severity: 'warn',
              summary: 'Error loading listing',
              detail: err.message,
            });
          },
        );
    },
  },
  computed: {
    ...mapGetters([
      'currentItem',
      'getShowPictures',
      'getShowVideos',
      'showFileOperations',
      'isAdmin',
    ]),

    showVideos: {
      get() {
        return this.getShowVideos;
      },
      set(value) {
        this.$store.commit('setShowVideos', value);
        if (!value && !this.getShowPictures) {
          this.showPictures = true;
        }
      },
    },
    showPictures: {
      get() {
        return this.getShowPictures;
      },
      set(value) {
        this.$store.commit('setShowPictures', value);
        if (!value && !this.getShowVideos) {
          this.showVideos = true;
        }
      },
    },
    breadcrumItems() {
      const hist = [];
      const items = this.path.map((item) => {
        const decodedItem = decodeURIComponent(decodeURIComponent(item));
        hist.push(encodeURIComponent(decodedItem));
        return {
          label: decodeURIComponent(item),
          to: `/${hist.join('/')}`,
        };
      });
      return items;
    },

    media() {
      let result = [];

      const cleanPath = this.path.map((item) => {
        const decodedItem = decodeURIComponent(decodeURIComponent(item));
        return encodeURIComponent(decodedItem);
      });

      if (this.listing.media) {
        result = this.listing.media
          .filter((item) => {
            if (item.type === 'image' && this.showPictures) {
              return true;
            }
            if (item.type === 'movie' && this.showVideos) {
              return true;
            }
            return false;
          })
          .map((item) => {
            const folderPath = cleanPath.join('/');

            let props = null;
            if (item.type === 'movie') {
              props = {
                type: 'video',
                id: item.id,
                encodedId: encodeURIComponent(item.id),
                folderPath: this.path,
                folderUri: folderPath,
                path: `${folderPath}/${encodeURIComponent(item.id)}`,
                sources: [
                  {
                    src: `${
                      process.env.VUE_APP_MEDIASERVER_URL
                    }/media/movie/?path=${folderPath}/${encodeURIComponent(item.id)}&movie_type=${
                      item.ext
                    }`,
                    type: `video/${item.ext}`,
                  },
                ],
                hasThumb: item.thumb,
                thumb: item.thumb
                  ? `${
                      process.env.VUE_APP_MEDIASERVER_URL
                    }/media/movie/?path=${folderPath}/${encodeURIComponent(item.thumb)}&thumb=true`
                  : videoIcon,
                caption: item.name,
                width: 800, // Required
                height: 600, // Required
                autoplay: true, // Optional: Autoplay video when the lightbox opens
              };
            }
            if (item.type === 'image') {
              props = {
                id: item.id,
                folderPath: this.path,
                folderUri: folderPath,
                path: `${folderPath}/${encodeURIComponent(item.id)}`,
                type: 'image',
                nef: item.nef,
                src: `${
                  process.env.VUE_APP_MEDIASERVER_URL
                }/media/image/?path=${folderPath}/${encodeURIComponent(item.id)}&size=web`,
                original: `${
                  process.env.VUE_APP_MEDIASERVER_URL
                }/media/image/?path=${folderPath}/${encodeURIComponent(item.id)}&size=original`,
                thumb: `${
                  process.env.VUE_APP_MEDIASERVER_URL
                }/media/image/?path=${folderPath}/${encodeURIComponent(item.id)}&size=thumbnail`,
                caption: item.name,
              };
            }
            return props;
          });
      }
      return result;
    },
  },
  created() {
    // window.history.pushState({}, null, "/");

    if (this.itemId) {
      const decodedItemId = decodeURIComponent(this.itemId);
      this.getListing().then(() => {
        // if an itemId is passed, then load it now
        this.media.forEach((item) => {
          if (decodeURIComponent(item.id) === decodedItemId) {
            this.$store.commit('setCurrentItem', item);
          }
        });
      });
    }
  },
  mounted() {
    this.getListing();

    window.document.onscroll = () => {
      const navBar = document.getElementById('sticky-nav');
      if (window.scrollY > navBar.offsetTop) {
        this.stickyActive = true;
      } else {
        this.stickyActive = false;
      }
    };

    // const cleanPath = this.path.map((item) => {
    //   const decodedItem = decodeURIComponent(decodeURIComponent(item));
    //   return encodeURIComponent(decodedItem);
    // });

    // if (this.itemId) {
    //   const folderPath = `/${cleanPath.join('/')}`;
    //   window.history.pushState({}, null, folderPath);
    //   console.log(window.history);
    // }
  },
  watch: {
    // currentItem(newValue) {
    //   if (!newValue) {
    //     const cleanPath = this.path.map((item) => {
    //       const decodedItem = decodeURIComponent(decodeURIComponent(item));
    //       return encodeURIComponent(decodedItem);
    //     });
    //     const folderPath = `/${cleanPath.join('/')}`;
    //     window.history.replaceState({}, null, folderPath);
    //   }
    // },

    path() {
      this.listing = [];
      this.getListing();
    },
    reload() {
      this.listing = [];
      this.getListing();
    },
  },
};
</script>

<style lang="scss">
.sticky {
  position: fixed; /* fixing the position takes it out of html flow - knows
                   nothing about where to locate itself except by browser
                   coordinates */
  left: 0em; /* top left corner should start at leftmost spot */
  top: 0; /* top left corner should start at topmost spot */
  width: 100vw; /* take up the full browser width */
  z-index: 1; /* high z index so other content scrolls underneath */
  height: 100px; /* define height for content */
}

.filter {
  color: lightgray;
  display: flex;
}
.filteritem {
  display: flex;
  label {
    margin: auto 1em;
  }
}

.wrapper,
.listing,
ul,
li {
  list-style: none;
  user-select: none;
  padding-bottom: 0.5em;
  a {
    text-decoration: none;
  }
  &.new-folder-item {
    padding-top: 0.5em;
    color: #aaa;
  }
}

// li input {
//   color: lightgray;
// }
.hist {
  color: white;
}
</style>>
