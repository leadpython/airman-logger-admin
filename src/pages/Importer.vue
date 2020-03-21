<template>
  <q-page class="page-container flex column importer-page">
    <div>
      <q-btn @click="importData" color="primary" label="Import Data" style="margin-right: 4px; border-radius: 0px;" />
      <q-btn @click="importRooms" color="primary" label="Import Rooms" style="margin-right: 4px; border-radius: 0px;" />
    </div>
    <textarea class="importer-area" v-model="raw" />
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
export default {
  name: 'PageImporter',
  data () {
    return {
      isLoading: false,
      raw: ''
    }
  },
  computed: {},
  methods: {
    importRooms () {
      const self = this
      self.isLoading = true
      const raw = self.raw
      let rows = raw.split('\n')
      self.$store.dispatch('importer/importRooms', rows).then(() => {
        self.$store.dispatch('room/getRooms')
        self.isLoading = false
      })
    },
    importData () {
      const self = this
      self.isLoading = true
      const raw = self.raw
      let formatted = {}
      let rows = raw.split('\n')
      for (let i = 0; i < rows.length; i++) {
        let airmanRaw = rows[i].split('\t')
        formatted[airmanRaw[0]] = {
          cacid: airmanRaw[0],
          last_name: airmanRaw[1],
          first_name: airmanRaw[2],
          room_number: airmanRaw[3],
          phase: airmanRaw[4],
          squadron: airmanRaw[5]
        }
      }
      self.$store.dispatch('importer/importData', formatted).then(() => {
        self.$store.dispatch('airman/getAirmen')
        self.$store.dispatch('phase/getPhases')
        self.$store.dispatch('room/getRooms')
        self.$store.dispatch('squadron/getSquadrons')
        self.$store.dispatch('status/getStatuses')
        self.isLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.importer-page {
  padding: 15px;
}
.importer-area {
  height: 500px;
  resize: none;
  margin: 10px 0px;
}
</style>
