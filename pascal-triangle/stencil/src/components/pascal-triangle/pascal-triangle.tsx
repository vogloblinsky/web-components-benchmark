import { Component, Prop } from '@stencil/core';

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

@Component({
  tag: 'pascal-triangle',
  shadow: true
})
export class PascalTriangle {

  @Prop({ mutable: true })
  _list;
  _length;

  constructor() {
    this._length = _length;
    this._list = generateData(_length);
  }

  _handleLoad(e) {
    this._length = parseInt(e.target.getAttribute('data-value'));
    this._list = [...generateData(this._length)];
  }

  render() {
    return (
      <div>
        <div>
            <button data-value="10" onClick={ev => this._handleLoad(ev)}>Load 10</button>
            <button data-value="100" onClick={ev => this._handleLoad(ev)}>Load 100</button>
            <button data-value="500" onClick={ev => this._handleLoad(ev)}>Load 500</button>
        </div>
        <div>
            {this._list.map((line) =>
            <div>
              {line.map((item) =>
                  <triangle-item text={item}></triangle-item>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
