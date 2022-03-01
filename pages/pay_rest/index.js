// pages/pay_rest/index.js
import { request } from "../../request/index.js";
Page({
  data: {
    totalMoney: 120000.00,
    divide12:0,
    divide24:0,
    divide36:0,
    anjie: 0,
    currentValue: 1,
    currentDivide: 1,
    isCheck: false,
    lastMoney: 0,
    way: 0,
    stageNum: 0
  },
  onShow(){
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { parkingId,partitionName,code,price } = options;
    this.setData({
      parkingId,
      partitionName,
      code,
      totalMoney:price
    })
    let anjie = (this.data.totalMoney*(0.05/12)*(Math.pow((1+0.05/12),12)/(Math.pow((1+0.05/12),12)-1))).toFixed(2); 
    this.setData({
      divide12: this.calculate(12),
      divide24: this.calculate(24),
      divide36: this.calculate(36),
      anjie,
      lastMoney: this.data.totalMoney
    })
  },
  radioChange(e){
    let lastMoney;
    if(e.detail.value==1){
      lastMoney = this.data.totalMoney;
      this.data.way = 0
    }else if(e.detail.value==2&&this.data.currentDivide==1){
      lastMoney = this.data.divide12;
      this.data.way = 1
      this.data.stageNum = 12
    }else if(e.detail.value==2&&this.data.currentDivide==2){
      lastMoney = this.data.divide24;
      this.data.way = 1
      this.data.stageNum = 24
    }else if(e.detail.value==2&&this.data.currentDivide==3){
      lastMoney = this.data.divide36;
      this.data.way = 1
      this.data.stageNum = 36
    }else if(e.detail.value==3){
      lastMoney = this.data.anjie;
      this.data.way = 2
      this.data.stageNum = 12
    }
    this.setData({
      currentValue: e.detail.value,
      lastMoney
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  checkboxChange(){
    this.setData({
      isCheck: !this.data.isCheck
    })
  },
  divideClick(event){
    let lastMoney;
    if(event.currentTarget.dataset.divide==1){
      lastMoney = this.data.divide12;
      this.data.stageNum = 12
    }
    else if(event.currentTarget.dataset.divide==2){
      lastMoney = this.data.divide24;
      this.data.stageNum = 24
    }
    else if(event.currentTarget.dataset.divide==3){
      lastMoney = this.data.divide36;
      this.data.stageNum = 36
    }
    
    this.setData({
      currentDivide: event.currentTarget.dataset.divide,
      lastMoney
    })
  },
  calculate(n){
    let rate;
    if(n==12) rate = 0.035;
    else if(n==24) rate = 0.068;
    else rate = 0.09; 
    return (this.data.totalMoney/n+this.data.totalMoney*rate/n).toFixed(2);
  },
  pay(){
    if(this.data.isCheck==false){
      wx.showToast({
        title: '请同意协议',
        icon: 'error',
        duration: 1000,
        mask: false
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
    this.sendMessage()

    let that = this

    let data = {}
    data["parkingId"] = this.data.parkingId
    data["way"] = this.data.way
    if(this.data.way!==0){
      data["stageNum"]=this.data.stageNum
    }

    wx.showModal({
      title: '支付确认',
      // content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          let res = request({url:"/v1/pay/rest",data:data,method:"put"});
          
          setTimeout(() => {
            console.log(res);
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 2000,
              mask: true,
              success: (result) => {
                wx.navigateBack({
                  delta: 1
                });
              }
            });
            return ;  
          }, 1500);
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
    
    // console.log(this.data.currentValue);
    // console.log(this.data);
    let way=''
    if(this.data.currentValue==1){
      console.log(1);
      way = '全额付款'
    }else if(this.data.currentValue==2){
      console.log(2);
      way = '分期付款'
      if(this.data.currentDivide==1){
        way+='-12期，您应在每月按时分期付款哦'
      }else if(this.data.currentDivide==2){
        way+='-24期，您应在每月按时分期付款哦'
      }else{
        way+='-36期，您应在每月按时分期付款哦'
      }
    }else if(this.data.currentValue==3){
      console.log(3);
      way = '按揭付款-12期，您应在每月按时分期付款哦'
    }

    console.log(this.data.currentValue);
    console.log(this.data);
    
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
            "value": that.data.lastMoney + "元"
          },
          "thing5": {
            "value": that.data.partitionName + that.data.code + "车位"
          },
          "thing6": {
            "value": wx.getStorageSync('name')
          },
          "thing10": {
            "value": "尾款，支付方式："+way
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