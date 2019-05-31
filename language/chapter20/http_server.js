/*
const http = require('http');
let server = http.createServer((req , resp) =>{
    resp.writeHead(200 , {'contenet-type': 'text/html'});
    resp.write(`
    <h1> Hello ! </h1>
    <p>you asked for <code>${req.url}</code></p>
    `);
    resp.end();
});
server.listen(5000);
console.log('listeninig to port 5000');*/

const {createServer} = require('http');
createServer((req , resp)=>{
    resp.writeHead(200 , {'Content-Type' : 'text/plain'});
    req.on('data' , chunk=>{
        resp.write(chunk.toString().toUpperCase());
    });
    req.on('end' , ()=>resp.end());
}).listen(5000);
console.log('listeninig to port 5000');