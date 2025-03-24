/* eslint-disable */
<template>
  <div
    class="card"
    @click="flipCard"
    :class="{ flipped: card.flipped || card.matched }"
  >
    <div class="card-inner">
      <div class="card-front">
        ?
      </div>
      <div
        class="card-back"
        :style="{ backgroundImage: `url(${props.card.image})` }"
      ></div>
    </div>
  </div>
</template>

<script setup>

// eslint-disable-next-line no-undef
const props = defineProps({
  card: Object,
  index: Number
});
// eslint-disable-next-line no-undef
const emit = defineEmits(['flip']);

const flipCard = () => {
  emit('flip', props.index); 
};
</script>
