const {createServer} = require('http');
const url = require('url');
const path = require('path');

const methods = Object.create(null);
const baseDirectory = process.cwd();

function urlPath(urlP){
    let {pathname} = url.parse(urlP);
    let pathVal = path.resolve(decodeURIComponent(pathname).slice(1));
    if(pathVal !== baseDirectory && !pathVal.startsWith(baseDirectory+path.sep)){
        throw {status : 403 , body :'forbidden'};
    }
    return pathVal;
}

createServer((req , resp)=>{
    let handler = methods[req.method] || notAllowed;
    handler(req).catch(err =>{
        if(err.status !=null) return err;
        return {body : String(err), status : 500};
    })
        .then(({body , status=200 , type='text/plain'})=>{
            resp.writeHead(status , {'Content-Type' : type});
            if(body && body.pipe){
                body.pipe(resp);
            }else{
                resp.end(body);
            }
        });
}).listen(5000);

async function notAllowed(req){
    return {
        status : 405,
        body : `Method ${req.method} not allowed.`
    };
}