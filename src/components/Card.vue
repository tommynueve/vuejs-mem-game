<template>
  <div class="card-container">
    <div class="card card-back" :class="{ 'card-flip-back': isFlipped }">Back</div>
    <div class="card card-front" :class="{ 'card-flip-front': isFlipped }" @click="onCardFrontClick">Front</div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Card',
  setup() {
    const isFlipped = ref(false);

    const onCardFrontClick = () => {
      isFlipped.value = true;
      setTimeout(() => {
        isFlipped.value = false;
      }, 1500);
    };

    return { onCardFrontClick, isFlipped };
  },
};
</script>

<style>
.card-container {
  --card-size: 100px;
  width: var(--card-size);
  height: var(--card-size);
  position: relative;
}
.card {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  padding: 0.5rem;
  transition: transform 0.8s ease;
  transform-style: preserve-3d;
}

.card-back {
  background-color: red;
  backface-visibility: hidden;
  transform: rotateY(180deg);
}
.card-front {
  background-color: green;
  backface-visibility: hidden;
}
.card-flip-front {
  transform: rotateY(180deg);
}
.card-flip-back {
  transform: rotateY(0deg);
}
</style>
