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
    {{ message.username }} покинул чат
  </div>
  <div
    v-else
    class="message"
    :class="{'message--owner': message.username === username}"
  >
    <h3 class="message__title">
      {{ message.username }}
    </h3>
    <p class="message__body">
      {{ message.message }}  <span class="message__body-time">{{ new Date(message.time).toLocaleTimeString('ru-RU', {
        hour: "2-digit",
        minute: "2-digit"
      }) }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>

import { type TMessage } from '@/modules/messages/enitity/Messages.ts'

interface IProps {
  message: TMessage
  username: string
}

const props = defineProps<IProps>()
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
  border-radius: 8px;
  &__title {
    max-width: 90px;
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
    max-width: 600px;
    word-break: break-word;
    background: #26834f;
    font-weight: 500;
    padding: 12px 20px;
    border-radius: 16px;

    &-time {
      margin-left: auto;
      padding-top: 10px;
      font-size: 12px;
    }
  }
  &--owner {
    margin-left: auto;
    text-align: end;
    .message__title {
      margin-left: auto;
      color: #2f5eca;
    }
    .message__body {
      background: #2f5eca;
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
