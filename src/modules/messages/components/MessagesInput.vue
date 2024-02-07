<template>
  <form
    class="messages__inputs"
    @submit.prevent="emit('send-message')"
  >
    <div
      v-if="replyMessage"
      class="messages__inputs-reply"
    >
      <div>
        <h3>В ответ: {{ replyMessage.username }}</h3>
        <p>{{ replyMessage.message }}</p>
      </div>
      <img
        src="@/core/assets/icons/cross.svg"
        alt=""
        width="24"
        @click="emit('clear-reply')"
      >
    </div>
    <div
      v-if="messageImg"
      class="messages__inputs-preview"
    >
      <img
        :src="messageImgSrc.src"
        alt=""
        @click="emit('clear-reply')"
      >
    </div>
    <ui-input
      :model-value="messageText"
      class="messages__inputs-input"
      placeholder="Введите сообщение"
      @update:model-value="(v: string) => emit('update:messageText', v)"
    >
      <template
        v-if="messageText.length || messageImg"
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
      <template
        v-else
        #prepend
      >
        <ui-button
          variant="flat"
          class="messages__inputs-btn"
          @click.prevent="handleOpenFileInput"
        >
          <img
            src="@/core/assets/icons/image.svg"
            width="24"
            alt=""
          >
        </ui-button>
      </template>
    </ui-input>
    <input
      v-show="false"
      ref="fileInput"
      type="file"
      @change="handleUploadImg"
    >
  </form>
</template>

<script lang="ts" setup>

import UiInput from '@/core/components/ui/ui-input.vue'
import UiButton from '@/core/components/ui/ui-button.vue'
import { type IMessage } from '@/modules/messages/enitity/Messages.ts'
import { ref } from 'vue'

interface IProps {
  replyMessage: IMessage
  messageImg: any
  messageImgSrc: MediaImage
  messageText: string
}

const props = defineProps<IProps>()
const emit = defineEmits([
  'send-message',
  'clear-reply',
  'open-file-input',
  'update:messageText',
  'update:messageImg'
])

const handleUploadImg = (element: any) => {
  const file = element.target.files[0]
  const reader = new FileReader()
  reader.onloadend = function () {
    console.log(reader.result)
    emit('update:messageImg', reader.result)
  }
  reader.readAsDataURL(file)
}

const fileInput = ref<HTMLElement | null>(null)

const handleOpenFileInput = () => {
  fileInput.value.click()
}
</script>

<style lang='scss'>

</style>
