import { request } from "../../request/index.js";
Page({
  data: {
    money: 20000,
    isCheck: false,
    name: null,
    phone: null,
    id: null, // 车位的编号(唯一)
    code: null, // 车位的名称(不唯一)
    money: null, // 总金额
    parkName: null // 车位分区名字
  },
  onLoad(){
    this.setData({
      name: wx.getStorageSync("name"),
      phone:wx.getStorageSync("phone")
    })
  },
  onShow(){
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { id,code,money,parkName } = options;
    this.setData({
      id,
      code,
      money,
      parkName
    })
  },
  checkboxChange(){
    this.setData({
      isCheck: !this.data.isCheck
    })
  },
  async pay(){
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
    await wx.requestSubscribeMessage({
      tmplIds:['31GIk5cf9224vYt08Jm8MplSedzCFZdqewHnKby8xx0','vNJWWBSJgnnmZqqoQZghkpCSnpLPozQXxqHxCstMfiM'],
      // tmplIds:['vNJWWBSJgnnmZqqoQZghksyGfGmPCNTByoRb0ZPVugE'],
      success(res){
        console.log('授权成功',res);
      },
      fail(res){
        console.log('授权失败',res.errMsg);
        console.log(res.errCode);
      }
    })
    // this.sendMessage()
    // this.sendMessage2()

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
              request({url:"/v1/pay/deposit/"+that.data.id,method:"put"});
              setTimeout(() => {
                wx.switchTab({
                  url: '/pages/open/index'
                });  
              }, 2000);
            },
            complete: () => {
              that.sendMessage()
              that.sendMessage2()
            }
            
          });
          return ;
        } else if (res.cancel) {
            
        }
      }
    })
  },
  async sendMessage(){
    const access_token = wx.getStorageSync('access_token');
      
    const openId = wx.getStorageSync('openid');
    let that = this
    let d = new Date();
    let currentTime= d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()+' '+d.getHours()+':'+(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes())+':'+(d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds())
    await wx.request({
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
            "value": that.data.money*0.20 + "元"
          },
          "thing5": {
            "value": that.data.parkName
          },
          "thing6": {
            "value": that.data.name
          },
          "thing10": {
            "value": "定金"
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
  },
  async sendMessage2(){
    const access_token = wx.getStorageSync('access_token');
      
    const openId = wx.getStorageSync('openid');
    let that = this
    console.log(2);
    await wx.request({
      url: `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`, //仅为示例，并非真实的接口地址
      data: {
        "touser": openId,
        "template_id": "vNJWWBSJgnnmZqqoQZghkpCSnpLPozQXxqHxCstMfiM",
        "miniprogram_state":"developer",
        "lang":"zh_CN",
        "data":{
          "thing1": {
            "value": that.data.parkName + that.data.code + "车位签约通知"
          },
          "thing5": {
            "value": "个人中心-我的订单-待签约中进行签约"
          }
        }
      },
      method: 'post',
      header: {'Content-Type': 'application/json' },
      success(res) {
        console.log("res",res)
        console.log(3);
      },
      fail(error){
        console.log(4);
        console.log('sendMessage');
        console.log("error",error)
      }
    })
  }
})