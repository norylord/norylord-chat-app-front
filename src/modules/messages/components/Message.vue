<template>
  <div
    v-if="message.event === 'connection'"
    class="message message--connected"
  >
    <span class="message__title--connected">{{ message.username }}</span> присоединился к чату
  </div>
  <div
    v-else-if="message.event === 'connection-close'"
    class="message message--connected"
  >
    <span class="message__title--connected">{{ message.username }}</span> покинул чат
  </div>
  <div
    v-else
    class="message"
    :class="{'message--owner': message.username === username}"
  >
    <h3 class="message__title">
      {{ message.username }}
    </h3>
    <div class="message__body">
      <p
        class="message__text"
        v-html="parseText"
      />
      <span class="message__text-time">{{ new Date(message.time).toLocaleTimeString('ru-RU', {
        hour: "2-digit",
        minute: "2-digit"
      }) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import sanitizeHtml from 'sanitize-html'
import { type TMessage } from '@/modules/messages/enitity/Messages.ts'
import { computed } from 'vue'

interface IProps {
  message: TMessage
  username: string
}

const props = defineProps<IProps>()

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

</script>

<style lang='scss'>
.message {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 600px;
  width: fit-content;
  color: #ffffff;
  padding: 12px;

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

  &__text {
    max-width: 600px;
    word-break: break-word;
    background: #26834f;
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
      background: #2f5eca !important;
    }

    .message__body {
      flex-direction: row-reverse;
    }

    .message__text-time {
      color: #2f5eca !important;
    }
  }

  &--connected {
    font-size: 12px;
    width: fit-content;
    flex-direction: row;
    padding: 4px 8px;
    border-radius: 1000px;
    background: #d2d2d2;
    color: #426c7c;
    margin: 10px auto;
  }

  &-wrapper {
    display: flex;
  }
}

</style>
