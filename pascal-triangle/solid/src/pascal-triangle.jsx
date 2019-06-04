import { customElement } from 'solid-element';
import { createSignal } from 'solid-js';

import './triangle-item';

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

const PascalTriangle = () => {
  const [list, setList] = createSignal(generateData(_length)),
    handleLoad = ({ target }) => {
      let length = parseInt(target.getAttribute('data-value'));
      setList(generateData(length));
    };

  return (<>
    <div>
      <button data-value="10" onClick={ handleLoad }>Load 10</button>
      <button data-value="100" onClick={ handleLoad }>Load 100</button>
      <button data-value="500" onClick={ handleLoad }>Load 500</button>
    </div>
    <div>{(list().map( line =>
      <div>{line.map( item =>
        <triangle-item text={item} />
      )}</div>
    ))}</div>
  </>);
}

customElement('pascal-triangle', PascalTriangle);