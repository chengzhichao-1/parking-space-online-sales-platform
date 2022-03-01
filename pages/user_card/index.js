// pages/user_card/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    card:[
      {
        id: 0,
        name: '建设银行',
        code: '1696'
      },
      {
        id: 1,
        name: '工商银行',
        code: '0142'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function () {
    this.getCard();
  },
  async getCard(){
    const res = await request({url:"/v1/bank/list"});
    // console.log(res);
    this.setData({
      card: res
    })
  },
  cardClick(e){
    console.log(e.currentTarget.dataset.index);
    let item = this.data.card[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '/pages/user_card_delete/index?name='+item.name+'&code='+item.code+'&id='+item.id,
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  }
})