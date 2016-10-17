<template>
  <div>
    <div class="container"
      @click.stop="handleClick">
      <div v-for="(_, y) in pixels[0] || []">
        <div v-for="(_, x) in pixels" class="pixel"
          :class="pixels[x][y].classList"
          :style="[pixelGlobalStyle, { backgroundColor: pixels[x][y].color }]"
          :data-x="x"
          :data-y="y"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['pixelSize', 'pixels'],

    computed: {
      pixelGlobalStyle() {
        return {
          width: this.pixelSize + 'px',
          height: this.pixelSize + 'px'
        };
      }
    },

    methods: {
      handleClick(event) {
        let { target } = event;
        if (!(target.dataset.x && target.dataset.y)) return;
        let { x, y } = target.dataset;
        x = +x;
        y = +y;
        this.$emit('click-pixel', { x, y });
      }
    }
  };
</script>

<style lang="scss" scoped>
  div {
    display: flex;
    align-items: center;
    justify-content: center;

    > .container {
      display: inline-block;
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, .2);
      transform:scaleY(-1);
    }
  }

  .pixel {
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid #ccc;
  }
</style>
