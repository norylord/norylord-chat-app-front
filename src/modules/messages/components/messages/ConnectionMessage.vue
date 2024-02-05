<template>
  <div
    v-if="message.event === 'connection'"
    class="connection-message"
  >
    <span class="message__title--connected">{{ message.username }}</span> &nbsp; присоединился к чату
  </div>
  <div
    v-else-if="message.event === 'connection-close'"
    class="connection-message"
  >
    <span class="message__title--connected">{{ message.username }}</span> &nbsp; покинул чат
  </div>
</template>

<script lang="ts" setup>
import type { IMessage } from '@/modules/messages/enitity/Messages.ts'

interface IProps {
  message: IMessage
}

const props = defineProps<IProps>()
</script>

<style lang='scss'>
.connection-message {

  font-size: 12px;
  width: fit-content;
  flex-direction: row;
  padding: 4px 8px;
  border-radius: 1000px;
  background: #d2d2d2;
  color: #426c7c;
  margin: 10px auto;

  display: flex;

}
</style>
