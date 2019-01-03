Slim.tag(
    'triangle-line',
    `
    <style>
        :host {
            display: block;
        }
    </style>
    <triangle-item s:repeat="line as item" text="item"></triangle-item>`,
    class TriangleLine extends Slim {
        get useShadow() {
            return true;
        }
    }
);
