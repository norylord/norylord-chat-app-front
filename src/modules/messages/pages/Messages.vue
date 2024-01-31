<template>
  <div class="messages">
    <div class="messages__header">
      <div
        v-if="!isUsernameUpdating"
      >
        <h1
          class="messages__header-title"
          @click="isUsernameUpdating = true"
        >
          {{ userService.getUsername() }}
        </h1>
        <div
          v-click-outside="() => showUserList = false"
          class="messages__header-info"
          @click="showUserList = !showUserList"
        >
          <p>
            Количество активных пользователей: {{ socketService.getUsersCount() }}
          </p>
          <ul
            v-if="showUserList"
            class="messages__header-userlist"
          >
            <li
              v-for="user of socketService.getActiveUsers()"
              :key="user.id"
              v-text="user.username"
            />
          </ul>
        </div>
      </div>
      <form
        v-else
        v-click-outside="handleConfirmUsernameUpdating"
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
        class="messages__inputs-input"
        placeholder="Введите сообщение"
      >
        <template
          v-if="messageText.length"
          #prepend
        >
          <ui-button
            type="submit"
            class="messages__inputs-btn"
          >
            <img
              src="@/core/assets/icons/send.svg"
              width="16"
              alt=""
            >
          </ui-button>
        </template>
      </ui-input>
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

const showUserList = ref(false)
const messageText = ref('')
const messageList = ref(null)

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
  messageList.value = document.getElementById('messageList')
})

const handleBeforeUnload = () => {
  const unconnectedMessage = {
    username: userService.getUsername(),
    usernameId: userService.getUsernameId(),
    id: Date.now(),
    event: 'connection-close'
  }
  socketService.sendMessage(unconnectedMessage)
}

const handleSendMessage = () => {
  if (messageText.value.length === 0 && messageText.value.length > 500) {
    messageText.value = ''
    return
  }
  const newMessage: TMessage = {
    id: Date.now(),
    message: messageText.value.trim(),
    event: 'message',
    time: new Date().getTime(),
    username: userService.getUsername(),
    usernameId: userService.getUsernameId()
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

onMounted(() => {
  messageList.value.scrollTop = messageList.value.scrollHeight
})

const isUsernameUpdating = ref(false)
const newUsername = ref(userService.getUsername())
const handleConfirmUsernameUpdating = () => {
  localStorage.setItem('username', JSON.stringify(newUsername.value))
  newUsername.value = newUsername.value.trim().replaceAll('"', '')
  if (newUsername.value.length === 0) {
    return
  }
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
    padding: 12px;

    &-title {
      color: #282828;

      &:first-letter {
        color: #06a94d;
      }
    }

    &-info {
      position: relative;
      user-select: none;
      cursor: pointer;
      padding: 8px 0;
    }

    &-userlist {
      list-style: none;
      padding: 12px 24px;
      border-radius: 8px;
      box-shadow: 0 0 10px #ababab;
      color: #fff;
      background: #04803b;
      left: 0px;
      position: absolute;
      animation: fade .3s ease-in-out;

      li {
        font-size: 16px;
        min-width: 200px;
      }
    }

    &-inputs {
      width: 100%;
      display: flex;
      gap: 4px;

      .input-wrapper {
        width: 100%;
      }
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
    padding-top: 8px;
    display: flex;
    flex-flow: row wrap;
    gap: 4px;

    &-input {
      flex: 1 0 100%
    }

    &-btn {
    }
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

@keyframes fade {
  0% {
    opacity: 0;
    transform: translateX(-30px) translateY(-6px);
  }

  100% {
    opacity: 1;
    transform: translateX(0) translateY(0);

  }
}
</style>
