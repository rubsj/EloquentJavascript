/**
 * Make the Group class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.
  */
class GroupsIterator{
    constructor(groups){
        this.indx=0;
        this.groups=groups;
    }

    next(){
        if(this.indx===this.groups.data.length) return {done:true};
        let value =  this.groups.data[this.indx];
        this.indx++;
        return {value , done:false}

    }
}

module.exports = {
    GroupsIterator :GroupsIterator,
};