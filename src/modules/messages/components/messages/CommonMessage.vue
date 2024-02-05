<template>
  <div
    class="message"
    :class="{'message--owner': message.usernameId === userService.getUsernameId()}"
    @click="handleDoubleClickOnMessage"
  >
    <h3
      v-if="showMessageTitle"
      class="message__title"
    >
      {{ message.username }}
    </h3>
    <div
      v-if="message.reply_message"
      class="message-reply reply"
      :class="{'reply--owner': message.usernameId === userService.getUsernameId()}"

      style="color: #000"
    >
      <h3>{{ message.reply_message.username }}</h3>
      <p>{{ message.reply_message.message }}</p>
      <img
        v-if="message.reply_message.hasOwnProperty('message_img')"
        :class="{'message__img--owner': message.usernameId === userService.getUsernameId()}"
        :src="getMessageImageSrc(message.reply_message.message_img)"
        alt=""
        width="40"
        height="40"
      >
    </div>
    <div
      v-if="message.message"
      class="message__body"
    >
      <p
        class="message__text"
        v-html="parseText"
      />
      <span class="message__text-time">{{ new Date(message.time).toLocaleTimeString('ru-RU', {
        hour: "2-digit",
        minute: "2-digit"
      }) }}</span>
    </div>

    <img
      v-if="message.hasOwnProperty('message_img')"
      class="message__img"
      :class="{'message__img--owner': message.usernameId === userService.getUsernameId()}"
      :src="messageImage.src"
      alt=""
    >
  </div>
</template>

<script lang="ts" setup>

import type { IMessage } from '@/modules/messages/enitity/Messages.ts'
import { computed, ref } from 'vue'
import { useUserStore } from '@/modules/user/store'
import { UserService } from '@/modules/user/services/userService.ts'
import sanitizeHtml from 'sanitize-html'

interface IProps {
  message: IMessage
  previousMessage: IMessage
  username: string
}

const props = defineProps<IProps>()
const emit = defineEmits(['reply'])

const showMessageTitle = computed(() => {
  if (props.previousMessage.event === 'connection-close' || props.previousMessage.event === 'connection') {
    return true
  }
  if (props.previousMessage.usernameId === props.message.usernameId) {
    return false
  }
  return true
})
const userStore = useUserStore()
const userService = new UserService(userStore)

const parseText = computed(() => {
  let result = props.message.message
  const links = result.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi)

  if (links) {
    links.forEach(link => {
      console.log(link)
      result = result.replace(link, `<a class="message__text--link" target="_blank" href="${link}">${link}</a>`)
    })
  }
  return sanitizeHtml(result, {
    allowedTags: ['a', 'img'],
    allowedAttributes: {
      a: ['class', 'href', 'target']
    }
  })
})

const isClickDouble = ref(false)
const handleDoubleClickOnMessage = () => {
  if (isClickDouble.value) {
    emit('reply', props.message)
    return
  }
  isClickDouble.value = true
  setTimeout(() => isClickDouble.value = false, 400)
}

const messageImage = computed(() => {
  const image = new Image()
  image.src = props.message.message_img
  return image
})

const getMessageImageSrc = (messageImg) => {
  const image = new Image()
  image.src = messageImg
  return image.src
}
</script>

<style lang='scss'>
.message {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: clamp(200px, 100%, 85vw);
  width: fit-content;
  color: #ffffff;
  padding: 4px 12px;

  &__title {
    max-width: 150px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
    font-weight: 700;
    color: #06a94d;
    font-size: 14px;

    &--connected {
      max-width: 90px;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &__body {
    display: flex;
  }

  &__img {
    padding: 8px;
    max-width: 700px;
    max-height: 500px;
    border-radius: 16px;

  }

  &__text {
    max-width: 600px;
    word-break: break-word;
    background: linear-gradient(90deg, #4bbb7d, #26834f);
    font-weight: 500;
    padding: 12px 20px;
    border-radius: 16px;

    &-time {
      margin: 0 12px;
      margin-top: auto;
      color: #26834f;
      font-size: 12px;
    }

    &--link {
      color: #b3d3f1;
    }
  }

  &--owner {
    margin-left: auto;
    text-align: end;

    .message__title {
      margin-left: auto;
      color: #2f5eca;
    }

    .message__text {
      background: linear-gradient(90deg, #2f5eca, #587dcd) !important;
    }

    .message__body {
      flex-direction: row-reverse;
    }

    .message__text-time {
      color: #2f5eca !important;
    }
  }
}

.reply {
  padding: 0 8px;
  border-left: 3px solid #04803b;
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 14px;
    max-width: 80px;
    width: 100%;
    text-overflow: ellipsis;
    overflow-x: hidden;

    &:first-letter {
      color: #04803b;
    }
  }

  p {
    font-size: 12px;
    max-width: 80px;
    text-overflow: ellipsis;
    width: 100%;
    overflow-x: hidden;
  }

  &--owner {
    border-left: none;
    border-right: 3px solid #2f5eca;
    text-align: end;
    justify-items: flex-end;
    align-items: flex-end;
  }
}
</style>
