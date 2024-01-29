<template>
  <div class="wrapper">
    <div class="container">
      <Login v-if="!userStore.user.username" />
      <Messages v-else />
    </div>
  </div>
</template>

<script lang="ts" setup>

import { onMounted, provide, ref } from 'vue'
import Login from '@/modules/login/pages/Login.vue'
import { SocketService } from '@/modules/socket/service/socketService.ts'
import { useUserStore } from '@/modules/user/store'
import Messages from '@/modules/messages/pages/Messages.vue'
import { useSocketStore } from '@/modules/socket/store'

const userStore = useUserStore()
const socketStore = useSocketStore()
const socket = new SocketService(socketStore)

onMounted(() => {
  socket.makeConnection()
})
</script>

<style lang='scss'>
.wrapper {
  max-width: 1140px;
  width: 100%;
  height: 100vh;
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
</style>
