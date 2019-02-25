/**
 * The standard JavaScript environment provides another data structure called Set. Like an instance of Map, a set holds a collection of values. Unlike Map, it does not associate other values with those—it just tracks which values are part of the set. A value can be part of a set only once—adding it again doesn’t have any effect.

 Write a class called Group (since Set is already taken). Like Set, it has add, delete, and has methods. Its constructor creates an empty group, add adds a value to the group (but only if it isn’t already a member), delete removes its argument from the group (if it was a member), and has returns a Boolean value indicating whether its argument is a member of the group.

 Use the === operator, or something equivalent such as indexOf, to determine whether two values are the same.

 Give the class a static from method that takes an iterable object as argument and creates a group that contains all the values produced by iterating over it.
 */
var GroupsIterator = require('./asgnmt_groupsIterator.js').GroupsIterator;

class Group {
    constructor() {
        this.data = [];
    }

    add(val) {
        if (!this.has(val)) {
            this.data.push(val);
        }
    }

    delete(val) {
        /*
          let foundIndex = this.data.findIndex(v => v === val);
            if (foundIndex >= 0) {
                this.data.splice(foundIndex, 1);
            }
            return this.data;
         */
        this.data = this.data.filter(v => v !== val);
    }


    has(val) {
        //   return !!this.data.find(v => v === val);
        return this.data.includes(val);
    }

    static from(itrObj) {
        let group = new Group();
        itrObj.forEach(val => group.add(val));
        return group;
    }
}

let group = Group.from([10, 20]);
console.log(group);
console.log(group.has(10)); // → true
console.log(group.has(30)); // → false
group.add(10);
console.log(group);
group.delete(10);
console.log(group);
console.log(group.has(10)); // → false

Group.prototype[Symbol.iterator] = function () {
    return new GroupsIterator(this);
  //  return this.data[Symbol.iterator](); //this works but not wanted in assignment
};

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
}

// → a
// → b
// → c