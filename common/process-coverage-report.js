/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable promise/always-return */
/* eslint-disable promise/no-promise-in-callback */
/* eslint-disable handle-callback-err */
/* eslint-disable no-unused-vars */

const fs = require('fs');
const path = require('path');
const inline = require('inline-css');

const TEST_RESULTS_DIRECTORY = './.test_output';
const CODE_COVERAGE_DIRECTORY = './.test_output/coverage';

console.log('process-coverage-report inicializando');

fs.readdir(CODE_COVERAGE_DIRECTORY, (err, files) => {
  if (err) {
    console.log(`process-coverage-report inline.then finalizado err: [${err}]`);
    throw new Error(err);
  }

  const reports = files.filter(report => report.endsWith('.html'));

  const baseCss = fs.readFileSync(
    path.resolve(path.join(CODE_COVERAGE_DIRECTORY, 'base.css')),
    'utf8'
  );

  const prettifyCss = fs.readFileSync(
    path.resolve(path.join(CODE_COVERAGE_DIRECTORY, 'prettify.css')),
    'utf8'
  );

  const prettifyJs = fs.readFileSync(
    path.resolve(path.join(CODE_COVERAGE_DIRECTORY, 'prettify.js')),
    'utf8'
  );

  reports.forEach((report) => {
    const filePath = path.join(CODE_COVERAGE_DIRECTORY, report);
    const options = {
      url: `file://${path.resolve(filePath)}`,
      extraCss: `body { background-color: #fff !important; } .pad1 { padding: 0; } div.wrapper { text-decoration: underline; }  ${baseCss} ${prettifyCss}`,
    };

    console.log(`process-coverage-report inline.then: ${filePath}`);

    fs.readFile(path.resolve(filePath), (err, data) => {
      inline(data, options)
        .then((html) => {
          console.log('process-coverage-report inline.then');
          const outputFile = path.join(TEST_RESULTS_DIRECTORY, report);
          fs.writeFile(outputFile, html, (err) => {
            if (err) {
              console.log(`process-coverage-report inline.then finalizado err: [${err}]`);
              throw err;
            }
            console.log('process-coverage-report inline.then finalizado');
            return undefined;
          });
        })
        .catch((ex) => {
          console.log(`process-coverage-report finalizado inline.catch ex: [${ex}]`);
          console.log(ex);
          return undefined;
        });
    });
  });
});
