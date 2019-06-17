'use strict';

module.exports = {
    extends: 'lighthouse:default',
    settings: {
        onlyAudits: ['interactive']
    }
};
