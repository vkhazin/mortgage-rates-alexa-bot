module.exports.getLowestRate = function (items) {
    var id = 0;
    var lowest = items[0].rate;
    var tmp;
    for (var i = 0; i < items.length; i++) {
        tmp = items[i].rate;
        if (tmp < lowest) {
            id = i;
            lowest = tmp;
        }
    }
    return id;
}