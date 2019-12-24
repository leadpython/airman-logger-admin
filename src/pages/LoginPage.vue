<template>
  <div class="login-page flex flex-center">
    <q-input
      v-model="cacid"
      label="CACID"
      type="password"
      square
      outlined
      @input="scan"
      v-show="!isLoading && !isSuccess"
      style="padding: 10px; font-size: 20px; width: 100%; max-width: 400px; border-radius: 0px;"
    />
    <q-spinner-oval
      indeterminate
      size="225px"
      :thickness="0.6"
      color="primary"
      class="q-ma-md"
      v-if="isLoading"
    />
    <q-icon name="check_circle" class="text-green" style="font-size: 250px;" v-if="isSuccess" />
    <q-icon name="warning" class="text-red" style="font-size: 250px;" v-if="isFail" />
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
      cacid: ''
    }
  },
  methods: {
    scan () {
      const self = this
      self.isLoading = true
      self.isSuccess = false
      setTimeout(() => {
        self.isLoading = false
        self.isSuccess = true
        self.cacid = ''
        setTimeout(() => {
          self.$router.replace('/admin')
          self.isSuccess = false
        }, 200)
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  justify-content: center;
  align-items: center;
}

</style>
