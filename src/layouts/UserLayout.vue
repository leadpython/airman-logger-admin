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
        <q-item>
          <q-item-section avatar>
            <q-icon style="color: rgba(200,200,200)" name="person_outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label style="color: rgba(200,200,200)">Airman</q-item-label>
            <q-item-label style="color: rgba(200,200,200)" caption>List of airmen</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon style="color: rgba(200,200,200)" name="people_outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label style="color: rgba(200,200,200)">Squadron</q-item-label>
            <q-item-label style="color: rgba(200,200,200)" caption>List of squadrons</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon style="color: rgba(200,200,200)" name="meeting_room" />
          </q-item-section>
          <q-item-section>
            <q-item-label style="color: rgba(200,200,200)">Room</q-item-label>
            <q-item-label style="color: rgba(200,200,200)" caption>List of rooms</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon style="color: rgba(200,200,200)" name="next_week" />
          </q-item-section>
          <q-item-section>
            <q-item-label style="color: rgba(200,200,200)">Phase</q-item-label>
            <q-item-label style="color: rgba(200,200,200)" caption>List of phases</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon style="color: rgba(200,200,200)" name="notification_important" />
          </q-item-section>
          <q-item-section>
            <q-item-label style="color: rgba(200,200,200)">Status</q-item-label>
            <q-item-label style="color: rgba(200,200,200)" caption>List of statuses</q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-item clickable @click="navigate('activity', 'Activity')">
          <q-item-section avatar>
            <q-icon name="calendar_today" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Activity</q-item-label>
            <q-item-label caption>Logs</q-item-label>
          </q-item-section>
        </q-item> -->
        <q-item clickable @click="navigate('reporting', 'Reporting')">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Reporting</q-item-label>
            <q-item-label caption>Generate reports.</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-icon style="color: rgba(200,200,200)" name="build" />
          </q-item-section>
          <q-item-section>
            <q-item-label style="color: rgba(200,200,200)">Admins</q-item-label>
            <q-item-label style="color: rgba(200,200,200)" caption>List of admins</q-item-label>
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
  name: 'UserLayout',
  data () {
    return {
      mode: '/user',
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
