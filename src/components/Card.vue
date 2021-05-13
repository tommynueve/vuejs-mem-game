<template>
  <li class="card-container">
    <div class="card card-front" :class="{ 'card-flip-front': isVisible }">{{ frontValue }}</div>
    <div class="card card-back" :class="{ 'card-flip-back': isVisible }" @click="onCardBackClick">Back</div>
  </li>
</template>

<script>
export default {
  name: 'Card',
  props: {
    frontValue: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['cardBackClick'],
  setup(props, context) {
    const onCardBackClick = () => {
      context.emit('cardBackClick', {
        frontValue: props.frontValue,
        position: props.position,
      });
    };

    return { onCardBackClick };
  },
};
</script>

<style>
.card-container {
  --card-size: 125px;
  width: var(--card-size);
  height: var(--card-size);
  position: relative;
}
.card {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  padding: 0.5rem;
  transition: transform 0.8s ease;
  transform-style: preserve-3d;
  box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
}

.card-front {
  background-color: red;
  backface-visibility: hidden;
  transform: rotateY(180deg);
}
.card-back {
  background-color: green;
  backface-visibility: hidden;
}
.card-flip-back {
  transform: rotateY(180deg);
}
.card-flip-front {
  transform: rotateY(0deg);
}
</style>
