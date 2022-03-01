// pages/identification/index.js
import { request } from "../../request/index.js";
Page({
  data: {
    time: 0,
    name: null,
    id: null,
    phone: null,
    code: null,
    ischeck:false
  },
  countDown(){
    if(this.data.name==null||this.data.name.trim()==''){
      wx.showToast({
        title: '请输入姓名',
        icon: 'error',
        duration: 1000,
        mask: false,
        success: (result) => {
          
        }
      });
      return ;
    }
    if(this.data.id==null||this.data.id.trim()==''){
      wx.showToast({
        title: '请输入身份证',
        icon: 'error',
        duration: 1000,
        mask: false,
        success: (result) => {
          
        }
      });
      return ;
    }
    if(this.data.phone==null||this.data.phone.trim()==''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'error',
        duration: 1000,
        mask: false,
        success: (result) => {
          
        }
      });
      return ;
    }
    if(this.data.time==0){
      let time = 60;
      let timer = setInterval(() => {
        time--;
        this.setData({
          time
        })
        if(time==0){
          clearInterval(timer);
        }
      }, 1000);  
    }

    request({url:'/v1/user/sms/'+this.data.phone})
  },
  identify(){
    if(this.data.name==null||this.data.name.trim()==''){
      wx.showToast({
        title: '请输入姓名',
        icon: 'error',
        duration: 1000,
        mask: false,
        success: (result) => {
          
        }
      });
      return ;
    }
    if(this.data.id==null||this.data.id.trim()==''){
      wx.showToast({
        title: '请输入身份证',
        icon: 'error',
        duration: 1000,
        mask: false,
        success: (result) => {
          
        }
      });
      return ;
    }
    if(this.data.phone==null||this.data.phone.trim()==''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'error',
        duration: 1000,
        mask: false,
        success: (result) => {
          
        }
      });
      return ;
    }
    if(this.data.time==0){
      let time = 60;
      let timer = setInterval(() => {
        time--;
        this.setData({
          time
        })
        if(time==0){
          clearInterval(timer);
        }
      }, 1000);  
    }
    if(this.data.ischeck==false){
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
  },
  checkboxChange(){
    this.setData({
      ischeck: !this.data.ischeck
    })
  },
  async formSubmit(e) {
    if(this.data.name==null||this.data.name.trim()==''){
      wx.showToast({
        title: '请输入姓名',
        icon: 'error',
        duration: 1000,
        mask: false,
        success: (result) => {
          
        }
      });
      return ;
    }
    if(this.data.id==null||this.data.id.trim()==''){
      wx.showToast({
        title: '请输入身份证',
        icon: 'error',
        duration: 1000,
        mask: false,
        success: (result) => {
          
        }
      });
      return ;
    }
    if(this.data.phone==null||this.data.phone.trim()==''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'error',
        duration: 1000,
        mask: false,
        success: (result) => {
          
        }
      });
      return ;
    }
    if(this.data.time==0){
      let time = 60;
      let timer = setInterval(() => {
        time--;
        this.setData({
          time
        })
        if(time==0){
          clearInterval(timer);
        }
      }, 1000);  
    }
    if(this.data.ischeck==false){
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
    let data = {
      "backend": false,
      "captcha": this.data.code,
      "name": this.data.name,
      "phone": this.data.phone
    }
    const res = await request({url:"/v1/user/login",data: data, method: "post"});
    console.log(res);
    wx.setStorage({
      key: 'token',
      data: res
    });

    wx.setStorage({
      key: 'name',
      data: this.data.name
    });

    wx.setStorage({
      key: 'phone',
      data: this.data.phone
    });

    wx.showToast({
      title: '认证成功!',
      icon: 'success',
      image: '',
      duration: 2000,
      mask: true,
      success: (result) => {
        setTimeout(() => {
          wx.navigateBack({
            delta: 1,  // 返回上一级页面。
          })     
        }, 2000);   
      },
      fail: () => {},
      complete: () => {}
    });
      
    
    
      
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

})