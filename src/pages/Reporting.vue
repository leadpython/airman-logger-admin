<template>
  <q-page class="page-container flex column">
    <div class="bg-primary text-black" style="padding: 10px 0 5px 0;">
      <q-toolbar>
        <q-btn @click="reportSignedIn" color="white" flat label="Report Signed In" style="border-radius: 0px;" />
        <q-btn @click="reportSignedOut" color="white" flat label="Report Signed Out" style="border-radius: 0px;" />
        <q-btn @click="reportIdle" color="white" flat label="Report Idle" style="border-radius: 0px;" />
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
      title="Report"
      :data="report"
      :columns="columns"
    />

    <q-inner-loading :showing="isReporting">
      <q-spinner
        color="primary"
        size="300px"
        :thickness="10"
      />
    </q-inner-loading>
  </q-page>
</template>

<script>
export default {
  name: 'PageReporting',
  data () {
    return {
      report: [],
      isReporting: false,
      pagination: {
        rowsPerPage: 0
      },
      columns: [
        { name: 'last_name', label: 'Last Name', align: 'left', field: 'last_name', sortable: true },
        { name: 'first_name', label: 'First Name', align: 'left', field: 'first_name', sortable: true },
        { name: 'room_number', label: 'Room', align: 'left', field: 'room_number', sortable: true },
        { name: 'phase', label: 'Phase', align: 'left', field: 'phase', sortable: true },
        { name: 'squadron', label: 'Squadron', align: 'left', field: 'squadron', sortable: true },
        { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true },
        { name: 'last_activity', label: 'Last Activity', align: 'left', field: 'last_activity', sortable: true, format: val => `${(new Date(val)).toGMTString()} ${console.log(new Date(val))}` }
      ]
    }
  },
  computed: {
    signedInReports () {
      return this.$store.getters['report/reportSignedIn']
    },
    signedOutReports () {
      return this.$store.getters['report/reportSignedOut']
    }
  },
  methods: {
    reportSignedIn () {
      const self = this
      self.isReporting = true
      clearTimeout(window.reportSignedInTimeout)
      window.reportSignedInTimeout = setTimeout(() => {
        this.$store.dispatch('report/reportSignedIn').then(data => {
          self.isReporting = false
          self.report = self.$store.getters['report/reportSignedIn']
        })
      }, 1000)
    },
    reportSignedOut () {
      const self = this
      self.isReporting = true
      clearTimeout(window.reportSignedOutTimeout)
      window.reportSignedOutTimeout = setTimeout(() => {
        this.$store.dispatch('report/reportSignedOut').then(data => {
          self.isReporting = false
          self.report = self.$store.getters['report/reportSignedOut']
        })
      }, 1000)
    },
    reportIdle () {
      const self = this
      self.isReporting = true
      clearTimeout(window.reportIdleTimeout)
      window.reportIdleTimeout = setTimeout(() => {
        this.$store.dispatch('report/reportIdle').then(data => {
          self.isReporting = false
          self.report = self.$store.getters['report/reportIdle']
        })
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
