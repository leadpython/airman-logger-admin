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
          {{pageTitle}}
        </q-toolbar-title>

        <q-btn flat label="Logout" @click="logout" style="border-radius: 0px;" />

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
        <q-item clickable @click="navigate('', 'Airman')">
          <q-item-section avatar>
            <q-icon name="person_outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Airman</q-item-label>
            <q-item-label caption>List of airmen</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('squadron', 'Squadrons')">
          <q-item-section avatar>
            <q-icon name="people_outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Squadron</q-item-label>
            <q-item-label caption>List of squadrons</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('room', 'Rooms')">
          <q-item-section avatar>
            <q-icon name="meeting_room" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Room</q-item-label>
            <q-item-label caption>List of rooms</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('phase', 'Phases')">
          <q-item-section avatar>
            <q-icon name="next_week" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Phase</q-item-label>
            <q-item-label caption>List of phases</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('status', 'Statuses')">
          <q-item-section avatar>
            <q-icon name="notification_important" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Status</q-item-label>
            <q-item-label caption>List of statuses</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('activity', 'Activity')">
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Activity</q-item-label>
            <q-item-label caption>Logs</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('reporting', 'Reporting')">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Reporting</q-item-label>
            <q-item-label caption>Generate reports.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="navigate('user', 'Admins')">
          <q-item-section avatar>
            <q-icon name="build" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Admins</q-item-label>
            <q-item-label caption>List of admins</q-item-label>
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
      leftDrawerOpen: false,
      pageTitle: 'Airman'
    }
  },
  methods: {
    navigate (path, title) {
      this.pageTitle = title
      this.$router.replace(`${this.mode}/${path}`)
    },
    logout () {
      this.$router.replace('/')
    }
  }
}
</script>
