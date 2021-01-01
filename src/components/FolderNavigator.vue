<template>
  <div class="wrapper">
    <Breadcrumb :home="home" :model="breadcrumItems" />

    <div class="listing" v-if="listing">
      <ul>
        <li v-for="folder in listing.folders" :key="folder.id">
          <router-link :to="{ name: 'Main', params: { path: getPath(folder.id) } }">{{
            folder.name
          }}</router-link>
        </li>
      </ul>
      <Gallery :media="media" />
    </div>
  </div>
</template>

<script>
import Gallery from './Gallery.vue';

const videoIcon = require('@/assets/video-icon.png');

export default {
  name: 'FolderNavigator',
  props: {
    path: {
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      home: { icon: 'pi pi-home', to: '/' },
      listing: {},
    };
  },
  components: { Gallery },
  methods: {
    getPath(item) {
      const newPath = [...this.path];
      newPath.push(item);
      return newPath;
    },
    getListing() {
      const filePath = this.path.join('/');
      this.$http
        .get(`${process.env.VUE_APP_MEDIASERVER_URL}/folder/list/?path=${filePath}`)
        .then((response) => {
          this.listing = response.data;
        });
    },
  },
  computed: {
    breadcrumItems() {
      const hist = [];
      const items = this.path
        .map((item) => {
          hist.push(item);
          return {
            label: decodeURIComponent(item),
            to: `/${hist.join('/')}`,
          };
        });
      return items;
    },

    media() {
      let result = [];
      if (this.listing.media) {
        result = this.listing.media.map((item) => {
          const filePath = this.path.join('/');
          let props = null;
          if (item.type === 'movie') {
            props = {
              type: 'video',
              id: item.id,
              folderPath: this.path,
              sources: [
                {
                  src: `${process.env.VUE_APP_MEDIASERVER_URL}/media/movie/?path=${filePath}/${item.id}&movie_type=${item.ext}`,
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
              type: 'image',
              src: `${process.env.VUE_APP_MEDIASERVER_URL}/media/image/?path=${filePath}/${item.id}&size=web`,
              thumb: `${process.env.VUE_APP_MEDIASERVER_URL}/media/image/?path=${filePath}/${item.id}&size=thumbnail`,
              caption: item.name,
            };
          }
          return props;
        });
      }
      return result;
    },
  },
  mounted() {
    this.getListing();
  },

  watch: {
    path() {
      this.listing = [];
      this.getListing();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper,
.listing,
ul,
li {
  user-select: none;
}

li a {
  color: lightgray;
}
</style>>
