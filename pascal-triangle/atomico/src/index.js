import { h, render, useState } from "@atomico/core";
import Element from "@atomico/element";
import TriangleItem from "./components/TiangleItem";

let memo = {};

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

export default class PascalTriangle extends Element {
	render() {
		let [state, setState] = useState(100);
		if (!memo[state]) memo[state] = generateData(state);
		let list = memo[state];
		return (
			<host shadowDom>
				<div>
					<button onClick={() => state != 10 && setState(10)}>Load 10</button>
					<button onClick={() => state != 100 && setState(100)}>
						Load 100
					</button>
					<button onClick={() => state != 500 && setState(500)}>
						Load 500
					</button>
				</div>
				<div>
					{list.map(line => (
						<div>
							{line.map(item => (
								<TriangleItem text={item} />
							))}
						</div>
					))}
				</div>
			</host>
		);
	}
}

customElements.define("pascal-triangle", PascalTriangle);
