<template>
  <div>
    <FolderNavigator :path="fixedPath" :itemId="itemId" />

    <Sidebar v-model:visible="sideBarVisible" position="right">
      <Card>
        <template #title>Menu</template>
        <template #content>
          <div class="p-mt-4" v-if="role.includes('admin')">
            <Button label="Admin" icon="pi pi-cog" iconPos="left" @click="go('admin')" />
          </div>
          <div class="p-mt-4">
            <Button label="Logout" icon="pi pi-times" iconPos="left" @click="go('logout')" />
          </div>
          <div class="p-mt-4" v-if="getNumberOfItemsSelected">
            <Button @click="clearSelection()" icon="pi pi-times" iconPos="right" class="p-button-raised p-button-rounded" />
            {{ getNumberOfItemsSelected }} items selected
          </div>
        </template>
      </Card>
    </Sidebar>

    <div class="cast-button-wrapper">
      <div ref="castButton"></div>
    </div>

    <Button
      icon="pi pi-cog"
      class="p-button-rounded p-button-info p-button-text settings-button"
      @click="sideBarVisible = true"
    />
  </div>
</template>

<script>
import FolderNavigator from '@/components/FolderNavigator.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Main',

  components: { FolderNavigator },
  props: {
    path: {
      required: false,
      type: [Array, String],
    },
    itemId: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      sideBarVisible: false,
    };
  },
  mounted() {
    const btn = document.createElement('google-cast-launcher');
    this.$refs.castButton.appendChild(btn);
  },
  methods: {
    clearSelection() {
      this.$store.commit('clearItemsSelected');
    },
    go(to) {
      this.sideBarVisible = false;

      switch (to) {
        case 'admin':
          this.$router.push({ name: 'Admin' });
          break;
        case 'logout':
          this.$router.push({ name: 'Login' });
          break;

        default:
          break;
      }
    },
  },

  computed: {
    ...mapGetters(['role', 'getNumberOfItemsSelected']),

    fixedPath() {
      return this.path || [];
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.settings-button {
  position: absolute;
  right: 0.5em;
  top: 0.5em;
}
.cast-button-wrapper {
  width: 1.3em;
  position: absolute;
  right: 2.5em;
  top: 1em;
}
</style>
