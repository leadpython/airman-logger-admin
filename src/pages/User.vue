<template>
  <q-page class="page-container flex column">
    <div class="bg-primary text-black" style="padding: 10px 0 5px 0;">
      <q-toolbar>
        <q-btn @click="showAddAdmin = true" color="white" flat icon="person_add" label="Add Admin" style="border-radius: 0px;" />
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
      title="Admin"
      :data="admins"
      :columns="columns"
      @row-click="viewAdmin"
    />

    <q-dialog v-model="showAddAdmin" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Add Admin</div>
        </q-card-section>

        <q-card-section>
          <div class="add-admin-row">
            <label>CACID</label>
            <q-input v-model="cacid" type="password" square dense outlined />
          </div>
          <div class="add-admin-row">
            <label>Admin Name</label>
            <q-input v-model="admin_name" @input="makeUppercase" square dense outlined />
          </div>
          <div class="add-admin-row">
            <label>Permission Level</label>
            <select style="padding: 5px; color: black; height: 35px;" v-model="permission_level">
              <option :value="0">Regular User</option>
              <option :value="1">Admin</option>
            </select>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat label="Close" v-close-popup />
          <q-btn flat label="Add" @click="registerAdmin" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAdminProfile" persistent square transition-show="scale" transition-hide="scale">
      <q-card class="bg-white text-black" style="width: 400px">
        <q-card-section>
          <div class="text-h6">Admin</div>
        </q-card-section>

        <q-card-section>
          <div class="add-admin-row">
            <label>Admin Name</label>
            <q-input v-model="selectedAdmin.admin_name" square dense outlined :disable="true" />
          </div>
          <div class="add-admin-row">
            <label>Permission Level</label>
            <select style="padding: 5px; color: black; height: 35px;" v-model="selectedAdmin.permission_level" disabled>
              <option :value="0">Regular User</option>
              <option :value="1">Admin</option>
              <option :value="2">Super Admin</option>
            </select>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn color="negative" flat label="Remove Admin" v-close-popup @click="removeAdmin" v-if="selectedAdmin.permission_level < 2" />
          <q-btn flat label="Close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
export default {
  name: 'PageAdmin',
  data () {
    return {
      cacid: '',
      admin_name: '',
      permission_level: 0,
      showAddAdmin: false,
      showAdminProfile: false,
      isEditMode: false,
      selectedAdmin: {},
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'admin_name', label: 'Admin', align: 'left', field: 'admin_name' },
        { name: 'permission_level', label: 'Permission Level', align: 'left', field: 'permission_level', format: val => `${val === 2 ? 'Super Admin' : val === 1 ? 'Admin' : 'Regular User'}` }
      ]
    }
  },
  computed: {
    admins () {
      return this.$store.getters['admin/admins']
    }
  },
  mounted () {
    this.$store.dispatch('admin/getAdmins')
  },
  methods: {
    makeUppercase () {
      const self = this
      self.admin_name = self.admin_name.toUpperCase()
    },
    removeAdmin () {
      const self = this
      self.$store.dispatch('admin/removeAdmin', { admin_name: self.selectedAdmin.admin_name })
    },
    viewAdmin (evt, row) {
      const self = this
      self.selectedAdmin = row
      self.showAdminProfile = true
    },
    registerAdmin () {
      const self = this
      self.isLoading = true
      self.$store.dispatch('admin/registerAdmin', {
        cacid: self.cacid,
        admin_name: self.admin_name,
        permission_level: self.permission_level
      }).then(data => {
        self.isLoading = false
        self.noSuperAdmin = false
        self.cacid = ''
        self.permission_level = 0
        self.admin_name = ''
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-admin-row {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  label {
    font-size: 12px;
    color: rgb(100,100,100);
  }
}
</style>
