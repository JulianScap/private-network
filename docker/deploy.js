import { existsSync, mkdirSync, cpSync, rmSync } from 'fs';
import { spawn } from 'node:child_process';
import { cwd } from 'node:process';

const startProcess = (command, cwd, ...args) => {
  return new Promise((resolve, reject) => {
    console.log(`Running "${[command, ...args].join(' ')}" in ${cwd}`);
    const process = spawn(command, args, { cwd });

    //process.stdout.on('data', (data) => console.log(data.toString().trim()));

    process.on('close', (code) => {
      if (code) {
        reject(`Task ${command} in ${cwd} failed with code ${code}`);
      } else {
        resolve();
      }
    });
  });
};

const frontEnd = '../front-end';
const backEnd = '../back-end';
const outDir = './dist';

const canRun =
  existsSync('../docker') &&
  existsSync(frontEnd) &&
  existsSync(backEnd) &&
  cwd().endsWith('docker');

if (!canRun) {
  console.error('Please run this script in the folder private-network/docker');
  exit(1);
}

if (existsSync(outDir)) {
  console.log(`Removing existing dir ${outDir}`);
  rmSync(outDir, {
    recursive: true,
    force: true,
  });
}

console.log(`Creating ${outDir}`);
mkdirSync(outDir);

for (const directory of [frontEnd, backEnd]) {
  const folderName = directory.replace('../', '');
  console.log(`Building ${folderName}`);

  await startProcess('yarn', directory);
  await startProcess('yarn', directory, 'build');
  cpSync(`${directory}/dist`, `${outDir}/${folderName}`, {
    recursive: true,
  });
}

console.log('Building docker image');
await startProcess('docker', cwd(), 'build', '.', '-t', 'private-network');
