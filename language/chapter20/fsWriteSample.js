const fs = require('fs');

let lyrics = `But still I\'m having memories of high speeds when the cops crashed
    As I laugh, pushin the gas while my Glocks blast
    We was young and we was dumb but we had heart`;

// write to a new file named 2pac.txt
function writeToFile(destPath){
    fs.writeFile(destPath, lyrics, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log('Lyric saved!');
    });
}

writeToFile('C:\\Projects\\JavaScriptExamples\\EloquentJavascript\\language\\chapter20\\2pac.txt');
