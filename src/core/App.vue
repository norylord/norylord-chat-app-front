<template>
  <div class="wrapper">
    <div class="container">
      <Login
        v-if=" (userService.getUsername().length < 6 || userService.getUsername().length > 20)"
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
import { onMounted } from 'vue'

const userStore = useUserStore()
const userService = new UserService(userStore)

onMounted(() => {
  if (!JSON.parse(localStorage.getItem('userId'))) userService.setUsernameId(Date.now())
})

</script>

<style lang='scss'>

</style>
