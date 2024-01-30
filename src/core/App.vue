<template>
  <div class="wrapper">
    <div class="container">
      <Login
        v-if="(userService.getUsername().length < 6 || userService.getUsername().length > 20)"
      />
      <Messages v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Login from '@/modules/login/pages/Login.vue'
import { useUserStore } from '@/modules/user/store'
import Messages from '@/modules/messages/pages/Messages.vue'
import { UserService } from '@/modules/user/services/userService.ts'

const userStore = useUserStore()
const userService = new UserService(userStore)

</script>

<style lang='scss'>
.wrapper {
  max-width: 1140px;
  width: 100%;
  height: 100dvh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  width: 100%;
  background: #ffffff;
  border-radius: 32px;
  height: 90%;
  margin: auto;
  box-shadow: 0 0 50px #000000;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 700px) {
  .container {
    height: 100%;
  }
}
</style>
