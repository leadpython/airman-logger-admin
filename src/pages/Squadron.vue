<template>
  <q-page class="page-container flex column">
    <div class="bg-primary text-black" style="padding: 10px 0 5px 0;">
      <q-toolbar>
        <q-btn @click="showAddSquadron = true" color="white" flat icon="person_add" label="Add Squadron" style="border-radius: 0px;" />
      </q-toolbar>
    </div>

    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      table-style="max-height: 755px"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-start="48"
      row-key="name"
      title="Squadron"
      :data="squadrons"
      :columns="columns"
      @row-click="viewSquadron"
    />

    <q-dialog v-model="showAddSquadron" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Add Squadron</div>
        </q-card-section>

        <q-card-section>
          <div class="add-squadron-row">
            <label>Squadron Number</label>
            <q-input v-model="squadron" maxlength=5 square dense outlined />
          </div>
          <div class="add-squadron-row">
            <label>Description</label>
            <q-input v-model="description" square dense outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat label="Close" v-close-popup />
          <q-btn flat label="Add" @click="addSquadron" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showSquadronProfile" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Squadron {{`${selectedSquadron.squadron}`}}</div>
        </q-card-section>

        <q-card-section>
          <div class="add-squadron-row">
            <label>Squadron Number</label>
            <q-input v-model="selectedSquadron.squadron" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-squadron-row">
            <label>Description</label>
            <q-input v-model="selectedSquadron.description" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-squadron-row">
            <label>Floor</label>
            <q-input v-model="selectedSquadron.floor" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-squadron-row">
            <label>Wing</label>
            <q-input v-model="selectedSquadron.wing" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-squadron-row">
            <label style="color: red;">{{errorMessage}}</label>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn color="negative" flat label="Remove Squadron" @click="removeSquadron" v-if="!isEditMode" />
          <q-btn flat label="Close" v-close-popup v-if="!isEditMode" />
          <q-btn flat label="Edit" @click="isEditMode = true" v-if="!isEditMode" />
          <q-btn flat label="Cancel" @click="isEditMode = false" v-if="isEditMode" />
          <q-btn flat label="Finalize" @click="editSquadron" v-if="isEditMode" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
export default {
  name: 'PageSquadron',
  data () {
    return {
      squadron: '',
      description: '',
      showSquadronProfile: false,
      showAddSquadron: false,
      selectedSquadron: {},
      errorMessage: '',
      isEditMode: false,
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'squadron', label: 'Squadron Number', align: 'left', field: 'squadron' },
        { name: 'description', label: 'Description', align: 'left', field: 'description' }
      ]
    }
  },
  computed: {
    squadrons () {
      return this.$store.getters['squadron/squadrons']
    }
  },
  methods: {
    addSquadron () {
      const self = this
      self.isAddingSquadron = true
      self.$store.dispatch('squadron/addSquadron', {
        squadron: self.squadron,
        description: self.description,
        floor: self.floor,
        wing: self.wing
      }).then(data => {
        self.isAddingSquadron = false
        self.squadron = ''
        self.description = ''
      })
    },
    editSquadron () {
      this.isEditMode = false
      this.$store.dispatch('squadron/updateSquadron', this.selectedSquadron)
    },
    viewSquadron (event, row) {
      this.showSquadronProfile = true
      this.selectedSquadron = JSON.parse(JSON.stringify(row))
      this.errorMessage = ''
    },
    removeSquadron () {
      const self = this
      self.isEditMode = false
      self.$store.dispatch('squadron/removePhase', self.selectedSquadron).then(data => {
        const { status } = data
        if (status) {
          self.showSquadronProfile = false
        } else {
          self.showSquadronProfile = true
          self.errorMessage = 'Cannot delete squadron.'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-squadron-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    font-size: 12px;
    color: rgb(100,100,100);
  }
}
</style>
