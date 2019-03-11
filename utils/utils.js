function formatTime(t) {
    var r = t.getFullYear(), e = t.getMonth() + 1, a = t.getDate(), o = t.getHours(), m = t.getMinutes(), n = t.getSeconds();
    return [ r, e, a ].map(formatNumber).join("/") + " " + [ o, m, n ].map(formatNumber).join(":");
}

function formatData(t) {
    var r = t.getFullYear(), e = t.getMonth() + 1, a = t.getDate();
    return t.getHours(), t.getMinutes(), t.getSeconds(), [ r, e, a ].map(formatNumber).join("-");
}

function formatNumber(t) {
    return (t = t.toString())[1] ? t : "0" + t;
}

function objectToUrlParams(t) {
    var r = "";
    for (var e in t) r += "&" + e + "=" + t[e];
    return r.substr(1);
}

module.exports = {
    formatTime: formatTime,
    objectToUrlParams: objectToUrlParams,
    formatData: formatData
};