import Element, {
    h
} from '@skatejs/element-lit-html';
export default class TriangleItem extends Element {
    static props = {
        text: String
    };
    render() {
        return h `<span>${this.text}</span>`;
    }
}