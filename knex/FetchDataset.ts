import axios from "axios";
import * as Fs from "fs";
const params = require('params-cli');
const extract = require('extract-zip')

async function fetchDataset () {
    if (!params.has('token')) {
        console.log(
            'A data.world API token parameter must be passed to the script.' +
            '\nEx: npm run fetch:dataset token=your_token\n'
        )
        process.exit(1);
    }


    const instance = axios.create({
        baseURL: 'https://api.data.world/v0/download/cervus/sumo-japan',
        headers: {'Authorization': 'Bearer ' + params.get('token')},
        responseType: "stream"
    });

    const response = await instance.get('/');

    const path = `${__dirname}/seeds/dataset.zip`;

    const writer = Fs.createWriteStream(path);
    response.data.pipe(writer);

    writer.on('finish', async () => {
        await extract(path, { dir: `${__dirname}/seeds/` });
        Fs.unlinkSync(path);
        console.log('Extraction complete');
    })
}

fetchDataset();
