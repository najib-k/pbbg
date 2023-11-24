/**
 * returns the first alive memeber of the first group that's not an ally
 * @param {*} caster 
 * @param {*} groups 
 * @returns 
 */
function selectTargetEnnemyAny(caster, groups) {
    return groups.filter((g, idx) => idx !== caster.gid).map((g) => g.filter((p) => {
        const {dead = false} = p;
        return !dead;
    }))[0][0];
}

module.exports = {
    selectTargetEnnemyAny,
}