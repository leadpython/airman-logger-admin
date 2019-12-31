<template>
  <div id="q-app" style="background: white;">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.$store.dispatch('airman/getAirmen')
    this.$store.dispatch('phase/getPhases')
    this.$store.dispatch('room/getRooms')
    this.$store.dispatch('squadron/getSquadrons')
    this.$store.dispatch('status/getStatuses')
  }
}
</script>

<style lang="scss">
.page-container {
  position: relative;
  padding: 0px;
}
.q-table__title {
  font-weight: bold;
}
.my-sticky-virtscroll-table .q-table__middle {
  max-height: 200px;
}
.my-sticky-virtscroll-table .q-table__top,
.my-sticky-virtscroll-table .q-table__bottom,
.my-sticky-virtscroll-table thead tr:first-child th {
  background-color: #fff;
}
.my-sticky-virtscroll-table thead tr th {
  position: sticky;
  z-index: 1;
}
.my-sticky-virtscroll-table thead tr:last-child th {
  /* height of all previous header rows */
  top: 48px;
}
.my-sticky-virtscroll-table thead tr:first-child th {
  top: 0;
}
</style>
