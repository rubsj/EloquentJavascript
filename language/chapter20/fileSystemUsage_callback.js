const {readFile, writeFile} = require('fs');

//TODO when redFile is called directly from the file the srcPath is picked from the current file's location i.e. C:\Projects\JavaScriptExamples\EloquentJavascript\language\chapter20\
// but when read File is wrapped inside another function the srcPAth becomes 'C:\Projects\JavaScriptExamples\sample.txt' ..unable to provide the
// correct relative path ..find how to do it

let _data = 'temp';

//https://stackoverflow.com/questions/17645478/node-js-how-to-read-a-file-and-then-write-the-same-file-with-two-separate-functi
function readAndWriteFile(srcPath, destPath) {

    readFile(srcPath, 'utf8', (error, text) => { //'../README.md'
        console.log(`inside the callback for reading file the file srcpath is ${srcPath}`);
        console.log(`_data inside readFile ${_data}`);
        if (error) throw error;
        _data = text;
        console.log('assigning the value outside of callback inside the func :  ', _data);
        console.log(`destination path is : ${destPath}`);
        writeFile( destPath, _data, err => {
            console.log(`_data inside write ${_data}`);
            if (err) console.log(`failed to write file :${err}`);
            console.log(`wrote file with data ${_data}`);
        });
    });


}

readAndWriteFile('C:\\Projects\\JavaScriptExamples\\EloquentJavascript\\language\\chapter20\\sample.txt' , 'C:\\Projects\\JavaScriptExamples\\EloquentJavascript\\language\\chapter20\\graffitti.txt');


console.log('assigning the value outside of callback: ', _data);

