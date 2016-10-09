<template>
  <div>
    <toolbar class="toolbar"
      :supported-shapes="supportedShapes"
      @select-algorithm="handleSelectAlgorithm">
      <el-button type="text" @click.native="zoomOut">➖</el-button>
      <el-button type="text" @click.native="zoomIn">➕</el-button>
      <el-button type="text" @click.native="clear">清除画布</el-button>
    </toolbar>
    <pixel-canvas class="canvas"
      ref="canvas"
      :pixel-size="pixelSize"
      :pixels="computedPixels"
      @click-pixel="handleClickPixel"></pixel-canvas>
  </div>
</template>

<script>
  import supportedShapes from '../supported-shapes';
  import Toolbar from './MainPageView/Toolbar';
  import PixelCanvas from './MainPageView/PixelCanvas';
  import Pixel from '../models/Pixel';

  export default {
    components: {
      Toolbar,
      PixelCanvas
    },

    data() {
      return {
        supportedShapes,
        pixelSize: 24,
        pixels: [],
        stokeColor: '#2980b9',
        fillColor: '#fff',
        selectedShape: null,
        selectedAlgorithm: null,
        selectedPixels: []
      };
    },

    computed: {
      computedPixels() {
        return this.pixels.map(cols =>
          cols.map(pixel => {
            let { selected, painted, brushColor } = pixel;
            let color = painted ? brushColor : '#fff';
            let classList = [];
            if (selected) classList.push('pixel-selected');
            return { color, classList };
          }));
      }
    },

    mounted() {
      addEventListener('resize', this.handleResize);
      this.handleResize();
    },

    beforeDestroy() {
      removeEventListener('resize', this.handleResize);
    },

    methods: {
      handleResize() {
        const rect = this.$refs.canvas.$el.getBoundingClientRect();
        const cols = ~~(rect.width / this.pixelSize);
        const rows = ~~(rect.height / this.pixelSize);
        this.pixels = [...Array(cols)]
          .map((col, index) => this.pixels[index] || [])
          .map((col, y) => [...Array(rows)].map((row, x) => col[x] || Pixel()));
      },

      handleSelectAlgorithm(shape, algorithm) {
        this.clearSelection();
        this.selectedShape = shape;
        this.selectedAlgorithm = algorithm;
      },

      clear() {
        this.pixels = [];
        this.selectedPixels = [];
        this.handleResize();
      },

      zoomOut() {
        if (this.pixelSize > 6) {
          this.pixelSize >>= 1;
          this.handleResize();
        }
      },

      zoomIn() {
        if (this.pixelSize < 96) {
          this.pixelSize <<= 1;
          this.handleResize();
        }
      },

      clearSelection() {
        let { selectedPixels } = this;
        this.selectedPixels = [];
        setTimeout(() => {
          selectedPixels.forEach(({ x, y }) => {
            this.pixels[x][y].selected = false;
          });
        }, 300);
      },

      handleClickPixel({ x, y }) {
        if (!this.selectedAlgorithm) {
          this.$message({
            message: '请先选择要绘制的图形和绘制使用的算法',
            type: 'error'
          });
          return;
        }
        let { selectedPixels } = this;
        selectedPixels.push({ x, y });
        this.pixels[x][y].selected = true;
        if (this.selectedShape.checkIfFinished(selectedPixels)) {
          let { outline, fills } = this.selectedAlgorithm.callback({ selectedPixels });
          this.clearSelection();
          outline.forEach(({ x, y }) => {
            if (x < 0 || y < 0 || x >= this.pixels.length || y >= this.pixels[0].length) return;
            this.pixels[x][y].painted = true;
            this.pixels[x][y].brushColor = this.stokeColor;
          });
          fills.forEach(({ x, y }) => {
            if (x < 0 || y < 0 || x >= this.pixels.length || y >= this.pixels[0].length) return;
            this.pixels[x][y].painted = true;
            this.pixels[x][y].brushColor = this.brushColor;
          });
        }
      }
    }
  };
</script>

<style>
  .pixel {
    transition: all ease .2s;
  }

  .pixel-selected {
    transform: scale(1.5, 1.5);
    background: #e74c3c !important;
    border-color: transparent !important;
    box-shadow: 0 0 10px #c0392b;
  }
</style>

<style lang="scss" scoped>
  div {
    display: flex;
    flex-flow: column;
    height: 100%;
    background: #2c3e50;

    >  .canvas {
      margin: 40px;
      flex: 1;
    }
  }
</style>
