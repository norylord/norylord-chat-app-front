<template>
  <input
    type="text"
    class="input"
    :placeholder="placeholder"
    :value="modelValue"
    @input="(e: Event) => emit('update:modelValue', e.target.value)"
  >
</template>

<script lang="ts" setup>

interface IProps {
  modelValue: any
  placeholder: string
}

const props = defineProps<IProps>()
const emit = defineEmits(['update:modelValue'])
</script>

<style lang='scss'>
.input {
  padding: 16px;
  width: 100%;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #c0c0c0;
  outline: none;
  transition: all .2s ease-in-out;
  &:focus {
    background: transparent;
    border: 1px solid #06a94d;
  }
}
</style>
