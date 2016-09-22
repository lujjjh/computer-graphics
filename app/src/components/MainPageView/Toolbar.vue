<template>
  <el-menu class="toolbar" mode="horizontal" @select="handleSelect">
    <template v-for="(shape, shapeIndex) in supportedShapes">
      <el-submenu :index="shape.name">
        <template slot="title">{{ shape.name }}</template>
        <el-menu-item v-for="(algorithm, algorithmIndex) in shape.algorithms" :index="[shapeIndex, algorithmIndex].join('-')">
          {{ algorithm.name }}
        </el-menu-item>
      </el-submenu>
    </template>
    <li class="toolbar-commands">
      <el-button type="text" @click.native="handleCommand('clear')">清除画布</el-button>
    </li>
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
      },

      handleCommand(command, ...args) {
        this.$emit('command', command, ...args);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .toolbar {
    padding-left: 20px;
    padding-right: 20px;
  }

  .toolbar-commands {
    float: right;

    button {
      padding-top: 0;
      padding-bottom: 0;
      height: 60px;
      line-height: 60px;
    }
  }
</style>
