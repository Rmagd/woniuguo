var utils = {
    scene_decode: function(t) {
        var e = (t + "").split(","), r = {};
        for (var l in e) {
            var s = e[l].split(":");
            0 < s.length && s[0] && (r[s[0]] = s[1] || null);
        }
        return r;
    }
};

module.exports = utils;