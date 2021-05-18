<template>
  <button @click="onClick" class="main-button"><slot></slot></button>
</template>

<script>
export default {
  emits: ['onClick'],
  setup(props, context) {
    const onClick = () => {
      context.emit('onClick');
    };

    return { onClick };
  },
};
</script>

<style>
.main-button {
  font-size: 1.15rem;
  text-transform: capitalize;
  border-radius: 10px;
  padding: 0.5rem 1rem;
}
</style>
