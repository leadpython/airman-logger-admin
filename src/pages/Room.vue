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
      :data="rooms"
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
            <q-input v-model="room" maxlength=10 square dense outlined />
          </div>
          <div class="add-room-row">
            <label>Description</label>
            <q-input v-model="description" square dense outlined />
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
          <div class="text-h6">Room {{`${selectedRoom.room_number}`}}</div>
        </q-card-section>

        <q-card-section>
          <div class="add-room-row">
            <label>Room Number</label>
            <q-input v-model="selectedRoom.room_number" square dense outlined :disable="true" />
          </div>
          <div class="add-room-row">
            <label>Description</label>
            <q-input v-model="selectedRoom.description" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-room-row">
            <label style="color: red;">{{errorMessage}}</label>
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
      room: '',
      description: '',
      showRoomProfile: false,
      showAddRoom: false,
      selectedRoom: {},
      errorMessage: '',
      isEditMode: false,
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'room_number', label: 'Room Number', align: 'left', field: 'room_number' },
        { name: 'description', label: 'Description', align: 'left', field: 'description' }
      ]
    }
  },
  computed: {
    rooms () {
      return this.$store.getters['room/rooms']
    }
  },
  methods: {
    addRoom () {
      const self = this
      self.isAddingRoom = true
      self.$store.dispatch('room/addRoom', {
        room: self.room,
        description: self.description,
        floor: self.floor,
        wing: self.wing
      }).then(data => {
        self.isAddingRoom = false
        self.room = ''
        self.description = ''
      })
    },
    editRoom () {
      this.isEditMode = false
      this.$store.dispatch('room/updateRoom', this.selectedRoom)
    },
    viewRoom (event, row) {
      this.showRoomProfile = true
      this.selectedRoom = JSON.parse(JSON.stringify(row))
      this.errorMessage = ''
    },
    removeRoom () {
      const self = this
      self.isEditMode = false
      self.$store.dispatch('room/removeRoom', self.selectedRoom).then(data => {
        const { status } = data
        if (status) {
          self.showRoomProfile = false
        } else {
          self.showRoomProfile = true
          self.errorMessage = 'Cannot delete room.'
        }
      })
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
