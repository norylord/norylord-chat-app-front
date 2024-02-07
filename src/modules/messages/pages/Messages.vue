<template>
  <div class="messages">
    <MessagesHeader
      :users-count="socketService.getUsersCount()"
      :is-username-updating="isUsernameUpdating"
      :show-user-list="showUserList"
      :active-users="socketService.getActiveUsers()"
      :username="userService.getUsername()"
      @update-username="isUsernameUpdating = true"
      @close-userlist="showUserList = false"
      @open-userlist="handleOpenUserList"
      @confirm-username="handleConfirmUsernameUpdating"
    />
    <MessagesList
      id="messageList"
      :messages="userService.getMessages()"
      :username="userService.getUsername()"
      @scroll="handleScrollMessageList()"
      @reply="(v: IMessage) => handleReplyMessage(v)"
    />
    <MessagesInput
      v-model:message-text="messageText"
      v-model:reply-message="replyMessage"
      v-model:message-img="messageImg"
      :message-img-src="messageImgSrc"
      @clear-reply="replyMessage = null"
      @open-file-input="handleOpenFileInput"
      @send-message="sendMessage"
    />
  </div>
</template>

<script lang="ts" setup>

import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/modules/user/store'
import { SocketService } from '@/modules/socket/service/socketService.ts'
import { useSocketStore } from '@/modules/socket/store'
import { type IMessage } from '@/modules/messages/enitity/Messages.ts'
import { UserService } from '@/modules/user/services/userService.ts'
import MessagesList from '@/modules/messages/components/MessagesList.vue'
import MessagesHeader from '@/modules/messages/components/MessagesHeader.vue'
import { useMessages } from '@/modules/messages/composables/useMessages.ts'
import MessagesInput from '@/modules/messages/components/MessagesInput.vue'

const socketStore = useSocketStore()
const userStore = useUserStore()
const socketService = new SocketService(socketStore, userStore)
const userService = new UserService(userStore)

onMounted(() => {
  socketService.initConnection()
})

const {
  showUserList,
  messages,
  isUsernameUpdating,
  messageText,
  messageList,
  messageImg,
  replyMessage,
  sendMessage,
  handleOpenUserList,
  handleReplyMessage,
  handleConfirmUsernameUpdating,
  messageImgSrc
} = useMessages()

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

const isMessageListScrollFreeze = ref(false)
const handleScrollMessageList = () => {
  if (messageList.value) {
    if (messageList.value.scrollHeight - messageList.value.scrollTop < 1500) {
      isMessageListScrollFreeze.value = true
    } else {
      isMessageListScrollFreeze.value = false
    }
  }
}

watch(() => messages, () => {
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
  setTimeout(() => {
    messageList.value.scrollTop = messageList.value.scrollHeight
  }, 300)
})
</script>

<style lang='scss'>
.messages {
  width: 100%;
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

    &-reply {
      width: 100%;
      max-width: 600px;
      padding: 4px 16px;
      border-radius: 16px;
      background: #04803b;
      display: flex;
      justify-content: space-between;
      color: #ffffff;

      h3 {
        font-size: 14px;
      }

      p {
        font-size: 12px;
      }
    }

    &-preview {
      img {
        max-width: 300px;
        max-height: 200px;
        border-radius: 8px;
      }
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
