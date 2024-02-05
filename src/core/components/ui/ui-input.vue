<template>
  <div class="input-wrapper">
    <input
      type="text"
      class="input"
      :placeholder="placeholder"
      :value="modelValue"
      @input="(e: Event) => emit('update:modelValue', e.target.value)"
    >
    <div class="input-prepend">
      <slot name="prepend" />
    </div>
  </div>
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
  background: transparent;
  border-radius: 16px;
  border: 1px solid #c0c0c0;
  outline: none;
  transition: all .2s ease-in-out;

  &-wrapper {
    position: relative;
  }

  &:focus {
    background: transparent;
    border: 1px solid #06a94d;
  }

  &-prepend {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
    padding: 16px 0;
    max-height: 42px;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      padding: 8px 16px;
      border-radius: 9999px;
      color: red;
    }
  }
}
</style>
