var registerCustomElement = require('@dojo/framework/widget-core/registerCustomElement').default;

var defaultExport = widgetFactory.default;
defaultExport && registerCustomElement(defaultExport);