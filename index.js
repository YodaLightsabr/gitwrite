#!/usr/bin/env node

const art = require('ascii-art');
const { exec } = require('child_process');
const fetch = require('node-fetch');
const prompt = require('prompt-sync')();
const type = require('./letters.js');
const run = (...args) => new Promise((resolve, reject) => exec(...args, (err, stdout, stderr) => err ? (() => {
    reject(err);
    console.log(stdout, stderr);
})() : resolve(stdout)));

process.argv.shift();
if (isNaN(process.argv[0])) process.argv.shift();
const args = process.argv;

const [year, message] = args.map(v => isNaN(v) ? v : +v);

(async () => {
    if (!year || !message) return console.log('Welcome to GitWrite! GitWrite lets you add a message to your GitHub contribution graph. To begin, make a new GitHub repo, clone it locally, and get ready to add commits!\n\nRun this command again with this syntax: gitwrite <year> <message>.\nMessage should be in qotes. Messages can only have alphanumeric characters, spaces. and some symbols.');

    const username = (await run('git config user.name')).trim();
    const data = await fetch('https://api.github.com/users/' + username).then(r => r.json());
    if (data.message) return console.log('Invalid GitHub username "' + username + '"');

    const commands = type(year, message);

    console.log(`Welcome, ${username}!`);
    console.log(`Using git repo in directory ${process.cwd()},`);
    console.log(`Staging ${commands.length / 6} commits to write ${message} in ${year}...`);
    prompt('Press enter to continue...');

    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        await run(command);
        console.log(`${i + 1}/${commands.length} (${Math.round((i + 1) / commands.length * 1000) / 10}%)`);
    }

    console.log('Pushing changes...');
    await run('git push');
    console.log('Changes pushed!');
})();