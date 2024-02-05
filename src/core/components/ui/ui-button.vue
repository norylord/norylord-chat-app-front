<template>
  <button
    class="button"
    :class="{'button--outlined': variant==='outlined', 'button--flat': variant==='flat',}"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>

interface IProps {
  variant: string
}

const props = defineProps<IProps>()
</script>

<style lang='scss'>
.button {
  padding: 12px 24px;
  background: #06a94d;
  color: #ffffff;
  transition: all .3s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 16px;
  cursor: pointer;

  img {
    color: currentColor;
    stroke: #06a94d;
  }

  &--outlined {
    background: rgba(0, 0, 0, 0);
    color: #06a94d;
    border: 1px solid #06a94d;
    stroke: #06a94d;
    fill: #06a94d;
  }

  &--flat {
    background: none;
    border: none;

    &:hover {
      background: none;
    }
  }

  &:hover {
    background: #04803b;
  }
}

@media screen and (max-width: 700px) {
  .button {
    padding: 8px 12px;
  }
}
</style>
