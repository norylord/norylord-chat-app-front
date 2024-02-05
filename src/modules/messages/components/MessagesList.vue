<template>
  <div
    class="messages__list"
  >
    <component
      :is="getMessageComponent(mess.event)"
      v-for="(mess, index) of messages"
      :key="mess.id"
      :message="mess"
      :previous-message="messages[index - 1] ?? {}"
      :username="username"
      @reply="(v: IMessage) => emit('reply', v)"
    />
  </div>
</template>

<script lang="ts" setup>

import { type IMessage } from '@/modules/messages/enitity/Messages.ts'
import CommonMessage from '@/modules/messages/components/messages/CommonMessage.vue'
import ConnectionMessage from '@/modules/messages/components/messages/ConnectionMessage.vue'

interface IProps {
  messages: IMessage[]
  username: string
}

const props = defineProps<IProps>()
const emit = defineEmits(['reply'])

const getMessageComponent = (type: 'connection' | 'connection-close' | 'message') => {
  switch (type) {
    case 'message':
      return CommonMessage
    case 'connection':
      return ConnectionMessage
    case 'connection-close':
      return ConnectionMessage
  }
}
</script>

<style lang='scss'>

</style>
