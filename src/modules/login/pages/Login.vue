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
        @click="loginService.makeLogin(username)"
      >
        Подтвердить
      </ui-button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import UiInput from '@/core/components/ui/ui-input.vue'
import UiButton from '@/core/components/ui/ui-button.vue'
import { useUserStore } from '@/modules/user/store'
import { LoginService } from '@/modules/login/services/loginService.ts'
import { ref } from 'vue'

interface IProps {
}

const props = defineProps<IProps>()

const userStore = useUserStore()
const loginService = new LoginService(userStore)
const username = ref('')
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
}
</style>
