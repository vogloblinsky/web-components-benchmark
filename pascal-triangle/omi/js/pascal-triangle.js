import { render, WeElement, define } from 'omi'

class PascalTriangle extends WeElement {
    css() {
        return ``
    }

    static get data() {
        return { list: null }
    }

    handleLoad(e) {
        length = parseInt(e.target.getAttribute('data-value'));
        this.store.data.list = generateData(length);
    }

    render(props, data, store) {
        return (
            <div>
                <div>
                    <button data-value="10" onClick={this.handleLoad.bind(this)}>
                        Load 10
                    </button>
                    <button data-value="100" onClick={this.handleLoad.bind(this)}>
                        Load 100
                    </button>
                    <button data-value="500" onClick={this.handleLoad.bind(this)}>
                        Load 500
                    </button>
                </div>
                <div>
                    {
                        this.store.data.list.map(line => (
                            <div>
                                {
                                    line.map(item => (
                                        <triangle-item text={item}></triangle-item>
                                    ))
                                } 
                            </div>
                        ))
                    }  
                </div>
            </div>
        )
    }
}

define('pascal-triangle', PascalTriangle);

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

let list = generateData(_length);

const store = {
    data: {
        list: list
    }
}
render(
    <div>
        <a href="../" id="back">⬅ Back to other implementations</a>
        <pascal-triangle></pascal-triangle>
    </div>
, 'body', store)