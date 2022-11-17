<script setup>
import { computed } from 'vue';
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  otherSize: {
    type: String,
  },

});
const symbolId = computed(() => { return `#${props.name}` });
</script>

<template>
  <svg :class="['svg-icon', otherSize || 'w-8 h-8']" aria-hidden="true">
    <use :href="symbolId" class="" />
  </svg>
</template>

<style scoped>
.svg-icon {
  @apply fill-current align-[-10px] overflow-hidden;
  /* vertical-align: -0.15em; */
}
</style>