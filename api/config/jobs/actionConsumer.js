const { parentPort } = require('worker_threads');

const delay = require('delay');
const ms = require('ms');

(async () => {
  // wait for a promise to finish
  await delay(ms('10s'));
  console.log("action consumed");

  // signal to parent that the job is done
  if (parentPort) parentPort.postMessage('done');
  else process.exit(0);
})();