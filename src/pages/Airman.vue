<template>
  <q-page class="page-container flex column">
    <div class="bg-primary text-black" style="padding: 10px 0 5px 0;">
      <q-toolbar class="flex">
        <q-input style="width: 100%; background: rgba(255,255,255,0.25);" placeholder="Search by last name..." standout square dark dense flat v-model="searchTerm" maxlength="30" mask="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-toolbar>
      <q-toolbar>
        <q-btn @click="showAddAirman = true" color="white" flat icon="person_add" label="Add Airman" style="border-radius: 0px;" />
        <q-btn @click="refreshAirmanList" color="white" flat icon="loop" label="Refresh Airman List" style="border-radius: 0px;" />
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
      :data="airmen"
      :columns="columns"
      @row-click="viewAirman"
    />

    <q-dialog v-model="showAddAirman" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 500px">
        <q-card-section>
          <div class="text-h6">Add Airman</div>
        </q-card-section>

        <q-card-section>
          <div class="add-airman-row" style="padding-bottom: 25px; margin-bottom: 25px; border-bottom: 1px solid rgb(200,200,200);">
            <label style="font-weight: bold; margin-bottom: 10px;">CACID</label>
            <label>Front</label>
            <q-input v-model="check3dString" @input="check3d" type="password" square dense outlined />
            <label style="margin-top: 5px;">Back</label>
            <q-input v-model="cacid" type="password" square dense outlined />
          </div>
          <div class="add-airman-row">
            <label>First Name</label>
            <q-input v-model="firstName" square dense outlined />
          </div>
          <div class="add-airman-row">
            <label>Last Name</label>
            <q-input v-model="lastName" square dense outlined maxlength="30" mask="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" />
          </div>
          <div class="add-airman-row">
            <label>Room #</label>
            <q-select
              square outlined v-model="room" dense :options="roomOptions"
              use-input
              input-debounce="0"
              behavior="menu"
              @filter="roomFilter"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
              <template v-if="room" v-slot:append>
                <q-icon name="cancel" @click.stop="room = ''; roomFilterString = '';" class="cursor-pointer" />
              </template>
            </q-select>
          </div>
          <div class="add-airman-row">
            <label>Phase</label>
            <q-select square outlined v-model="phase" dense :options="phaseOptions" />
          </div>
          <div class="add-airman-row">
            <label>Squadron</label>
            <q-select square outlined v-model="squadron" dense :options="squadronOptions" />
          </div>
          <div class="add-airman-row">
            <label>Status</label>
            <q-select square outlined v-model="status" dense :options="statusOptions" />
          </div>
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat label="Close" v-close-popup />
          <q-btn flat label="Add" @click="addAirman" :disable="cannotAdd" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAirmanProfile" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{`${selectedAirman.first_name} ${selectedAirman.last_name}`}}</div>
        </q-card-section>

        <q-card-section>
          <div class="add-airman-row">
            <label>CACID</label>
            <q-input v-model="selectedAirman.cacid" square dense outlined type="password" :disable="!isEditMode" />
          </div>
          <div class="add-airman-row">
            <label>First Name</label>
            <q-input v-model="selectedAirman.first_name" square dense outlined :disable="!isEditMode" maxlength="30" mask="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" />
          </div>
          <div class="add-airman-row">
            <label>Last Name</label>
            <q-input v-model="selectedAirman.last_name" square dense outlined :disable="!isEditMode" maxlength="30" mask="AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" />
          </div>
          <div class="add-airman-row">
            <label>Room #</label>
            <q-select
              square outlined v-model="selectedAirman.room_number" dense :options="roomOptions"
              use-input
              input-debounce="0"
              behavior="menu"
              @filter="roomFilter"
              clearable
              :disable="!isEditMode"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-grey">
                    No results
                  </q-item-section>
                </q-item>
              </template>
              <template v-if="room" v-slot:append>
                <q-icon name="cancel" @click.stop="room = ''; roomFilterString = '';" class="cursor-pointer" />
              </template>
            </q-select>
          </div>
          <div class="add-airman-row">
            <label>Phase</label>
            <q-select square outlined v-model="selectedAirman.phase" dense :options="phaseOptions" :disable="!isEditMode" />
          </div>
          <div class="add-airman-row">
            <label>Squadron</label>
            <q-select square outlined v-model="selectedAirman.squadron" dense :options="squadronOptions" :disable="!isEditMode" />
          </div>
          <div class="add-airman-row">
            <label>Status</label>
            <q-select square outlined v-model="selectedAirman.status" dense :options="statusOptions" :disable="!isEditMode" />
          </div>
          <div class="add-airman-row">
            <label style="color: red;">{{errorMessage}}</label>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn color="negative" flat label="Remove Airman" @click="removeAirman" v-if="!isEditMode" />
          <q-btn flat label="Close" v-close-popup v-if="!isEditMode" />
          <q-btn flat label="View Activity" @click="viewAirmanScanTransactions" v-if="!isEditMode" />
          <q-btn flat label="Edit" @click="isEditMode = true" v-if="!isEditMode" />
          <q-btn flat label="Cancel" @click="isEditMode = false" v-if="isEditMode" />
          <q-btn flat label="Finalize" @click="editAirman" v-if="isEditMode" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAirmanActivity">
      <q-card>
        <q-card-section>
          <div class="text-h6">Airman Activity</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 50vh" class="scroll">
          <q-table
            class="my-sticky-virtscroll-table"
            virtual-scroll
            :pagination.sync="pagination"
            :rows-per-page-options="[0]"
            :virtual-scroll-sticky-start="48"
            row-key="scan_timestamp"
            title=""
            :data="airmanActivity"
            :columns="airmanActivityColumn"
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-inner-loading :showing="isLoading">
      <q-spinner
        color="primary"
        size="100px"
        :thickness="10"
      />
    </q-inner-loading>

  </q-page>
