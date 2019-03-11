Page({
    data: {
        facePath: "http://img4.imgtn.bdimg.com/it/u=2222268564,1498447840&fm=27&gp=0.jpg",
        sexArr: [ {
            type: 0,
            value: "女"
        }, {
            type: 1,
            value: "男"
        } ],
        userSex: ""
    },
    chooseFace: function() {
        var t = this;
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
                        t.setData({
                            facePath: a
                        });
                    }
                });
            }
        });
    },
    userChangeSex: function(e) {
        var a = e.detail.value;
        this.setData({
            userSex: this.data.sexArr[a]
        });
    }
});