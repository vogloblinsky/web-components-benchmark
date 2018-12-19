<pascal-triangle>
    <div>
        <button data-value="10" onclick={ handleLoad }>
            Load 10
        </button>
        <button data-value="100" onclick={ handleLoad }>
            Load 100
        </button>
        <button data-value="500" onclick={ handleLoad }>
            Load 500
        </button>
    </div>
    <div>
        <div each={line in list}>
            <triangle-item each={item in line} text={item}></triangle-item>
        </div>
    </div>
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
        this.list = generateData(_length);
        handleLoad = function(e) {
            length = parseInt(e.target.getAttribute('data-value'));
            this.list = generateData(length);
        }
    </script>
</pascal-triangle>