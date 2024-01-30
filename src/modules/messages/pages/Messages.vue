<template>
  <div class="messages">
    <div class="messages__header">
      <h1
        v-if="!isUsernameUpdating"
        class="messages__header-title"
        @click="isUsernameUpdating = true"
      >
        {{ userService.getUsername() }}
      </h1>
      <form
        v-else
        class="messages__header-inputs"
        @submit.prevent
      >
        <ui-input
          v-model="newUsername"
          placeholder="Введите сообщение"
        />
        <ui-button
          type="submit"
          @click="handleConfirmUsernameUpdating"
        >
          Подтвердить
        </ui-button>
      </form>
    </div>
    <MessagesList
      id="messageList"
      :messages="userService.getMessages()"
      :username="userService.getUsername()"
      @scroll="handleScrollMessageList()"
    />
    <form
      class="messages__inputs"
      @submit.prevent="handleSendMessage()"
    >
      <ui-input
        v-model="messageText"
        placeholder="Введите сообщение"
      />
      <ui-button
        style="padding: 8px 16px"
      >
        <img
          src="@/core/assets/icons/image.svg"
          width="36"
          height="36"
          alt=""
        >
      </ui-button>
      <ui-button type="submit">
        Отправить
      </ui-button>
    </form>
  </div>
</template>

<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue'
import UiInput from '@/core/components/ui/ui-input.vue'
import UiButton from '@/core/components/ui/ui-button.vue'
import { useUserStore } from '@/modules/user/store'
import { SocketService } from '@/modules/socket/service/socketService.ts'
import { useSocketStore } from '@/modules/socket/store'
import { type TMessage } from '@/modules/messages/enitity/Messages.ts'
import { UserService } from '@/modules/user/services/userService.ts'
import MessagesList from '@/modules/messages/components/MessagesList.vue'

const socketStore = useSocketStore()
const userStore = useUserStore()
const socketService = new SocketService(socketStore, userStore)
const userService = new UserService(userStore)

onMounted(() => {
  socketService.initConnection()
})

const messageText = ref('')
const messageList = ref(null)

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
  messageList.value = document.getElementById('messageList')
})

const handleBeforeUnload = () => {
  const unconnectedMessage = {
    username: userService.getUsername(),
    id: Date.now(),
    event: 'connection-close'
  }
  socketService.sendMessage(unconnectedMessage)
}

const handleSendMessage = () => {
  if (messageText.value.length === 0) {
    messageText.value = ''
    return
  }
  const newMessage: TMessage = {
    id: Date.now(),
    message: messageText.value.trim(),
    event: 'message',
    time: new Date().getTime(),
    username: userService.getUsername()
  }
  messageText.value = ''
  socketService.sendMessage(newMessage)
}
const isMessageListScrollFreeze = ref(false)
const handleScrollMessageList = () => {
  if (messageList.value && messageList.value) {
    if (messageList.value.scrollHeight - messageList.value.scrollTop < 1500) {
      isMessageListScrollFreeze.value = true
    } else {
      isMessageListScrollFreeze.value = false
    }
  }
}
watch(() => userStore.messages.length, () => {
  setTimeout(() => {
    if (isMessageListScrollFreeze.value) {
      messageList.value.scrollTop = messageList.value.scrollHeight
    }
    if (userService.getLastMessage().username === userService.getUsername()) {
      if (messageList.value && messageList.value) {
        messageList.value.scrollTop = messageList.value.scrollHeight
      }
    }
  }, 300)
})

const isUsernameUpdating = ref(false)
const newUsername = ref(userService.getUsername())
const handleConfirmUsernameUpdating = () => {
  localStorage.setItem('username', JSON.stringify(newUsername.value))
  userService.setUsername(newUsername.value)
  isUsernameUpdating.value = false
}

</script>

<style lang='scss'>
.messages {
  width: 100%;
  max-width: 1140px;
  height: 100%;
  padding: 24px;
  display: grid;
  grid-auto-rows: max-content 1fr max-content;
  grid-template-columns: 1fr;

  &__header {
    color: #06a94d;

    &-title {
      color: #06a94d;
    }

    &-inputs {
      display: flex;
      gap: 4px;
    }
  }

  &__list {
    overflow-y: auto;
    width: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
  }

  &__inputs {
    display: flex;
    gap: 4px;
  }

}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
