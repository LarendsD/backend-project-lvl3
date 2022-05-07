#!/usr/bin/env node
import { Command } from 'commander';
import axiosdebuglog from 'axios-debug-log';
import pageLoad from '../src/index.js';

const pageLoader = new Command();

pageLoader
  .description('Page loader utility.')
  .argument('<url>')
  .option('-V, --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .action(async (url, option) => {
    console.log('Copying site...');
    await pageLoad(url, option.output);
    console.log('Copying Complete!');
  });

pageLoader.parse(process.argv);

axiosdebuglog({
  request(debug, config) {
    debug(`Request with ${config.url}`);
  },
  response(debug, response) {
    debug(
      `Response with ${response.headers['content-type']}`,
      `from ${response.config.url}`,
    );
  },
  error(debug, error) {
    debug('Boom', error);
  },
});

export default pageLoader;