</template>

<script>
import stringSimilarity from 'string-similarity'
import axios from 'axios'

export default {
  name: 'PageAirman',
  data () {
    return {
      isLoading: false,
      searchTerm: '',
      check3dString: '',
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
      errorMessage: '',
      roomFilterString: '',
      isAddingAirman: false,
      showAirmanProfile: false,
      showAirmanActivity: false,
      showAddAirman: false,
      selectedAirman: {},
      airmanActivity: [],
      isEditMode: false,
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'cacid', label: 'CACID', align: 'left', field: 'cacid', sortable: true },
        { name: 'last_name', label: 'Last Name', align: 'left', field: 'last_name', sortable: true },
        { name: 'first_name', label: 'First Name', align: 'left', field: 'first_name', sortable: true },
        { name: 'room_number', label: 'Room', align: 'left', field: 'room_number', sortable: true },
        { name: 'phase', label: 'Phase', align: 'left', field: 'phase', sortable: true },
        { name: 'squadron', label: 'Squadron', align: 'left', field: 'squadron', sortable: true },
        { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
        { name: 'last_activity', label: 'Last Activity', align: 'left', field: 'last_activity', sortable: true, format: val => `${this.dateFormat(new Date(val))}` }
      ],
      airmanActivityColumn: [
        { name: 'is_in', label: 'IN/OUT', align: 'left', field: 'is_in', format: val => `${val ? 'IN' : 'OUT'}` },
        { name: 'scan_timestamp', label: 'Timestamp', align: 'left', field: 'scan_timestamp', sortable: true, format: val => `${this.dateFormat(new Date(val))}` }
      ]
    }
  },
  computed: {
    airmen () {
      const self = this
      if (self.searchTerm.replace(/ /g, '').length === 0) {
        return self.$store.getters['airman/airmen'] || []
      }
      return (this.$store.getters['airman/airmen']).filter((airman) => {
        let similarity = stringSimilarity.compareTwoStrings(airman.last_name.toUpperCase(), self.searchTerm.toUpperCase())
        if (similarity >= 0.5 || airman.last_name.indexOf(self.searchTerm) > -1) {
          return airman
        }
      }) || []
    },
    roomOptions () {
      const self = this
      const roomOptions = []
      for (let i = 0; i < self.$store.getters['room/rooms'].length; i++) {
        roomOptions.push(self.$store.getters['room/rooms'][i].room_number)
      }
      if (self.roomFilterString && self.roomFilterString.length > 0) {
        return roomOptions.filter((room) => {
          if (room.indexOf(self.roomFilterString) > -1) {
            return room
          }
        }).sort()
      } else {
        return roomOptions.sort()
      }
    },
    phaseOptions () {
      const phaseOptions = []
      for (let i = 0; i < this.$store.getters['phase/phases'].length; i++) {
        phaseOptions.push(this.$store.getters['phase/phases'][i].phase)
      }
      return phaseOptions.sort()
    },
    squadronOptions () {
      const squadronOptions = []
      for (let i = 0; i < this.$store.getters['squadron/squadrons'].length; i++) {
        squadronOptions.push(this.$store.getters['squadron/squadrons'][i].squadron)
      }
      return squadronOptions
    },
    statusOptions () {
      const statusOptions = []
      for (let i = 0; i < this.$store.getters['status/statuses'].length; i++) {
        statusOptions.push(this.$store.getters['status/statuses'][i].status)
      }
      return statusOptions.sort()
    },
    cannotAdd () {
      return this.cacid.length === 0 || this.firstName.length === 0 || this.lastName.length === 0 || this.room.length === 0 || this.phase.length === 0 || this.squadron.toString().length === 0 || this.status.length === 0
    }
  },
  methods: {
    dateFormat (date) {
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours > 12 ? hours - 12 : hours
      minutes = minutes < 10 ? '0' + minutes : minutes
      var strTime = hours + ':' + minutes + ' ' + ampm
      return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + '  ' + strTime
    },
    check3d () {
      const self = this
      let firstNameInput = self.check3dString.split(' ').filter((item) => {
        if (item.length > 0) {
          return item
        }
      })
      if (firstNameInput.length < 4) {
        self.firstName = self.firstName.toUpperCase()
        return
      }
      self.firstName = firstNameInput[0].substring(15).toUpperCase()
      self.lastName = firstNameInput[1].toUpperCase()
    },
    refreshAirmanList () {
      const self = this
      self.isLoading = true
      self.$store.dispatch('airman/getAirmen').then(() => {
        self.isLoading = false
      })
    },
    addAirman () {
      const self = this
      self.isAddingAirman = true
      self.$store.dispatch('airman/addAirman', {
        cacid: self.cacid,
        first_name: self.firstName,
        last_name: self.lastName,
        room_number: self.room,
        phase: self.phase,
        squadron: self.squadron,
        status: self.status
      }).then(data => {
        self.isAddingAirman = false
        self.cacid = ''
        self.firstName = ''
        self.lastName = ''
        self.room = ''
        self.phase = ''
        self.squadron = ''
        self.status = ''
      })
    },
    editAirman () {
      this.isEditMode = false
      this.$store.dispatch('airman/updateAirman', this.selectedAirman)
    },
    viewAirmanScanTransactions () {
      const self = this
      if (self.selectedAirman && self.selectedAirman.cacid) {
        axios.post(`http://127.0.0.1:8081/api/scan/airman`, { cacid: self.selectedAirman.cacid }).then(response => {
          self.showAirmanActivity = true
          if (!response.data.status) {
            return
          }
          self.airmanActivity = response.data.data
        })
      }
    },
    viewAirman (event, row) {
      this.showAirmanProfile = true
      this.selectedAirman = JSON.parse(JSON.stringify(row))
      this.errorMessage = ''
      self.roomFilterString = ''
    },
    removeAirman () {
      const self = this
      self.isEditMode = false
      self.$store.dispatch('airman/removeAirman', self.selectedAirman).then(data => {
        const { status } = data
        if (status) {
          self.showAirmanProfile = false
        } else {
          self.showAirmanProfile = true
          self.errorMessage = 'Cannot delete airman.'
        }
      })
    },
    roomFilter (val, update) {
      const self = this
      update(() => {
        self.roomFilterString = val || ''
      })
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
