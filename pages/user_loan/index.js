// pages/user_loan/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loan_money: 100000,
    currentChoose: 3
  },
  click1(){
    this.setData({
      currentChoose: 3
    })
  },
  click2(){
    this.setData({
      currentChoose: 6
    })
  },
  click3(){
    this.setData({
      currentChoose: 12
    })
  },
  click4(){
    wx.showToast({
      title: '已申请',
      icon: 'success',
      image: '',
      duration: 1000,
      mask: true,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {
        wx.navigateBack({
          delta: 1,
        });
      }
    });
  }
  
})