/**
 *  
 * @param {number} max Excluded, ie: 3 -> [0,1,2].
 * @param {number} min Added to final result.
 * @returns random number.
 */
function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * max) + min;
}

module.exports = {
    getRandomInt,
}