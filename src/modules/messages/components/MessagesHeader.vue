<template>
  <div>
    <div class="messages__header">
      <div
        v-if="!isUsernameUpdating"
      >
        <h1
          class="messages__header-title"
          @click="emit('update-username')"
        >
          {{ username }}
        </h1>
        <div
          v-click-outside="() => emit('close-userlist')"
          class="messages__header-info"
          @click="emit('open-userlist')"
        >
          <p>
            Количество активных пользователей: {{ usersCount }}
          </p>
          <ul
            v-if="showUserList"
            class="messages__header-userlist"
          >
            <li
              v-for="user of activeUsers"
              :key="user.id"
              v-text="user.username"
            />
          </ul>
        </div>
      </div>
      <form
        v-else
        v-click-outside="() => emit('confirm-username', newUsername)"
        class="messages__header-inputs"
        @submit.prevent
      >
        <ui-input
          v-model="newUsername"
          placeholder="Введите сообщение"
        />
        <ui-button
          type="submit"
          @click="emit('confirm-username', newUsername)"
        >
          Подтвердить
        </ui-button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>

import UiInput from '@/core/components/ui/ui-input.vue'
import UiButton from '@/core/components/ui/ui-button.vue'
import { ref } from 'vue'

interface IProps {
  usersCount: number
  isUsernameUpdating: boolean
  username: string
  showUserList: boolean
  activeUsers: any[]
}

const props = defineProps<IProps>()
const emit = defineEmits(['update-username', 'close-userlist', 'open-userlist', 'confirm-username'])

const newUsername = ref('')
</script>

<style lang='scss'>

</style>
