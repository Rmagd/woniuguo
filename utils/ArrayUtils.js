var deleteByIndex = function(e) {
    for (var t = e.dataArr, n = e.index; n < t.length; n++) n < t.length - 1 ? t[n] = t[n + 1] : t.pop();
    return console.log(t), t;
};

module.exports = {
    deleteByIndex: deleteByIndex
};