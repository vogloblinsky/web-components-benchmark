<template>
  <div>
    <div>
        <button data-value="10" @click="handleLoad">Load 10</button>
        <button data-value="100" @click="handleLoad">Load 100</button>
        <button data-value="500" @click="handleLoad">Load 500</button>
    </div>
    <div>
      <div v-for="line in list">
        <triangle-item :text="item" v-for="item in line"></triangle-item>
      </div>
    </div>
  </div>
</template>

<script>
let _length = 100;

function generateData(rows) {
    const n = rows;

    const data = [];
    data[0] = [1];
    data[1] = [1, 1];

    for (let row = 2; row < n; row++) {
      data[row] = [1];

      for (let col = 1; col <= row - 1; col++) {
        const prevRow = data[row - 1];
        data[row][col] = prevRow[col] + prevRow[col - 1];
        data[row].push(1);
      }
    }
    return data;
}
export default {
  name: "PascalTriangle",
  data() {
    return {
      list: generateData(_length)
    };
  },
  methods:{
    handleLoad(e){
      this._length = parseInt(e.target.getAttribute('data-value'));       
      this.list = generateData(this._length);
    }
  }
};
</script>
