/**
 *  
 * @param {number} max Excluded, ie: 3 -> [0,1,2].
 * @param {number} min Minimum returned value
 * @returns random number.
 */
function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomFloat(max, min = 0) {
    return ((Math.random() * (max - min)) + min).toFixed(2);
}


module.exports = {
    getRandomInt,
    getRandomFloat,
}