import {useState} from "@atomico/core";
import {  h,customElement } from "@atomico/element";
import Input from "./components/Input";
import Item from "./components/Item";
import style from "./style.css";

function Todo(){
	let [state, setState] = useState(() => [
		{ text: "my initial todo", checked: false, id: 1 },
		{ text: "Learn about Web Components", checked: true, id: 2 }
	]);
	return (
		<host shadowDom>
			<style>{style}</style>
			<Input
				placeholder="What needs to be done?"
				handlerChange={task => {
					setState(state.concat(task));
				}}
			/>
			<div>
				{state.map(({ text, checked, id }, localIndex) => (
					<Item
						key={id}
						text={text}
						checked={checked==true}
						handlerRemove={() => {
							setState(state.filter((data, index) => index !== localIndex));
						}}
						handlerToggle={() => {
							setState(
								state.map((data, index) =>
									index === localIndex
										? {
												...data,
												checked: !data.checked
											}
										: data
								)
							);
						}}
					/>
				))}
			</div>
		</host>
	);
}

customElement("atomico-todo",Todo);
