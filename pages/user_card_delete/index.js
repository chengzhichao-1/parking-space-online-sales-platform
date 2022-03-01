// pages/user_card_delete/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: null,
    code: null,
    id: null
  },
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { name,code,id } = options;
    this.setData({
      name,
      code,
      id
    })
  },
  cardDelete(){
    wx.showModal({
      title: '银行卡解绑',
      content: '',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#0089ff',
      success: (result) => {
        if (result.confirm) {
          request({url:"/v1/bank/del/"+this.data.id})        
          setTimeout(() => {
            wx.showToast({
              title: '解绑成功',
              icon: 'none',
              image: '',
              duration: 1000,
              mask: true,
              success: (result) => {
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  });  
                }, 1000);
              }
            });
          }, 1500);
        }
      },
      fail: () => {},
      complete: () => {}
    });
      
  }
})