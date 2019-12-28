<template>
  <div class="login-page flex flex-center">
    <q-input
      v-model="cacid"
      label="CACID"
      type="password"
      square
      outlined
      @input="scan"
      v-if="!isLoading"
      style="padding: 10px; font-size: 20px; width: 100%; max-width: 400px; border-radius: 0px;"
    />
    <q-icon name="warning" class="text-red" style="font-size: 250px;" v-if="isFail" />
    <div id="splash" v-if="isLoading">
      <img class="blink" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/US_Air_Force_Logo_Solid_Colour.svg/1280px-US_Air_Force_Logo_Solid_Colour.svg.png" />
    </div>
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
      clearTimeout(window.loginTimeout)
      window.loginTimeout = setTimeout(() => {
        self.isLoading = true
        self.isSuccess = false
        setTimeout(() => {
          self.isLoading = false
          self.isSuccess = true
          self.cacid = ''
          setTimeout(() => {
            self.isSuccess = false
            self.$router.replace('/super-admin')
          }, 200)
        }, 2000)
      }, 500)
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
