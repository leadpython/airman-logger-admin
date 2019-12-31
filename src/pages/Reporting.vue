<template>
  <q-page class="page-container flex column">
    <div class="bg-primary text-black" style="padding: 10px 0 5px 0;">
      <q-toolbar>
        <q-btn @click="reportSignedIn" color="white" flat label="Report Signed In" style="border-radius: 0px;" />
        <q-btn @click="reportSignedOut" color="white" flat label="Report Signed Out" style="border-radius: 0px;" />
      </q-toolbar>
    </div>

    <div style="padding: 15px;">
      <div style="padding: 5px; " v-for="(airman, index) in report" :key="index">
        {{airman.last_name}}, {{airman.first_name}} {{airman.middle_name}} | Room: {{airman.room_number}} | Squadron: {{airman.squadron}}
      </div>
    </div>

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
      isReporting: false
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
