// pages/park_details/index.js
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    park_id: 0,
    park_details:{}
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const { park_id } = options;
    this.setData({
      park_id
    }) 
    this.getParkDetails();
  },
  async getParkDetails(){
    const res = await request({url:"/v1/community/get/"+this.data.park_id});
    this.setData({
      park_details: res
    })
    console.log(res);
  },
  collectClick(){
    let that = this;
    let message = this.data.park_details.hasCollect?'您确定要将该项目移除收藏吗？':'您确定要将该项目添入收藏吗？'

    wx.showModal({
      title: '收藏管理',
      content: message,
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#0089ff',
      success: (result) => {
        if (result.confirm) {
          request({url:"/v1/community/collect/"+that.data.park_id, method: "put"});
        }
        let park_details = that.data.park_details;
        park_details.hasCollect = !park_details.hasCollect;
        that.setData({
          park_details
        })
      }
    });
  }
})