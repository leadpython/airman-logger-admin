<template>
  <div class="login-page flex flex-center column">
    <q-icon name="warning" class="text-red" style="font-size: 250px;" v-if="isFail" />
    <q-input
      v-model="cacid"
      label="CACID"
      type="password"
      debounce="500"
      square
      outlined
      @input="scan"
      v-if="!isLoading && !noSuperAdmin"
      style="padding: 10px; font-size: 20px; width: 100%; max-width: 400px; border-radius: 0px;"
    />
    <label style="font-size: 25px; font-weight: 300;" v-if="!isLoading && noSuperAdmin">REGISTER SUPER ADMIN</label>
    <q-input
      v-model="registerCacid"
      label="CACID"
      type="password"
      square
      outlined
      v-if="!isLoading && noSuperAdmin"
      style="padding: 10px; font-size: 20px; width: 100%; max-width: 400px; border-radius: 0px;"
    />
    <q-input
      v-model="registerAdminName"
      label="Admin Name"
      type="text"
      square
      outlined
      v-if="!isLoading && noSuperAdmin"
      style="padding: 10px; font-size: 20px; width: 100%; max-width: 400px; border-radius: 0px;"
    />
    <q-btn v-if="!isLoading && noSuperAdmin" @click="registerAdmin" color="primary" outlined  label="Register Admin" style="border-radius: 0px;" />

    <q-inner-loading :showing="isLoading">
      <q-spinner
        color="primary"
        size="100px"
        :thickness="10"
      />
    </q-inner-loading>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      isLoading: false,
      isSuccess: false,
      isFail: false,
      cacid: '',
      registerCacid: '',
      registerAdminName: '',
      noSuperAdmin: false
    }
  },
  mounted () {
    const self = this
    self.$store.dispatch('admin/getAdmins').then(admins => {
      if (admins.length <= 0) {
        self.noSuperAdmin = true
      }
    })
  },
  methods: {
    scan () {
      const self = this
      self.isLoading = true
      self.$store.dispatch('admin/authenticateAdmin', self.cacid).then(result => {
        const { data: admin, status } = result
        self.isLoading = false
        if (status) {
          self.isSuccess = true
          if (admin.permission_level === 2) {
            self.$router.replace('/super-admin')
          } else if (admin.permission_level === 1) {
            self.$router.replace('/admin')
          } else {
            self.$router.replace('/user/reporting')
          }
        } else {
          self.isFail = true
        }
      })
    },
    registerAdmin () {
      const self = this
      self.isLoading = true
      self.$store.dispatch('admin/registerAdmin', {
        cacid: self.registerCacid,
        admin_name: self.registerAdminName,
        permission_level: 2
      }).then(data => {
        self.isLoading = false
        self.noSuperAdmin = false
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  justify-content: center;
  align-items: center;
  #splash {
    display: flex;
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: rgba(255,255,255,0.25);
    justify-content: center;
    align-items: center;
    img {
      height: auto;
      width: 30%;
    }
  }
}

@keyframes fade {
  0% { opacity: 0.5; }
  25% { opacity: 0.25; }
  50% { opacity: 0.05; }
  75% { opacity: 0.25; }
  100% { opacity: 0.5 }
}
@-webkit-keyframes fade {
  0% { opacity: 0.5; }
  25% { opacity: 0.25; }
  50% { opacity: 0.05; }
  75% { opacity: 0.25; }
  100% { opacity: 0.5 }
}
.blink {
  animation:fade 1500ms infinite;
  -webkit-animation:fade 1500ms infinite;
}

</style>
