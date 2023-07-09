import { existsSync } from 'fs';
import { spawn } from 'node:child_process';
import { cwd } from 'node:process';

const startProcess = (command, cwd, ...args) => {
  return new Promise((resolve, reject) => {
    const process = spawn(command, args, { cwd });

    process.stdout.on('data', (data) => console.log(data.toString().trim()));

    process.on('close', (code) => {
      if (code) {
        reject(`Task ${command} in ${cwd} failed with code ${code}`);
      } else {
        resolve();
      }
    });
  });
};

const canRun =
  existsSync('../docker') &&
  existsSync('../front-end') &&
  existsSync('../back-end') &&
  cwd().endsWith('docker');

if (!canRun) {
  console.error('Please run this script in the folder private-network/docker');
  exit(1);
}

await startProcess('yarn', '../front-end');
await startProcess('yarn', '../front-end', 'build');
await startProcess('yarn', '../back-end');
await startProcess('yarn', '../back-end', 'build');

//docker build . -t private-network
