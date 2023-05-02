/**
 * Sort a list by "createdAt" parameter, most recent first.
 * 
 * @param {Array} list List to sort.
 * @param {Boolean} orderDESC if True, will order by descending, else ascending order.
 * @returns the sorted list
 */
function orderByDate(list, orderDESC) {
    list.sort((a, b) => {
        let compare = 0;
            if (a.createdAt < b.createdAt) {
              compare = -1;
            }
            if (a.createdAt > b.createdAt) {
              compare = 1;
            }
            return orderDESC ? compare : compare * -1;
    })
    return list;
}

module.exports = {
    orderByDate
}