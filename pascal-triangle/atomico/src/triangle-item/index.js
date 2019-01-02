import { h, Element } from 'atomico';
export default class extends Element {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    static get props() {
        return ['text'];
    }
    render() {
        return <span>{this.props.text}</span>;
    }
}
