<script setup>
import { computed } from 'vue';
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
const symbolId = computed(() => { return `#${props.name}` });
</script>

<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :href="symbolId" class="" />
  </svg>
</template>

<style scoped>
.svg-icon {
  @apply
  w-7
  h-7
  fill-current
  align-[-10px]
  overflow-hidden
  /* vertical-align: -0.15em; */
}
</style>