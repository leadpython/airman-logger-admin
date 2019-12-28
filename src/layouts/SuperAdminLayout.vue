<template>
  <q-layout view="lHh Lpr lFf">
    <q-header flat>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>
        </q-toolbar-title>

        <q-btn flat label="Logout" style="border-radius: 0px;" />

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header></q-item-label>
        <q-item clickable @click="navigate('user')">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Reporting</q-item-label>
            <q-item-label caption>Generate reports.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('')">
          <q-item-section avatar>
            <q-icon name="person_outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Airman</q-item-label>
            <q-item-label caption>List of airmen</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('squadron')">
          <q-item-section avatar>
            <q-icon name="people_outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Squadron</q-item-label>
            <q-item-label caption>List of squadrons</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('room')">
          <q-item-section avatar>
            <q-icon name="meeting_room" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Room</q-item-label>
            <q-item-label caption>List of rooms</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('phase')">
          <q-item-section avatar>
            <q-icon name="next_week" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Phase</q-item-label>
            <q-item-label caption>List of phases</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('status')">
          <q-item-section avatar>
            <q-icon name="notification_important" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Status</q-item-label>
            <q-item-label caption>List of statuses</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('activity')">
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Activity</q-item-label>
            <q-item-label caption>Logs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('user')">
          <q-item-section avatar>
            <q-icon name="build" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Users</q-item-label>
            <q-item-label caption>List of users</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'SuperAdminLayout',
  data () {
    return {
      mode: '/super-admin',
      leftDrawerOpen: false
    }
  },
  methods: {
    navigate (path) {
      this.$router.replace(`${this.mode}/${path}`)
    }
  }
}
</script>
