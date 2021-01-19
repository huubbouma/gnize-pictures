<template>
  <div>
    <Breadcrumb :home="home" :model="breadcrumbs" />
    <Card>
      <template #title>Admin</template>
      <template #content>
        <ToggleButton
          v-model="showFileOperations"
          onLabel="Toon bestandsoperaties"
          offLabel="Geen bestandsoperaties"
          onIcon="pi pi-check"
          offIcon="pi pi-times"
        />

        <div class="p-mt-5" v-if="hasItemsToDelete()">
          <Button
            label="Verwijder geselecteerde items"
            class="p-button-danger p-mr-1"
            @click="removeSelected"
          />
          <Button label="Maak selectie leeg" class="p-button-warning" @click="clearSelection" />

          <div v-if="hasItemsToDelete()">
            <h2>Te verwijderen bestanden</h2>
            <div v-for="(sub, p) of getItemsByFolder" :key="p">
              <h3>{{ sub[0].folderPath.join('/') }}</h3>
              <ul class="p-d-flex p-flex-wrap">
                <li class="img-wrapper p-col-6 p-md-4 p-lg-2" v-for="item of sub" :key="item.src">
                  <img class="img-preview" @click="showInOverlay(index)" :src="item.thumb" />
                  <DeleteItem :item="item" :keyHandler="false" />
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="p-mt-5" v-if="hasNefItemsToDelete()">
          <Button
            label="Verwijder geselecteerde NEF items"
            class="p-button-danger p-mr-1"
            @click="removeSelectedNef"
          />
          <Button label="Maak selectie leeg" class="p-button-warning" @click="clearNefSelection" />

          <div v-if="hasNefItemsToDelete()">
            <h2>Te verwijderen NEF bestanden</h2>
            <div v-for="(sub, p) of getNefItemsByFolder" :key="p">
              <h3>{{ sub[0].folderPath.join('/') }}</h3>
              <ul class="p-d-flex p-flex-wrap">
                <li class="img-wrapper p-col-6 p-md-4 p-lg-2" v-for="item of sub" :key="item.src">
                  <img class="img-preview" @click="showInOverlay(index)" :src="item.thumb" />
                  <NefItem :item="item" :keyHandler="false" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DeleteItem from '@/components/DeleteItem.vue';
import NefItem from '@/components/NefItem.vue';

export default {
  name: 'Admin',
  data() {
    return {
      home: { icon: 'pi pi-home', to: '/' },
      breadcrumbs: [],
    };
  },

  components: { DeleteItem, NefItem },
  watch: {},
  methods: {
    hasItemsToDelete() {
      return Object.keys(this.getItemsToDelete).length > 0;
    },
    hasNefItemsToDelete() {
      return Object.keys(this.getNefItemsToDelete).length > 0;
    },

    clearSelection() {
      this.$store.commit('clearItemsToDelete');
    },
    clearNefSelection() {
      this.$store.commit('clearNefItemsToDelete');
    },
    removeSelectedNef() {
      // eslint-disable-next-line no-alert
      alert('todo');
    },
    removeSelected() {
      this.$store.dispatch('REMOVE_ITEMS').then(
        () => {
          this.$toast.add({
            severity: 'info',
            summary: 'Bestanden verwijderd',
            detail: `Bestanden zijn verwijderd`,
          });
        },
        (error) => {
          this.$toast.add({
            severity: 'warn',
            summary: 'Fout bij verwijderen bestanden',
            detail: error.message,
          });
        },
      );
    },
  },
  computed: {
    ...mapGetters(['getItemsToDelete', 'getNefItemsToDelete']),

    getItemsByFolder() {
      const items = {};

      const values = Object.values(this.getItemsToDelete);

      values.forEach((item) => {
        const sub = items[item.folderUri] || [];
        sub.push(item);
        items[item.folderUri] = sub;
      });

      return items;
    },

    getNefItemsByFolder() {
      const items = {};

      const values = Object.values(this.getNefItemsToDelete);

      values.forEach((item) => {
        const sub = items[item.folderUri] || [];
        sub.push(item);
        items[item.folderUri] = sub;
      });

      return items;
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
};
</script>
<style lang="scss" scoped>
.img-wrapper {
  position: relative;
}
.delete-item {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 1em;
  margin-top: 1em;
}

.nef-item {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: 1em;
  margin-top: 1em;
}

.img-preview {
  width: 100%;
}

li {
  list-style: none;
}
</style>