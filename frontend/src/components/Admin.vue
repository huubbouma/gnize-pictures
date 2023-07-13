<template>
  <div>
    <div class="p-mt-4 p-mb-4" v-if="getNumberOfItemsSelected">
      <Button @click="clearSelection()" icon="pi pi-times" iconPos="right" class="p-button-raised p-button-rounded" />
      {{ getNumberOfItemsSelected }} items selected
    </div>

    <div class="p-mt-5" v-if="getNumberOfItemsSelected > 0">

      <Inplace :active="showDeleteItemsInplace" :closable="true" @open="showDeleteItemsInplace = true">
        <template #display>
          <Button label="Verwijder geselecteerde items" @click="showDeleteItemsInplace = true" />
        </template>
        <template #content>
          <Button label="Verwijder" icon="pi pi-trash" class="p-button-danger p-mr-1" @click="removeSelected" />
        </template>
      </Inplace>

      <Inplace :active="showMoveItemsInplace" :closable="true" @open="showMoveItemsInplace = true">
        <template #display>
          <Button label="Verplaats geselecteerde items hierheen" @click="showMoveItemsInplace = true" />
        </template>
        <template #content>
          <Button label="Verplaats" icon="pi pi-copy" class="p-button-danger p-mr-1" @click="moveSelected" />
        </template>
      </Inplace>


      <div v-if="getNumberOfItemsSelected > 0">
        <h2>Geselecteerde items</h2>
        <div v-for="(sub, p) of getItemsByFolder" :key="p">
          <h3>{{ sub[0].folderPath.join('/') }}</h3>
          <ul class="p-d-flex p-flex-wrap">
            <li class="img-wrapper p-col-12 p-md-6" v-for="item of sub" :key="item.src">
              <img class="img-preview" @click="showInOverlay(index)" :src="item.thumb" />
              <!-- <DeleteItem :item="item" :keyHandler="false" /> -->
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="p-mt-5" v-if="hasNefItemsToDelete()">
      <Button label="Verwijder geselecteerde NEF items" class="p-button-danger p-mr-1" @click="removeSelectedNef" />
      <Button label="Maak selectie leeg" class="p-button-warning" @click="clearNefSelection" />

      <div v-if="hasNefItemsToDelete()">
        <h2>Te verwijderen NEF bestanden</h2>
        <div v-for="(sub, p) of getNefItemsByFolder" :key="p">
          <h3>{{ sub[0].folderPath.join('/') }}</h3>
          <ul class="p-d-flex p-flex-wrap">
            <li class="img-wrapper p-col-12 p-md-6" v-for="item of sub" :key="item.src">
              <img class="img-preview" @click="showInOverlay(index)" :src="item.thumb" />
              <NefItem :item="item" :keyHandler="false" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import DeleteItem from '@/components/DeleteItem.vue';
import NefItem from '@/components/NefItem.vue';

export default {
  name: 'Admin',
  props: {
    path: {
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      home: { icon: 'pi pi-home', to: '/' },
      breadcrumbs: [],
      emitWhenRemoved: false,
      showDeleteItemsInplace: false,
      showMoveItemsInplace: false,
    };
  },
  emits: ['items-removed'],

  components: { NefItem },
  watch: {
    getNumberOfItemsSelected(newValue) {
      if (this.emitWhenRemoved && newValue === 0) {
        this.$emit('items-removed');
      }
    },
  },
  methods: {
    hasNefItemsToDelete() {
      return Object.keys(this.getNefItemsToDelete).length > 0;
    },

    clearSelection() {
      this.$store.commit('clearItemsSelected');
    },
    clearNefSelection() {
      this.$store.commit('clearNefItemsToDelete');
    },
    removeSelectedNef() {
      // eslint-disable-next-line no-alert
      alert('todo');
    },
    removeSelected() {
      this.showDeleteItemsInplace = false;
      this.emitWhenRemoved = true;

      this.$store.dispatch('REMOVE_SELECTED_ITEMS').then(
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
          this.emitWhenRemoved = false;
        },
      );
    },

    moveSelected() {
      this.showMoveItemsInplace = false;
      this.emitWhenRemoved = true;

      this.$store.dispatch('MOVE_SELECTED_ITEMS', { folderPath: this.path }).then(
        () => {
          this.$toast.add({
            severity: 'info',
            summary: 'Bestanden verplaatst',
            detail: `Bestanden zijn verplaatst`,
          });
        },
        (error) => {
          this.$toast.add({
            severity: 'warn',
            summary: 'Fout bij verplaatsen bestanden',
            detail: error.message,
          });
          this.emitWhenRemoved = false;
        },
      );
    },
  },
  computed: {
    ...mapGetters(['getItemsSelected', 'getNumberOfItemsSelected', 'getNefItemsToDelete']),

    getItemsByFolder() {
      const items = {};

      const values = Object.values(this.getItemsSelected);

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