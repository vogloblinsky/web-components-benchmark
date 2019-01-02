Slim.tag(
    'triangle-item',
    `<span bind>{{data.text}}</span>`,
    class TriangleItem extends Slim {
        get useShadow() {
            return true;
        }
    }
);
