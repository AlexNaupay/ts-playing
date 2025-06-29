import * as fs from 'fs';
import * as process from "node:process";
import {configDotenv} from "dotenv";

configDotenv()

const PATH = process.env.JSON_PATH || ''

try{
    const content = fs.readFileSync(PATH, 'utf-8');
    console.log(content);

    const jsonContent = JSON.parse(content)
    console.log(jsonContent);

    console.info(JSON.stringify(jsonContent));

    fs.writeFileSync('src/files/json.txt', JSON.stringify(jsonContent), {encoding: 'utf-8'})

}catch (e:any) {
    console.log(e.message)
}

console.log('-----------------')
console.log(process.env.JSON_CONTENT)
console.log('-----------------')
console.log( JSON.parse(process.env.JSON_CONTENT || '') )

