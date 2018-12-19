import { WeElement, define } from 'omi'

class TriangleItem extends WeElement {
    render(props) {
        return (
            <span>{props.text}</span>
        )
    }
}

define('triangle-item', TriangleItem);