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
          <div class="text-h6">{{`${selectedPhase.firstName} ${selectedPhase.lastName}`}}</div>
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
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn color="negative" flat label="Remove Phase" v-close-popup @click="removePhase" v-if="!isEditMode" />
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
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'phase', label: 'Phase', align: 'left', field: 'phase' },
        { name: 'description', label: 'Description', align: 'left', field: 'description' },
        { name: 'date_time_created', label: 'Created On', align: 'left', field: 'date_time_created' },
        { name: 'created_by', label: 'Created By', align: 'left', field: 'created_by' },
        { name: 'date_time_updated', label: 'Updated On', align: 'left', field: 'date_time_updated' },
        { name: 'updated_by', label: 'Updated By', align: 'left', field: 'updated_by' }
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
      this.isAddingPhase = true
      this.$store.dispatch('phase/addPhase', {
        phase: this.phase,
        description: this.description
      }).then(data => {
        this.isAddingPhase = false
        this.phase = ''
        this.description = ''
      })
    },
    editPhase () {
      this.isEditMode = false
      this.$store.dispatch('phase/updatePhase', this.selectedPhase)
    },
    viewPhase (event, row) {
      this.showPhaseProfile = true
      this.selectedPhase = JSON.parse(JSON.stringify(row))
    },
    removePhase () {
      this.isEditMode = false
      this.$store.dispatch('phase/removePhase', this.selectedPhase)
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
