import fs from 'fs';

const tasks = fs.readdirSync(`${__dirname}/tasks/`);
tasks.forEach( taskFile => {
	require(`${__dirname}/tasks/${taskFile}`);
});
