<template>
  <button class="button">
    <slot />
  </button>
</template>

<script lang="ts" setup>

interface IProps {
}

const props = defineProps<IProps>()
</script>

<style lang='scss'>
.button {
  padding: 16px 24px;
  background: #06a94d;
  color: #ffffff;
  transition: all .3s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 16px;
  &:hover{
    background: #04803b;
  }
}
</style>
