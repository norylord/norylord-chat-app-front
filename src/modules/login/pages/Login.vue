<template>
  <form
    class="login"
    @submit.prevent
  >
    <h1 class="login__title">
      Логин
    </h1>
    <div class="login__inputs">
      <ui-input
        v-model="username"
        placeholder="Введите никнейм"
      />
      <ui-button
        class="login__inputs-btn"
        @click="handleLogin()"
      >
        Подтвердить
      </ui-button>
    </div>
    <p
      v-if="error || checkForUsername"
      class="login__error"
    >
      {{ error.length ? error : 'Длина ника должна быть от 6 до 20 символов' }}
    </p>
  </form>
</template>

<script lang="ts" setup>
import UiInput from '@/core/components/ui/ui-input.vue'
import UiButton from '@/core/components/ui/ui-button.vue'
import { useUserStore } from '@/modules/user/store'
import { LoginService } from '@/modules/login/services/loginService.ts'
import { computed, ref, watch } from 'vue'
import { UserService } from '@/modules/user/services/userService.ts'

interface IProps {
}

const props = defineProps<IProps>()

const userStore = useUserStore()
const loginService = new LoginService(userStore)
const userService = new UserService(userStore)
const username = ref('')
const error = ref('')

watch(() => username.value, () => {
  error.value = ''
})
const handleLogin = async () => {
  error.value = await loginService.makeLogin(username.value)
}

const checkForUsername = computed(() => {
  if (userService.getUsername().length === 0) return false
  return userService.getUsername().length < 6 || userService.getUsername().length > 20
})
</script>

<style lang='scss'>
.login {
  max-width: 600px;
  width: 100%;

  &__title {
    font-size: 60px;
    margin-bottom: 30px;

    &:first-letter {
      color: #06a94d
    }
  }

  &__inputs {
    &-btn {
      margin-top: 16px;
    }
  }

  &__error {
    color: red;
    margin-top: 16px;
  }
}
</style>
