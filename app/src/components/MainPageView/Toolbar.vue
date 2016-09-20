<style lang="scss" scoped>
  .toolbar {
    padding-left: 20px;
  }
</style>

<template>
  <el-menu class="toolbar" mode="horizontal" theme="dark" @select="handleSelect">
    <template v-for="(shape, shapeIndex) in supportedShapes">
      <el-submenu :index="shape.name">
        <template slot="title">{{ shape.name }}</template>
        <el-menu-item v-for="(algorithm, algorithmIndex) in shape.algorithms" :index="[shapeIndex, algorithmIndex].join('-')">
          {{ algorithm.name }}
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
  export default {
    props: ['supportedShapes'],

    methods: {
      handleSelect(index) {
        let shapeAndAlgorithm = index.split('-');
        if (shapeAndAlgorithm.length > 1) {
          let [shape, algorithm] = shapeAndAlgorithm.map(v => +v);
          shape = this.supportedShapes[shape];
          algorithm = shape.algorithms[algorithm];
          this.$emit('select-algorithm', shape, algorithm);
        }
      }
    }
  };
</script>
