<template>
  <div class="messages">
    <div class="messages__body">
      <div
        v-for="mess of messages"
        :key="mess.id"
        class="message-wrapper"
      >
        <div
          v-if="mess.event === 'connection'"
          class="messages__body-message message message--connected"
        >
          {{ mess.username }} присоединился к чату
        </div>
        <div
          v-else
          class="messages__body-message message"
          :class="{'message--owner': mess.username === userStore.user.username}"
        >
          <h3 class="message__title">
            {{ mess.username }}
          </h3>
          <p class="message__body">
            {{ mess.message }}  <span class="message__body-time">{{ new Date().getHours() + ':' + new Date().getMinutes() }}</span>
          </p>
        </div>
      </div>
    </div>
    <form
      class="messages__inputs"
      @submit.prevent="sendMessage"
    >
      <ui-input
        v-model="messageText"
        placeholder="Введите сообщение"
      />
      <ui-button>
        Отправить
      </ui-button>
    </form>
  </div>
</template>

<script lang="ts" setup>

import { inject, onMounted, ref } from 'vue'
import UiInput from '@/core/components/ui/ui-input.vue'
import UiButton from '@/core/components/ui/ui-button.vue'
import { useUserStore } from '@/modules/user/store'
import { SocketService } from '@/modules/socket/service/socketService.ts'
import { useSocketStore } from '@/modules/socket/store'

const socketStore = useSocketStore()
const socketService = new SocketService(socketStore)
const messages = ref([])
const socket = new WebSocket('wss://norylord-chat-app.onrender.com')

onMounted(() => {
  socket.onopen = () => {
    const connectionMessage = {
      username: userStore.user.username,
      id: Date.now(),
      event: 'connection'
    }
    socket.send(JSON.stringify(connectionMessage))
    console.log(123)
  }
  socket.onclose = () => {
    console.log('soсket закрыт')
  }
  socket.onerror = () => {
    console.log('soсket произошла ошибка')
  }
  socket.onmessage = ({ data }) => {
    messages.value = [...messages.value, JSON.parse(data)]
  }
})

const userStore = useUserStore()

const messageText = ref('')
const sendMessage = async () => {
  const message = {
    username: userStore.user.username,
    message: messageText.value,
    id: Date.now(),
    event: 'message',
    time: new Date().getTime()
  }
  socket.send(JSON.stringify(message))
  messageText.value = ''
}
</script>

<style lang='scss'>
.messages {
  width: 100%;
  height: 100%;
  padding: 24px;
  display: grid;
  grid-auto-rows:  1fr max-content;
  grid-template-columns: 1fr;
  &__body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;

  }
  &__inputs {
    display: flex;
    gap: 4px;
  }

  .message {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-width: 70%;
    width: fit-content;
    color: #ffffff;
    padding: 12px;
    border-radius: 8px;
    &__title {
      font-weight: 300;
      color: #06a94d;
      font-size: 14px;
    }
    &__body {
      background: #26834f;
      font-weight: 300;
      padding: 12px 20px;
      border-radius: 16px;

      &-time {
        margin-left: 4px;
        padding-top: 10px;
        font-size: 12px;
      }
    }
    &--owner {
      margin-left: auto;
      text-align: end;
    }
    &--connected {
      font-size: 12px;
      width: fit-content;
      flex-direction: row;
      padding: 4px 8px;
      border-radius: 1000px;
      background: #d2d2d2;
      color: #426c7c;
      margin: 0 auto;
    }

    &-wrapper {
      display: flex;
      width: 100%;
    }
  }
}
</style>
