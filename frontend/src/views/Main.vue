<template>
  <div>
    <FolderNavigator :reload="reloadFolder" :path="fixedPath" :itemId="itemId" />

    <Sidebar v-model:visible="sideBarVisible" position="right">
      <Card>
        <template #title>Menu</template>
        <template #content>
          <div class="p-mt-4">
            <Button label="Logout" icon="pi pi-times" iconPos="left" @click="go('logout')" />
          </div>
        </template>
      </Card>

      <Card v-if="role.includes('admin')">
        <template #title>Admin</template>
        <template #content>
          <ToggleButton
            v-model="showFileOperations"
            onLabel="Toon bestandsoperaties"
            offLabel="Geen bestandsoperaties"
            onIcon="pi pi-check"
            offIcon="pi pi-times"
          />

          <Admin @items-removed="reloadFolder++" :path="fixedPath"></Admin>
        </template>
      </Card>
    </Sidebar>

    <div class="cast-button-wrapper">
      <div ref="castButton"></div>
    </div>

    <div class="settings-button-wrapper">
      <Button
        icon="pi pi-cog"
        class="p-button-rounded p-button-info p-button-text settings-button"
        @click="sideBarVisible = true"
      />
    </div>
  </div>
</template>

<script>
import FolderNavigator from '@/components/FolderNavigator.vue';
import Admin from '@/components/Admin.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Main',

  components: { FolderNavigator, Admin },
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
      reloadFolder: 0,
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

    showFileOperations: {
      get() {
        return this.$store.getters.showFileOperations;
      },
      set(value) {
        this.$store.commit('setShowFileOperations', value);
      },
    },
  },
  watch: {},
};
</script>

<style lang="scss">
.p-sidebar {
  overflow: scroll;
}
.settings-button-wrapper {
  position: fixed;
  right: 0.5em;
  top: 0.5em;
  z-index: 2;
}
.cast-button-wrapper {
  width: 1.3em;
  position: fixed;
  right: 2.5em;
  top: 1em;
  z-index: 2;
}
</style>
