let $triangleContainer = document.querySelector('#triangle-container');
let _length = 100;

document.querySelector('#ten').addEventListener('click', () => {
    render(10);
});
document.querySelector('#onehundred').addEventListener('click', () => {
    render(100);
});
document.querySelector('#fivehundred').addEventListener('click', () => {
    render(500);
});

function render(length) {
    _length = length;
    _render();
}

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

function _render() {
    
    let initialData = generateData(_length);

    $triangleContainer.innerHTML = '';

    initialData.forEach((line, index) => {
        /*let $line = document.createElement('triangle-line');
        $line.setAttribute('items', line);
        $triangleContainer.appendChild($line);*/
        let $line = document.createElement('div');
        line.forEach((item, index) => {                
            let $item = document.createElement('triangle-item');
            $item.setAttribute('text', item);
            $line.appendChild($item);
        });
        $triangleContainer.appendChild($line);
    });
}

_render();