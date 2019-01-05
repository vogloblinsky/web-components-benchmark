"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const os = require("os");
const path = require("path");
/**
 * @private
 * Clear the rc data for the specified key (e.g., "build-widget") from the dojorc and return
 * the cleared data.
 *
 * @param key The rc key
 * @return The cleared data
 */
function clearBuildOptions(key) {
    const rcPath = path.join(process.cwd(), '.dojorc');
    if (fs.existsSync(rcPath)) {
        const rc = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
        const config = rc[key] || {};
        rc[key] = {};
        fs.writeFileSync(rcPath, JSON.stringify(rc));
        return config;
    }
    return {};
}
function getElementName(elementPath) {
    const pathSegments = elementPath.split('/');
    let elementName = pathSegments[pathSegments.length - 1];
    const matches = elementName.match(/([A-Z])/g);
    if (!matches) {
        return elementName;
    }
    for (let i = 0, n = matches.length; i < n; i++) {
        elementName = elementName.replace(new RegExp(matches[i]), '-' + matches[i].toLowerCase());
    }
    if (elementName.slice(0, 1) === '-') {
        elementName = elementName.slice(1);
    }
    return elementName;
}
exports.getElementName = getElementName;
/**
 * Extract the rc data for the provided key to a temporary file and remove it from the dojorc.
 * This utility is necessary given that "eject" is treated as a full command (see
 * https://github.com/dojo/cli/issues/192 for more details).
 *
 * @param key The rc key (e.g., "build-widget")
 * @return The path to the temporary file
 */
function moveBuildOptions(key) {
    const tmpDir = fs.mkdtempSync(`${os.tmpdir()}${path.sep}`);
    const tmpRc = path.join(tmpDir, 'build-options.json');
    const rc = clearBuildOptions(key);
    fs.writeFileSync(tmpRc, JSON.stringify(rc));
    return tmpRc;
}
exports.moveBuildOptions = moveBuildOptions;
//# sourceMappingURL=util.js.map