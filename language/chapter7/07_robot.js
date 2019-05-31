const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = Object.create(null);

    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }

    for (let [from, to] of edges.map(r => r.split('-'))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);
//console.log('roads' , roads);
//console.log('roadGraph',roadGraph);

/**
 * There’s the robot’s current location and the collection of undelivered parcels,
 * each of which has a current location and a destination address
 *
 * we don’t change this state when the robot moves but rather compute a new state for the situation after the move.
 */
var VillageState = class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            console.log(`Path does not exist from current location ${this.place} to destination ${destination}`);
            return this; // It first checks whether there is a road going from the current place to the destination, and if not, it returns the old state since this is not a valid move.
        } else {
            /**
             *  it also needs to create a new set of parcels—parcels that the robot is carrying (that are at the robot’s current place) need to be moved along to the new place. And parcels that are addressed to the new place need to be delivered—that is, they need to be removed from the set of undelivered parcels. The call to map takes care of the moving, and the call to filter does the delivering.
             */
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels); // it creates a new state with the destination as the robot’s new place.
        }

    }
};

let first = new VillageState("Post Office", [{place: "Post Office", address: "Alice's House"}, {
    place: "Post Office",
    address: "Town Hall"
}]);
let next = first.move("Alice's House");
//console.log(next.place);
//console.log(next.parcels);

function runRobot(state, robot, memory) {
    for (let turn = 0; ; turn++) {
        if (state.parcels.length === 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random()*array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};

runRobot(VillageState.random(), randomRobot);

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];
function routeRobot(state, memory) {
    if (!memory || memory.length === 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

runRobot(VillageState.random(),routeRobot );
