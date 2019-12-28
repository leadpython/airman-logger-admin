<template>
  <q-page class="page-container flex column">
    <div class="bg-primary text-black" style="padding: 10px 0 5px 0;">
      <q-toolbar class="flex">
        <q-input style="width: 100%; background: rgba(255,255,255,0.25);" standout square dark dense flat v-model="searchTerm">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
      <q-toolbar>
        <q-btn @click="showAddAirman = true" color="white" flat icon="person_add" label="Add Airman" style="border-radius: 0px;" />
      </q-toolbar>
    </div>

    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      table-style="max-height: 705px"
      :pagination.sync="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-start="48"
      row-key="name"
      title="Airman Roster"
      :data="data"
      :columns="columns"
      @row-click="viewAirman"
    />

    <q-dialog v-model="showAddAirman" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Add Airman</div>
        </q-card-section>

        <q-card-section>
          <div class="add-airman-row">
            <label>CACID</label>
            <q-input v-model="cacid" square dense outlined />
          </div>
          <div class="add-airman-row">
            <label>First Name</label>
            <q-input v-model="firstName" square dense outlined />
          </div>
          <div class="add-airman-row">
            <label>Last Name</label>
            <q-input v-model="lastName" square dense outlined />
          </div>
          <div class="add-airman-row">
            <label>Room #</label>
            <q-select square outlined v-model="room" dense :options="options.room" />
          </div>
          <div class="add-airman-row">
            <label>Phase</label>
            <q-select square outlined v-model="phase" dense :options="options.phase" />
          </div>
          <div class="add-airman-row">
            <label>Squadron</label>
            <q-select square outlined v-model="squadron" dense :options="options.squadron" />
          </div>
          <div class="add-airman-row">
            <label>Status</label>
            <q-select square outlined v-model="status" dense :options="options.status" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat label="Close" v-close-popup />
          <q-btn flat label="Add" @click="addAirman" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAirmanProfile" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 400px">
        <q-card-section>
          <div class="text-h6">{{`${selectedAirman.firstName} ${selectedAirman.lastName}`}}</div>
        </q-card-section>

        <q-card-section>
          <div class="add-airman-row">
            <label>CACID</label>
            <q-input v-model="selectedAirman.cacid" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-airman-row">
            <label>First Name</label>
            <q-input v-model="selectedAirman.firstName" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-airman-row">
            <label>Last Name</label>
            <q-input v-model="selectedAirman.lastName" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-airman-row">
            <label>Room #</label>
            <q-select square outlined v-model="selectedAirman.room" dense :options="options.room" :disable="!isEditMode" />
          </div>
          <div class="add-airman-row">
            <label>Phase</label>
            <q-select square outlined v-model="selectedAirman.phase" dense :options="options.phase" :disable="!isEditMode" />
          </div>
          <div class="add-airman-row">
            <label>Squadron</label>
            <q-select square outlined v-model="selectedAirman.squadron" dense :options="options.squadron" :disable="!isEditMode" />
          </div>
          <div class="add-airman-row">
            <label>Status</label>
            <q-select square outlined v-model="selectedAirman.status" dense :options="options.status" :disable="!isEditMode" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn color="negative" flat label="Remove Airman" @click="removeAirman" v-if="!isEditMode" />
          <q-btn flat label="Close" v-close-popup v-if="!isEditMode" />
          <q-btn flat label="Edit" @click="isEditMode = true" v-if="!isEditMode" />
          <q-btn flat label="Cancel" @click="isEditMode = false" v-if="isEditMode" />
          <q-btn flat label="Finalize" @click="editAirman" v-if="isEditMode" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
export default {
  name: 'PageAirman',
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
      showAirmanProfile: false,
      showAddAirman: false,
      selectedAirman: {},
      isEditMode: false,
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'cacid', label: 'CACID', align: 'left', field: 'cacid' },
        { name: 'lastName', label: 'Last Name', align: 'left', field: 'lastName' },
        { name: 'firstName', label: 'First Name', align: 'left', field: 'firstName' },
        { name: 'room', label: 'Room', align: 'left', field: 'room' },
        { name: 'phase', label: 'Phase', align: 'left', field: 'phase' },
        { name: 'squadron', label: 'Squadron', align: 'left', field: 'squadron' },
        { name: 'status', label: 'Status', align: 'left', field: 'status' }
      ],
      data: [
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
        },
        {
          cacid: 'test cacid',
          lastName: 'Danks',
          firstName: 'John',
          room: 'F1234',
          phase: '1',
          squadron: '382',
          status: '4392'
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
    addAirman () {
      // add airman to airman_master
    },
    editAirman () {
      // edit airman
    },
    viewAirman (event, row) {
      this.showAirmanProfile = true
      this.selectedAirman = row
    },
    removeAirman () {
      // remove airman
    }
  }
}
</script>

<style lang="scss" scoped>
.add-airman-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    font-size: 12px;
    color: rgb(100,100,100);

  }
}
</style>
