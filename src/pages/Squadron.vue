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
      :data="data"
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
            <label>CACID</label>
            <q-input v-model="cacid" square dense outlined />
          </div>
          <div class="add-squadron-row">
            <label>First Name</label>
            <q-input v-model="firstName" square dense outlined />
          </div>
          <div class="add-squadron-row">
            <label>Last Name</label>
            <q-input v-model="lastName" square dense outlined />
          </div>
          <div class="add-squadron-row">
            <label>Room #</label>
            <q-select square outlined v-model="room" dense :options="options.room" />
          </div>
          <div class="add-squadron-row">
            <label>Squadron</label>
            <q-select square outlined v-model="squadron" dense :options="options.squadron" />
          </div>
          <div class="add-squadron-row">
            <label>Squadron</label>
            <q-select square outlined v-model="squadron" dense :options="options.squadron" />
          </div>
          <div class="add-squadron-row">
            <label>Status</label>
            <q-select square outlined v-model="status" dense :options="options.status" />
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
          <div class="text-h6">{{`${selectedSquadron.firstName} ${selectedSquadron.lastName}`}}</div>
        </q-card-section>

        <q-card-section>
          <div class="add-squadron-row">
            <label>CACID</label>
            <q-input v-model="selectedSquadron.cacid" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-squadron-row">
            <label>First Name</label>
            <q-input v-model="selectedSquadron.firstName" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-squadron-row">
            <label>Last Name</label>
            <q-input v-model="selectedSquadron.lastName" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-squadron-row">
            <label>Room #</label>
            <q-select square outlined v-model="selectedSquadron.room" dense :options="options.room" :disable="!isEditMode" />
          </div>
          <div class="add-squadron-row">
            <label>Squadron</label>
            <q-select square outlined v-model="selectedSquadron.squadron" dense :options="options.squadron" :disable="!isEditMode" />
          </div>
          <div class="add-squadron-row">
            <label>Squadron</label>
            <q-select square outlined v-model="selectedSquadron.squadron" dense :options="options.squadron" :disable="!isEditMode" />
          </div>
          <div class="add-squadron-row">
            <label>Status</label>
            <q-select square outlined v-model="selectedSquadron.status" dense :options="options.status" :disable="!isEditMode" />
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
      searchTerm: '',
      cacid: '',
      firstName: '',
      lastName: '',
      room: '',
      phase: '',
      squadron: '',
      status: '',
      options: {
        room: [],
        phase: [],
        squadron: [],
        status: []
      },
      showSquadronProfile: false,
      showAddSquadron: false,
      selectedSquadron: {},
      isEditMode: false,
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'squadron', label: 'Squadron', align: 'left', field: 'squadron' },
        { name: 'description', label: 'Description', align: 'left', field: 'description' },
        { name: 'date_time_created', label: 'Created On', align: 'left', field: 'date_time_created' },
        { name: 'created_by', label: 'Created By', align: 'left', field: 'created_by' },
        { name: 'date_time_updated', label: 'Updated On', align: 'left', field: 'date_time_updated' },
        { name: 'updated_by', label: 'Updated By', align: 'left', field: 'updated_by' }
      ],
      data: [
        {
          squadron: 'test squadron',
          description: 'squadron for testing',
          date_time_created: '12/27/2019',
          created_by: 'John Danks',
          date_time_updated: '12/27/2019',
          updated_by: 'John Danks'
        }
      ]
    }
  },
  computed: {
    roomOptions () {
      return this.options.room
    },
    phaseOptions () {
      return this.options.phase
    },
    squadronOptions () {
      return this.options.squadron
    },
    statusOptions () {
      return this.options.status
    }
  },
  methods: {
    addSquadron () {
      // add squadron to squadron_master
    },
    editSquadron () {
      // edit squadron
    },
    viewSquadron (event, row) {
      this.showSquadronProfile = true
      this.selectedSquadron = row
    },
    removeSquadron () {
      // remove squadron
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
