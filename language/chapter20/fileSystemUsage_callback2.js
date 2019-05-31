const {readFile, writeFile} = require('fs');

//TODO when redFile is called directly from the file the srcPath is picked from the current file's location i.e. C:\Projects\JavaScriptExamples\EloquentJavascript\language\chapter20\
// but when read File is wrapped inside another function the srcPAth becomes 'C:\Projects\JavaScriptExamples\sample.txt' ..unable to provide the
// correct relative path ..find how to do it

let _data = 'temp';

//https://stackoverflow.com/questions/17645478/node-js-how-to-read-a-file-and-then-write-the-same-file-with-two-separate-functi

function getFileContent(srcPath, callback) {
      readFile(srcPath, 'utf8', function (err, text) {
          console.log(`inside the callback for reading file the file srcpath is ${srcPath}`);
          console.log(`_data inside readFile ${_data}`);
            if (err) throw err;
          _data = text;
            callback(text);
        }
    );
}

function copyFileContent(savPath, srcPath) {
    getFileContent(srcPath, function(text) {
        console.log('assigning the value outside of callback inside the func :  ', _data);
        console.log(`destination path is : ${savPath}`);
        writeFile (savPath, text, function(err) {
            console.log(`_data inside write ${_data}`);
            if (err) throw err;
            console.log(`wrote file with data ${text}`);
            console.log('complete');
        });
    });
}

copyFileContent( 'C:\\Projects\\JavaScriptExamples\\EloquentJavascript\\language\\chapter20\\graffitti.txt', 'C:\\Projects\\JavaScriptExamples\\EloquentJavascript\\language\\chapter20\\sample.txt');

