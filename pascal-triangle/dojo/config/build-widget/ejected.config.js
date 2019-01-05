"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const tslib_1 = require("tslib");
const dev_config_1 = require("./dev.config");
const dist_config_1 = require("./dist.config");
const test_config_1 = require("./test.config");
const util_1 = require("./util");

function webpackConfig(env = {}) {
    const {
        mode = 'dist'
    } = env;
    let _a = require('./build-options.json'),
        {
            elements = []
        } = _a,
        rc = tslib_1.__rest(_a, ["elements"]);
    let configs;
    elements = elements.map((element) => {
        return {
            name: util_1.getElementName(element),
            path: element
        };
    });
    if (mode === 'dev') {
        configs = elements.map((element) => dev_config_1.default(Object.assign({}, rc, {
            element
        })));
    } else if (mode === 'test') {
        configs = [test_config_1.default(Object.assign({}, rc, {
            elements
        }))];
    } else {
        configs = elements.map((element) => dist_config_1.default(Object.assign({}, rc, {
            element
        })));
    }

    return configs;
}
module.exports = webpackConfig;
//# sourceMappingURL=ejected.config.js.map