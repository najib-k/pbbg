/**
 *  
 * @param {number} max Excluded, ie: 3 -> [0,1,2].
 * @param {number} min Minimum returned value
 * @returns random number.
 */
function getRandomInt(max, min = 0) {
    return Math.max(Math.floor(Math.random() * max), min);
}

module.exports = {
    getRandomInt,
}