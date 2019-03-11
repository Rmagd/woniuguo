Page({
    data: {
        facePath: ""
    },
    chooseFace: function() {
        var s = this;
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                var a = e.tempFilePaths;
                wx.saveFile({
                    tempFilePath: a[0],
                    success: function(e) {
                        var a = e.savedFilePath;
                        s.setData({
                            facePath: a
                        });
                    }
                });
            }
        });
    }
});