import { request } from "../../request/index.js";
Page({
  data:{
    locateCity: '',
    QueryParams:{
      // "area": "",
      // "city": "杭州市",
      // "current": 1,
      // "hasDiscount": true,
      // "highestPrice": 500000,
      // "isOpen": true,
      // "lowestPrice": 100000,
      // "name": "",
      "size": 4
    },
  },
  onShow(){
    // wx.setStorage({
    //   key: 'token',
    //   data: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoi5byg5LiJIiwicGhvbmUiOiIxODE1NzczMjM3NyIsImlkIjo1LCJleHAiOjE5NDk3MDczMzB9.a10xlbKHlT_2cnvw3aZ-DiXEmflXs8wWlG8qriTTzi8'
    // });
    // wx.setStorage({
    //   key: 'name',
    //   data: '张三'
    // });
    // wx.setStorage({
    //   key: 'phone',
    //   data: '18157732377'
    // });
    // 获取access_token
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      data: {
        'grant_type':'client_credential',
        'appid': 'wxeeba4a127980e789',
        'secret': '0639d17abd63731a76295bb0194c7096'
      },
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log();
        wx.setStorage({
          key: 'access_token',
          data: result.data.access_token
        });
      },
      fail: () => {},
      complete: () => {}
    });
    // 获取openId
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              'appid': 'wxeeba4a127980e789',
              'secret': '0639d17abd63731a76295bb0194c7096',
              'js_code': res.code,
              'grant_type': 'authorization_code',
              'connect_redirect': 1
            },
            success: (result) => {
              wx.setStorage({
                key: 'openid',
                data: result.data.openid
              });
            },
            fail:(err) => {
              console.log(err);
            }

          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
        
    this.getParkItems();
    let that = this,
      cityOrTime = wx.getStorageSync('locatecity') || {},
      time = new Date().getTime(),
      city = '';
    
      that.setData({
        locateCity: cityOrTime.city
      })
    

    this.getCity();
  },
  async getCity(){
    await setInterval(() => {
      const city = wx.getStorageSync('city') || '';
      this.setData({
        city
      })
    }, 1000);
  },
  scroll1(){
    wx.createSelectorQuery().select('.index_hot').boundingClientRect(res => {
      // 到这里，我们可以从res中读到class为bb4的top，即离顶部的距离（px）
      // 2使用wx.pageScrollTo()将页面滚动到对应位置
      wx.pageScrollTo({
        scrollTop: res.top, // 滚动到的位置（距离顶部 px）
        duration: 1000 //滚动所需时间 如果不需要滚动过渡动画，设为0（ms）
      })
    }).exec()      
  },
  scroll2(){
    wx.createSelectorQuery().select('.index_recommend').boundingClientRect(res => {
      // 到这里，我们可以从res中读到class为bb4的top，即离顶部的距离（px）
      // 2使用wx.pageScrollTo()将页面滚动到对应位置
      wx.pageScrollTo({
        scrollTop: res.top, // 滚动到的位置（距离顶部 px）
        duration: 1000 //滚动所需时间 如果不需要滚动过渡动画，设为0（ms）
      })
    }).exec()      
  },
  scroll3(){
    wx.createSelectorQuery().select('.index_show').boundingClientRect(res => {
      // 到这里，我们可以从res中读到class为bb4的top，即离顶部的距离（px）
      // 2使用wx.pageScrollTo()将页面滚动到对应位置
      wx.pageScrollTo({
        scrollTop: res.top, // 滚动到的位置（距离顶部 px）
        duration: 1000 //滚动所需时间 如果不需要滚动过渡动画，设为0（ms）
      })
    }).exec()      
  },
  async getParkItems(){
    const res = await request({url:"/v1/community/list",data: this.data.QueryParams, method: "post"});
    // console.log(res.list);
    for(let i=0; i<res.list.length; i++){  
      res.list[i]["closeDate2"] = res.list[i].closeDate.split(" ")[0]
      res.list[i]["openDate2"] = res.list[i].openDate.split(" ")[0]
      res.list[i]["recognizeDate2"] = res.list[i].recognizeDate.split(" ")[0]
    }
    this.setData({
      list: res.list
    })
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
  },
  gotoOpen(){
    console.log(3);
    wx.navigateTo({
      url: '/pages/park_details/index?park_id=1',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });      
  }
})