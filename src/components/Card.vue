<template>
  <li class="card-container">
    <div class="card card-front" :class="{ 'card-flip-front': isVisible }">
      {{ frontValue }}
      <transition name="shine">
        <div aria-hidden="true" class="card-shine" v-if="isDiscovered"></div>
      </transition>
    </div>
    <div class="card card-back" :class="{ 'card-flip-back': isVisible }" @click="onCardBackClick">
      {{ frontValue }}
      <img src="../assets/AvalancheLogo.jpg" alt="Card back" />
    </div>
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
    isDiscovered: {
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
  --card-size: 110px;
  width: var(--card-size);
  height: var(--card-size);
  position: relative;
}
.card {
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  transition: transform 0.8s ease;
  transform-style: preserve-3d;
  box-shadow: 5px 2px 20px 0 rgba(46, 61, 73, 0.5);
  overflow: hidden;
  cursor: pointer;
}

.card-front {
  backface-visibility: hidden;
  transform: rotateY(180deg);
}

.card-back {
  backface-visibility: hidden;
}

.card-shine {
  position: absolute;
  height: 200%;
  width: 200%;
  top: -190px;
  left: -190px;
  transform: rotate(45deg);
  background-color: #fff;
  opacity: 0;
}

.shine-enter-from {
  opacity: 1;
}

.shine-enter-to {
  transform: translate(100%, 100%);
  opacity: 0;
}

.shine-enter-active,
.shine-leave-active {
  transition: all 3s ease;
}

.card-flip-back {
  transform: rotateY(180deg);
}
.card-flip-front {
  transform: rotateY(0deg);
}

img {
  width: 100%;
}
</style>
