const fsp = require("fs").promises;

let _data = 'temp';

async function readAndWriteFile(srcPath, destPath) {
    try {
        _data = await fsp.readFile(srcPath, 'utf8');
        console.log('after reading the file : ', _data);
        _data += '  change something before write';
        await fsp.writeFile(destPath, _data);
        console.log('wrote to the file');
    } catch (err) {
        console.log(err);
        throw err;
    }

}

readAndWriteFile('C:\\Projects\\JavaScriptExamples\\EloquentJavascript\\language\\chapter20\\sample.txt',
    'C:\\Projects\\JavaScriptExamples\\EloquentJavascript\\language\\chapter20\\graffitti.txt').catch(err => console.log(err));

