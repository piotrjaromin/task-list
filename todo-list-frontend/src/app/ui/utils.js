'use strict';


function sortByDone (t1, t2) {
    console.log("sorting ", t1.done, t2.done);

    if ( t1.done && !t2.done) {
        return 1;
    }

    if ( !t1.done && t2.done) {
        return -1;
    }

    return 0;
}

module.exports.sortByDone = sortByDone;