<template>
  <div
    class="messages__list"
  >
    <TransitionGroup name="list">
      <Message
        v-for="mess of messages"
        :key="mess.id"
        :message="mess"
        :username="username"
        class="message-wrapper"
      />
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>

import { type TMessage } from '@/modules/messages/enitity/Messages.ts'
import Message from '@/modules/messages/components/Message.vue'

interface IProps {
  messages: TMessage[]
  username: string
}

const props = defineProps<IProps>()
</script>

<style lang='scss'>

</style>
