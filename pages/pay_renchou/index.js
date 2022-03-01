import { request } from "../../request/index.js";
Page({
  data: {
    money: 13000,
    isCheck: false,
    parkName: null,
    name: null,
    phone: null,
    park_id: 0
  },
  onLoad(){
    // wx.openSetting({
    //   withSubscriptions:true,
    //   success: (result) => {
    //     wx.getSetting({
    //       withSubscriptions:true,
    //       success: (result) => {
            
    //       },
    //       fail: () => {},
    //       complete: () => {}
    //     });
          
    //   },
    //   fail: () => {},
    //   complete: () => {}
    // });
    wx.requestSubscribeMessage({
      tmplIds:['31GIk5cf9224vYt08Jm8MplSedzCFZdqewHnKby8xx0'],
      success(res){
        console.log('授权成功',res);
      },
      fail(res){
        console.log('授权失败',res.errMsg);
        console.log(res.errCode);
      }
    })
  },
  onShow(){
    if(!wx.getStorageSync("name")){
      wx.navigateTo({
        url: '/pages/identification/index'
      });
    }
    
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { park_id,money,parkName } = options;
    this.setData({
      park_id,
      money,
      parkName,
      name: wx.getStorageSync("name"),
      phone: wx.getStorageSync("phone")
    })
  },
  checkboxChange(){
    this.setData({
      isCheck: !this.data.isCheck
    })
  },
  pay(){
    if(this.data.isCheck==false){
      wx.showToast({
        title: '请同意协议',
        icon: 'error',
        duration: 1000,
        mask: false,
        success: (result) => {
          
        }
      });
      return ;
    }
    wx.requestSubscribeMessage({
      tmplIds:['31GIk5cf9224vYt08Jm8MplSedzCFZdqewHnKby8xx0'],
      success(res){
        console.log('授权成功',res);
      },
      fail(res){
        console.log('授权失败',res.errMsg);
        console.log(res.errCode);
      }
    })
    let that = this;
    wx.showModal({
      title: '支付确认',
      // content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000,
            mask: false,
            success: (result) => {
              request({url:"/v1/pay/recognize/"+that.data.park_id,method:"put"});
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/yaohao/index?id='+that.data.park_id,
                  success: (result) => {
                    
                  }
                });  
              }, 2000);
            },
            complete: () => {
              that.sendMessage()
              // wx.requestSubscribeMessage({
              //   tmplIds:['31GIk5cf9224vYt08Jm8MplSedzCFZdqewHnKby8xx0'],
              //   success(res){
              //     console.log('授权成功',res);
              //   },
              //   fail(res){
              //     console.log('授权失败',res);
              //   }
              // })
            }
          });
        } else if (res.cancel) {
          
        }
      }
    })
    
  },
  sendMessage(){
    const access_token = wx.getStorageSync('access_token');
      
    const openId = wx.getStorageSync('openid');
    let that = this
    let d = new Date();
    let currentTime= d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes())+':'+(d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds())
    wx.request({
      url: `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`, //仅为示例，并非真实的接口地址
      data: {
        "touser": openId,
        "template_id": "31GIk5cf9224vYt08Jm8MplSedzCFZdqewHnKby8xx0",
        "miniprogram_state":"developer",
        "lang":"zh_CN",
        "data":{
          "time2": {
            "value": currentTime
          },
          "amount3": {
            "value": that.data.money*0.05 + "元"
          },
          "thing5": {
            "value": that.data.parkName + "车位"
          },
          "thing6": {
            "value": that.data.name
          },
          "thing10": {
            "value": "认筹金"
          }
        }
      },
      method: 'post',
      header: {'Content-Type': 'application/json' },
      success(res) {
        console.log("res",res)
      },
      fail(error){
        console.log('sendMessage');
        console.log("error",error)
      }
    })
  }
})