const fs = require('fs');
//const {readFile, writeFile} = require('fs');

function readFilePromise(srcPath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(srcPath, 'utf8', function (err, text) {
            if (err) reject(err);
            resolve(text);
        })
    })
}

function writePathPromise(savPath, text) {
    return new Promise((resolve, reject) => {
        fs.writeFile(savPath, text, err => {
            if (err) reject(err);
            resolve('write successful');
        });
    })
}

readFilePromise('C:\\Projects\\JavaScriptExamples\\EloquentJavascript\\language\\chapter20\\sample.txt')
    .then(result => {
    result += 'read in promise 1 approach';
    return writePathPromise('C:\\Projects\\JavaScriptExamples\\EloquentJavascript\\language\\chapter20\\graffitti.txt', result);
}).then(data => console.log(data)).catch(err => console.log(err));