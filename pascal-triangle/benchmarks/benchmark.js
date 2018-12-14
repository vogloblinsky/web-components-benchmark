const fs = require('fs-extra');

const meta = require('../../common/meta');

const {
    benchPageLoad,
    benchTti
} = require('../../common/helpers');

let ELEMENTS = [...meta.wc, ...meta.fw];

let requestedElements = process.env.ELEMENTS;

if (requestedElements) {
    requestedElements = requestedElements.split(',');
    ELEMENTS = requestedElements.map(requestedElement => {
        let element = meta.wc.find(
            wcElement => wcElement.slug === requestedElement
        );
        if (!element) {
            element = meta.fw.find(
                wcElement => wcElement.slug === requestedElement
            );
        }
        return element;
    });
}

console.log('*****************************');
console.log('* PASCAL TRIANGLE BENCHMARK *');
console.log('*****************************');

(async () => {
    for (let i = 0; i < ELEMENTS.length; i++) {
        let element = ELEMENTS[i];

        if (fs.pathExistsSync(`../pascal-triangle/${element.url}`)) {
            console.log('********************');
            console.log('* ' + element.name);
            console.log('********************');

            const resultsFileLoad = '../results/pascal-triangle-load.json';
            if (!fs.pathExistsSync(resultsFileLoad)) {
                fs.outputJsonSync(resultsFileLoad, {});
            }

            let resultsLoad = fs.readJsonSync(resultsFileLoad);
            let averageLoad = await benchPageLoad(element, element.url);
            console.log(
                `\nAverage time for Page Load : ${Math.ceil(averageLoad)} ms\n`
            );
            resultsLoad[element.slug] = Math.ceil(averageLoad);
            fs.outputJsonSync(resultsFileLoad, resultsLoad);

            const resultsFileTti = '../results/pascal-triangle-tti.json';
            if (!fs.pathExistsSync(resultsFileTti)) {
                fs.outputJsonSync(resultsFileTti, {});
            }
            let resultsTti = fs.readJsonSync(resultsFileTti);
            let averageTti = await benchTti(element.url);
            console.log(
                `\nAverage time for time to interactive : ${Math.ceil(
                    averageTti
                )} ms\n`
            );
            resultsTti[element.slug] = Math.ceil(averageTti);
            fs.outputJsonSync(resultsFileTti, resultsTti);
        }
    }
})();