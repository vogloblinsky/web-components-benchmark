import {
    App
} from "./app";
import {
    Input
} from "./input";
import {
    Item
} from "./item";

customElements.define("my-todo", App);
customElements.define("todo-input", Input);
customElements.define("todo-item", Item);