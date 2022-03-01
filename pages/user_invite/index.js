// pages/user_invite/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onShareAppMessage:function(res) {
    if (res.from == 'button') {
        console.log(res.target, res)
    }
    return {
      title:'快来选车位,邀请好友领取现金红包',
      path:'/pages/index/index',//这里是被分享的人点击进来之后的页面
      imageUrl: '../../icons/index19.png'//这里是图片的路径
    }
  }
})