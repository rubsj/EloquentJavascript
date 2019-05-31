/*
const {request} = require('http');
let requestStream = request({
    hostname : 'eloquentjavascript.net',
    path : '/20_node.html',
    method : 'GET',
    headers : {Accept : 'text/html'}
}, resp =>{
    console.log("Server responded with status code",
        resp.statusCode , resp);
});

requestStream.end();*/
const {request} = require('http');
request(
    {hostname: 'localhost', port: 5000, method: 'POST'},
    resp => {
    resp.on('data', chunk=>{
        process.stdout.write(chunk.toString()); });
}).end('hello from client');