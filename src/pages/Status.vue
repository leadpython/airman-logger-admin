<template>
  <q-page class="page-container flex column">
    <div class="bg-primary text-black" style="padding: 10px 0 5px 0;">
      <q-toolbar>
        <q-btn @click="showAddStatus = true" color="white" flat icon="person_add" label="Add Status" style="border-radius: 0px;" />
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
      title="Status"
      :data="statuses"
      :columns="columns"
      @row-click="viewStatus"
    />

    <q-dialog v-model="showAddStatus" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Add Status</div>
        </q-card-section>

        <q-card-section>
          <div class="add-status-row">
            <label>Status Number</label>
            <q-input v-model="status" maxlength=10 square dense outlined />
          </div>
          <div class="add-status-row">
            <label>Description</label>
            <q-input v-model="description" square dense outlined />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat label="Close" v-close-popup />
          <q-btn flat label="Add" @click="addStatus" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showStatusProfile" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Status {{`${selectedStatus.status}`}}</div>
        </q-card-section>

        <q-card-section>
          <div class="add-status-row">
            <label>Status Number</label>
            <q-input v-model="selectedStatus.status" square dense outlined :disable="true" />
          </div>
          <div class="add-status-row">
            <label>Description</label>
            <q-input v-model="selectedStatus.description" square dense outlined :disable="!isEditMode" />
          </div>
          <div class="add-status-row">
            <label style="color: red;">{{errorMessage}}</label>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn color="negative" flat label="Remove Status" @click="removeStatus" v-if="!isEditMode" />
          <q-btn flat label="Close" v-close-popup v-if="!isEditMode" />
          <q-btn flat label="Edit" @click="isEditMode = true" v-if="!isEditMode" />
          <q-btn flat label="Cancel" @click="isEditMode = false" v-if="isEditMode" />
          <q-btn flat label="Finalize" @click="editStatus" v-if="isEditMode" />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
export default {
  name: 'PageStatus',
  data () {
    return {
      status: '',
      description: '',
      showStatusProfile: false,
      showAddStatus: false,
      selectedStatus: {},
      errorMessage: '',
      isEditMode: false,
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'status', label: 'Status Number', align: 'left', field: 'status' },
        { name: 'description', label: 'Description', align: 'left', field: 'description' }
      ]
    }
  },
  computed: {
    statuses () {
      return this.$store.getters['status/statuses']
    }
  },
  methods: {
    addStatus () {
      const self = this
      self.isAddingStatus = true
      self.$store.dispatch('status/addStatus', {
        status: self.status,
        description: self.description
      }).then(data => {
        self.isAddingStatus = false
        self.status = ''
        self.description = ''
      })
    },
    editStatus () {
      this.isEditMode = false
      console.log(this.selectedStatus)
      this.$store.dispatch('status/updateStatus', this.selectedStatus)
    },
    viewStatus (event, row) {
      this.showStatusProfile = true
      this.selectedStatus = JSON.parse(JSON.stringify(row))
      this.errorMessage = ''
    },
    removeStatus () {
      const self = this
      self.isEditMode = false
      self.$store.dispatch('status/removeStatus', self.selectedStatus).then(data => {
        const { status } = data
        if (status) {
          self.showStatusProfile = false
        } else {
          self.showStatusProfile = true
          self.errorMessage = 'Cannot delete status.'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-status-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    font-size: 12px;
    color: rgb(100,100,100);
  }
}
</style>
