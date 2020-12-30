<template>
  <div>
    <Breadcrumb :home="home" :model="breadcrumItems" />

    <div v-if="listing">
      <ul>
        <li v-for="folder in listing.folders" :key="folder.id">
          <router-link :to="{ name: 'Main', params: { path: `${path}/${folder.id}` } }">{{
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
      type: String,
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
    getListing() {
      this.$http
        .get(`${process.env.VUE_APP_MEDIASERVER_URL}/folder/list/?path=${this.path}`)
        .then((response) => {
          this.listing = response.data;
        });
    },
  },
  computed: {
    breadcrumItems() {
      const hist = [];
      const items = this.path
        .split('/')
        .filter((item) => {
          return item;
        })
        .map((item) => {
          hist.push(item);
          return {
            label: decodeURIComponent(item),
            to: encodeURIComponent(`/${hist.join('/')}`),
          };
        });
      return items;
    },

    media() {
      let result = [];
      if (this.listing.media) {
        result = this.listing.media.map((item) => {
          let props = null;
          if (item.type === 'movie') {
            props = {
              type: 'video',
              id: item.id,
              sources: [
                {
                  src: `${process.env.VUE_APP_MEDIASERVER_URL}/media/movie/?path=${this.path}/${item.id}&movie_type=${item.ext}`,
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
              type: 'image',
              src: `${process.env.VUE_APP_MEDIASERVER_URL}/media/image/?path=${this.path}/${item.id}&size=web`,
              thumb: `${process.env.VUE_APP_MEDIASERVER_URL}/media/image/?path=${this.path}/${item.id}&size=thumbnail`,
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
li a {
  color: lightgray;
}
</style>>
