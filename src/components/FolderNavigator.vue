<template>
  <div class="wrapper">
    <Breadcrumb :home="home" :model="breadcrumItems" />

    <ProgressSpinner v-if="loading" />
    
    <div class="listing" v-if="listing">
      <ul>
        <li v-for="folder in listing.folders" :key="folder.id">
          <router-link :to="{ name: 'Main', params: { path: getPath(folder.id) } }">
            <Chip :label="folder.name" />
          </router-link>
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
  },

  data() {
    return {
      home: { icon: 'pi pi-home', to: '/' },
      listing: {},
      showPictures: true,
      showVideos: true,
      loading: true,
      error: false,
    };
  },
  components: { Gallery },
  methods: {
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
    ...mapGetters(['currentItem']),
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
                thumb: videoIcon,
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
  },
};
</script>

<style lang="scss" scoped>
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
}

li a {
  color: lightgray;
}
.hist {
  color: white;
}
</style>>
