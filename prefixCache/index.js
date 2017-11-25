/*
    File exists so cache can be updated from various places.
    E.g. it should be updated from msgHandler on first command run
    and from setprefix command.
*/

let cache = new Map();
module.exports = cache;