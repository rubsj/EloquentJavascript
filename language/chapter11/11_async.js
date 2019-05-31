var bigOak = require('./crow-tech').bigOak;
var defineRequestType = require('./crow-tech').defineRequestType;
var everywhere = require('./crow-tech').everywhere;


function storage(nest, name) {
    return new Promise(resolve => {
        nest.readStorage(name, result => resolve(result));
    });
}

storage(bigOak, "enemies").then(val => console.log("got", val));
var Timeout = class Timeout extends Error {
}

function request(nest, target, type, content) {
    return new Promise((resolve, reject) => {
        let done = false;

        function attempt(n) {
            nest.send(target, type, content, (failed, value) => {
                done = true;
                if (failed) {
                    reject(failed);
                } else {
                    resolve(value);
                }
            });
            setTimeout(() => {
                if (done) {
                    return;
                } else if (n < 3) {
                    attempt(n + 1);
                } else {
                    reject(new Timeout("timed out"));
                }
            }, 250);
        }

        attempt(1);
    });
}


function requestType(name, handler) {
    defineRequestType(name, (nest, content, source, callback) => {
        try {
            Promise.resolve(handler(nest, content, source)).then(response => callback(null, response), failure => callback(failure));
        } catch (exception) {
            callback(exception);
        }
    });
}

requestType("ping", () => "pong");

function availableNeighbors(nest) {
    let requests = nest.neighbors.map(neighbor => {
        return request(nest, neighbor, "ping").then(() => true, () => false);
    });

    return Promise.all(requests).then(result => {
        return nest.neighbors.filter((_, i) => result[i]);
    });

}

everywhere(nest => {
    nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
    nest.state.gossip.push(message);
    for (let neighbor of nest.neighbors) {
        if (neighbor === exceptFor) continue;
        request(nest, neighbor, "gossip", message);
    }
}

requestType("gossip", (nest, message, source) => {
    if (nest.state.gossip.includes(message)) return;
    console.log(`${nest.name} received gossip '${message}' from '${source}'`);
    sendGossip(nest, message, source);
});

requestType("connections", (nest, {name, neighbors}, source) => {
    let connections = nest.state.connections;
    if (JSON.stringify(connections.get(name)) === JSON.stringify(neighbors)) return;
    connections.set(name, neighbors);
    broadcastConnections(nest, name, source);
});

function broadcastConnections(nest, name, exceptFor = null) {
    for (let neighbor of nest.neighbors) {
        if (neighbor === exceptFor) continue;
        request(nest, neighbor, "connections", {
            name,
            neighbors: nest.state.connections.get(name),
        });
    }
}

everywhere(nest => {
    nest.state.connections = new Map;
    nest.state.connections.set(nest.name, nest.neighbors);
    broadcastConnections(nest, nest.name);
});

function findRoute(from, to, connections) {
    let work = [{at: from, via: null}];
    for (let i = 0; i < work.length; i++) {
        let {at, via} = work[i];
        for (let next of connections.get(at)) {
            if (next === to) return via;
            if (!work.some(w => w.at === next)) {
                work.push({at: next, via: via || next});
            }
        }
    }

    return null;
}

function routeRequest(nest, target, type, content) {
    if (nest.neighbors.includes(target)) {
        return request(nest, target, type, content);
    } else {
        let via = findRoute(nest.name, target, nest.state.connections);
        if (!via) throw new Error(`No route to ${target}`);
        return request(nest, via, "route", {target, type, content});
    }
}

requestType("route", (nest, {target, type, content}) => {
    return routeRequest(nest, target, type, content);
});

requestType("storage", (nest, name) => storage(nest, name));

function network(nest) {
    return Array.from(nest.state.connections.keys());
}

/*function findInStorage(nest, name) {
    return storage(nest, name).then(found => {
        if (found != null) return found;
        else return findInRemoteStorage(nest, name);
    });
}


function findInRemoteStorage(nest, name) {
    let sources = network(nest).filter(n => n != nest.name);

    function next() {
        if (sources.length == 0) {
            return Promise.reject(new Error("Not Found"));
        } else {
            let source = sources[Math.floor(Math.random() * sources.length)];
            sources = sources.filter(n => n != source);
            return routeRequest(nest, source, "storage", name).then(val => val != null ? val : next(), next);
        }
    }

    return next();
}*/

async function findInStorage(nest, name) {
    let local = await storage(nest, name);
    if (local != null) return local;

    let sources = network(nest).filter(n => n != nest.name);
    while (sources.length > 0) {
        let source = sources[Math.floor(Math.random() * sources.length)];
        sources = sources.filter(n => n != source);
        try {

            let found = await routeRequest(nest, source, "storage", name).then(val => val != null ? val : next(), next);
            if (found != null) return found;
        } catch (_) {

        }
    }

    throw new Error("Not found");
}

async function chicks(nest, year) {
    let list = "";
    await Promise.all(network(nest).map(async name => {
        list += `${name}: ${
            await anyStorage(nest, name, `chicks in ${year}`)
            }\n`;
    }));
    return list;
}

/**************************************************************************************************/
let fifteeen = Promise.resolve(15);
fifteeen.then(val => console.log(`got ${val}`));

new Promise((_, reject) => reject(new Error('fail')))
    .then(val => console.log("Handler 1", val))
    .catch(reason => {
        console.log("caught failure " + reason);
        // return nothing  -> this will go to then success handler 2
        // return new Error("error); ->this will go to then success Spring handler 2 with error stacktrace
        // throw new Error("catch throwing error"); -> this will got to reject handler 2 with error stacktrace
        return Promise.reject("rejected promise from catch"); // -> this will go to reject ahdnler 2 without error stacktrace

    }).then(val => console.log("Hnadler 2", val), val => console.log("handler 2 got error", val));

/**************************************************************************************************/



