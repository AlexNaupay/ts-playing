import * as fs from "node:fs";

const data = fs.readFileSync('src/files/webstorm-key-macos.pdf');

// to base64
const base64StringOnly = data.toString('base64');

const file64 = `data:application/pdf;base64,${base64StringOnly}`  // Typically appearance
console.log(file64);

// Remove header
let base64String = file64.split(';base64,').pop() || '';

// Write to disk
fs.writeFileSync('src/files/file64.pdf', base64String, {encoding: 'base64'})