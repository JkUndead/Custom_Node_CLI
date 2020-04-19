#!/usr/bin/env node
const fs = require('fs');
const chalk = require('chalk')
const path = require('path')

const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        throw new Error(err);
    }

    // identify the files and dirs
    const statPromises = filenames.map(filename => {
        // join the path with the file name
        return lstat(path.join(targetDir, filename));
    })
    // wait for all the lstat to execute
    const allStats = await Promise.all(statPromises)

    for (let stat of allStats) {
        const index = allStats.indexOf(stat)
        // files are gree and directories are normal
        if (stat.isFile()) {
            console.log(chalk.green(filenames[index]))
        } else {
            console.log(filenames[index])
        }

    }
})