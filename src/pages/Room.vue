<template>
  <q-page class="page-container flex column">
    <div class="bg-primary text-black" style="padding: 10px 0 5px 0;">
      <q-toolbar>
        <q-btn @click="showAddRoom = true" color="white" flat icon="person_add" label="Add Room" style="border-radius: 0px;" />
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
      title="Room"
      :data="data"
      :columns="columns"
      @row-click="viewRoom"
    />

    <q-dialog v-model="showAddRoom" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Add Room</div>
        </q-card-section>

        <q-card-section>
          <div class="add-room-row">
            <label>Room Number</label>
            <q-input v-model="room" maxlength=5 square dense outlined />
          </div>
          <div class="add-room-row">
            <label>Description</label>
            <q-input v-model="description" square dense outlined />
          </div>
          <div class="add-room-row">
            <label>Floor</label>
            <q-input v-model="floor" square dense outlined />
          </div>
          <div class="add-room-row">
            <label>Wing</label>
            <q-input v-model="wing" square dense outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat label="Close" v-close-popup />
          <q-btn flat label="Add" @click="addRoom" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showRoomProfile" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Room {{`${selectedRoom.room}`}}</div>
        </q-card-section>

        <q-card-section>
          <div class="add-room-row">
            <label>Room Number</label>
            <q-input v-model="selectedRoom.room" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-room-row">
            <label>Description</label>
            <q-input v-model="selectedRoom.description" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-room-row">
            <label>Floor</label>
            <q-input v-model="selectedRoom.floor" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-room-row">
            <label>Wing</label>
            <q-input v-model="selectedRoom.wing" square dense outlined :disable="!isEditMode" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn color="negative" flat label="Remove Room" @click="removeRoom" v-if="!isEditMode" />
          <q-btn flat label="Close" v-close-popup v-if="!isEditMode" />
          <q-btn flat label="Edit" @click="isEditMode = true" v-if="!isEditMode" />
          <q-btn flat label="Cancel" @click="isEditMode = false" v-if="isEditMode" />
          <q-btn flat label="Finalize" @click="editRoom" v-if="isEditMode" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
export default {
  name: 'PageRoom',
  data () {
    return {
      searchTerm: '',
      room: '',
      description: '',
      floor: '',
      wing: '',
      showRoomProfile: false,
      showAddRoom: false,
      selectedRoom: {},
      isEditMode: false,
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'room', label: 'Room Number', align: 'left', field: 'room' },
        { name: 'description', label: 'Description', align: 'left', field: 'description' },
        { name: 'floor', label: 'Floor Number', align: 'left', field: 'floor' },
        { name: 'wing', label: 'Wing Number', align: 'left', field: 'wing' },
        { name: 'date_time_created', label: 'Created On', align: 'left', field: 'date_time_created' },
        { name: 'created_by', label: 'Created By', align: 'left', field: 'created_by' }
      ],
      data: [
        {
          room: 'test room',
          description: 'room for testing',
          floor: 'floor for testing',
          wing: 'wing for testing',
          date_time_created: '12/27/2019',
          created_by: 'John Danks'
        }
      ]
    }
  },
  computed: {
    phaseOptions () {
      return this.options.room
    },
    roomOptions () {
      return this.options.room
    },
    squadronOptions () {
      return this.options.squadron
    },
    statusOptions () {
      return this.options.status
    }
  },
  methods: {
    addRoom () {
      // add room to room_master
    },
    editRoom () {
      // edit room
    },
    viewRoom (event, row) {
      this.showRoomProfile = true
      this.selectedRoom = row
    },
    removeRoom () {
      // remove room
    }
  }
}
</script>

<style lang="scss" scoped>
.add-room-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    font-size: 12px;
    color: rgb(100,100,100);

  }
}
</style>
