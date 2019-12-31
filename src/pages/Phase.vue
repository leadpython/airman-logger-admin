<template>
  <q-page class="page-container flex column">
    <div class="bg-primary text-black" style="padding: 10px 0 5px 0;">
      <q-toolbar>
        <q-btn @click="showAddPhase = true" color="white" flat icon="person_add" label="Add Phase" style="border-radius: 0px;" />
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
      title="Phase"
      :data="phases"
      :columns="columns"
      @row-click="viewPhase"
    />

    <q-dialog v-model="showAddPhase" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Add Phase</div>
        </q-card-section>

        <q-card-section>
          <div class="add-phase-row">
            <label>Phase Number</label>
            <q-input v-model="phase" square dense outlined />
          </div>
          <div class="add-phase-row">
            <label>Description</label>
            <q-input v-model="description" square dense outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat label="Close" v-close-popup />
          <q-btn flat label="Add" @click="addPhase" v-close-popup />
        </q-card-actions>

        <q-inner-loading :showing="isAddingPhase">
          <q-spinner
            color="primary"
            size="100px"
            :thickness="10"
          />
        </q-inner-loading>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showPhaseProfile" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Phase</div>
        </q-card-section>

        <q-card-section>
          <div class="add-phase-row">
            <label>Phase Number</label>
            <q-input v-model="selectedPhase.phase" square dense outlined :disable="true" />
          </div>
          <div class="add-phase-row">
            <label>Description</label>
            <q-input v-model="selectedPhase.description" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-phase-row">
            <label style="color: red;">{{errorMessage}}</label>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn color="negative" flat label="Remove Phase" @click="removePhase" v-if="!isEditMode" />
          <q-btn flat label="Close" v-close-popup v-if="!isEditMode" />
          <q-btn flat label="Edit" @click="isEditMode = true" v-if="!isEditMode" />
          <q-btn flat label="Cancel" @click="isEditMode = false" v-if="isEditMode" />
          <q-btn flat label="Finalize" v-close-popup @click="editPhase" v-if="isEditMode" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
export default {
  name: 'PagePhase',
  data () {
    return {
      phase: '',
      description: '',
      showPhaseProfile: false,
      showAddPhase: false,
      selectedPhase: {},
      isEditMode: false,
      isAddingPhase: false,
      errorMessage: '',
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'phase', label: 'Phase', align: 'left', field: 'phase' },
        { name: 'description', label: 'Description', align: 'left', field: 'description' }
      ]
    }
  },
  computed: {
    phases () {
      return this.$store.getters['phase/phases'] || []
    }
  },
  methods: {
    addPhase () {
      const self = this
      self.isAddingPhase = true
      self.$store.dispatch('phase/addPhase', {
        phase: self.phase,
        description: self.description
      }).then(data => {
        self.isAddingPhase = false
        self.phase = ''
        self.description = ''
      })
    },
    editPhase () {
      this.isEditMode = false
      this.$store.dispatch('phase/updatePhase', this.selectedPhase)
    },
    viewPhase (event, row) {
      this.showPhaseProfile = true
      this.selectedPhase = JSON.parse(JSON.stringify(row))
      this.errorMessage = ''
    },
    removePhase () {
      const self = this
      this.isEditMode = false
      this.$store.dispatch('phase/removePhase', this.selectedPhase).then(data => {
        const { status } = data
        if (status) {
          self.showPhaseProfile = false
        } else {
          self.showPhaseProfile = true
          self.errorMessage = 'Cannot delete phase.'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-phase-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    font-size: 12px;
    color: rgb(100,100,100);
  }
}
</style>
